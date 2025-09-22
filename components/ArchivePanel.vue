<template>
  <section v-if="loading" class="flex items-center justify-center h-screen">
    <LoaderWidget />
  </section>

  <section v-else class="min-h-screen text-white pt-28 pb-20">
    <div class="px-6 flex flex-col max-w-5xl mx-auto min-w-[700px]">
      <div class="flex justify-between items-center mb-2">
        <input
          v-model="search"
          type="text"
          placeholder="Search by name..."
          class="px-4 py-2 rounded-xl border border-neutral-800 bg-[#0f172a] text-indigo-400 placeholder:text-indigo-400/60 shadow-md focus:outline-none focus:ring-2 focus:ring-[#2963A5] w-80" />
        <h1 class="text-4xl font-bold text-center text-indigo-400 tracking-wide select-none pb-1">My Archive</h1>
        <div class="flex gap-2">
          <select v-model="sortBy" class="px-4 py-2 rounded-xl border border-neutral-800 bg-[#0f172a] text-indigo-400 shadow-md">
            <option value="dateAsc">Sort by Date ↑</option>
            <option value="dateDesc">Sort by Date ↓</option>
            <option value="status">Sort by Status</option>
          </select>
          <select v-model="filterMonth" class="px-4 py-2 rounded-xl border border-neutral-800 bg-[#0f172a] text-indigo-400 shadow-md">
            <option value="">All Months</option>
            <option v-for="m in months" :key="m" :value="m">{{ m }}</option>
          </select>
        </div>
      </div>
      <div class="w-full h-1 bg-gradient-to-r from-[#2963A5] to-indigo-400 mx-auto rounded mb-2"></div>

      <transition-group name="slide-list" tag="ul" class="space-y-4">
        <li
          v-for="goal in filteredGoals"
          :key="goal.id"
          :class="[
            'flex justify-between items-center p-4 rounded-xl bg-[#0f172a] hover:scale-[1.01] duration-300 border-2',
            goal.completed === 'TRUE' ? 'border-green-700' : 'border-red-700',
          ]">
          <div class="min-w-0 pr-4">
            <p class="font-semibold text-lg text-[#ffffff] truncate">{{ goal.name }}</p>
            <p class="text-sm text-indigo-400 mt-1">
              Deadline: <span class="font-extrabold">{{ goal.formatteddeadline }}</span>
            </p>
            <p class="text-sm text-neutral-300 mt-2 line-clamp-2 max-w-[400px]">
              {{ goal.description }}
            </p>
          </div>

          <div class="flex items-center gap-3">
            <button
              v-if="goal.completed === 'TRUE'"
              class="px-3 py-2 rounded-lg text-sm font-medium bg-[#2963A5]/20 text-[#ffffff] hover:bg-indigo-500/25 transition-transform duration-200"
              @click="UndoGoal(goal)">
              <img :src="UndoButton" alt="Undo" class="w-6 h-6" />
            </button>
            <button
              v-else
              class="px-3 py-2 rounded-lg text-sm font-medium bg-[#2963A5]/20 text-[#ffffff] hover:bg-[#2963A5]/25 transition-transform duration-200"
              @click="Completegoal(goal)">
              <img :src="DoneButton" alt="Complete" class="w-6 h-6" />
            </button>

            <button
              class="px-3 py-2 rounded-lg text-sm font-medium bg-[#2963A5]/20 text-[#ffffff] hover:bg-[#2963A5]/25 transition-transform duration-200"
              @click="StartEdit(goal)">
              <img :src="EditButton" alt="Edit" class="w-6 h-6" />
            </button>

            <button
              class="px-3 py-2 rounded-lg text-sm font-medium bg-[#2963A5]/20 text-[#ffffff] hover:bg-[#2963A5]/25 transition-transform duration-200"
              @click="DeleteGoal(goal)">
              <img :src="DeleteButton" alt="Delete" class="w-6 h-6" />
            </button>
          </div>
        </li>
      </transition-group>
    </div>

    <div v-if="selected" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-[#0f172a] rounded-2xl border border-neutral-800 max-w-xl w-full p-6 shadow-xl">
        <h2 class="text-xl font-bold text-indigo-400 mb-4">{{ selected.name }}</h2>
        <p class="text-sm text-indigo-400 mb-2">
          Deadline: <span class="font-extrabold">{{ selected.deadline }}</span>
        </p>
        <p class="text-sm text-neutral-300 mb-4 line-clamp-6">
          {{ selected.description }}
        </p>
        <div class="flex gap-3 justify-end">
          <button class="px-4 py-2 rounded-2xl border-2 border-black bg-[#1a2038] hover:bg-[#222244]" @click="selected = null">
            Close
          </button>
          <button
            class="px-4 py-2 rounded-2xl border-2 border-black bg-indigo-600 text-white hover:bg-indigo-500"
            @click="StartEdit(selected)">
            Edit
          </button>
        </div>
      </div>
    </div>

    <div v-if="editing" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-[#0f172a] rounded-2xl border border-neutral-800 max-w-xl w-full p-6 shadow-xl">
        <h2 class="text-xl font-bold text-indigo-400 mb-4">Edit Goal</h2>
        <input
          v-model="editForm.name"
          type="text"
          placeholder="Goal Name"
          required
          class="rounded-xl bg-[#222244]/50 border-2 border-black p-3 text-indigo-400 placeholder:text-indigo-400/80 focus:outline-none focus:ring-2 focus:ring-[#2963A5] w-full mb-3" />
        <textarea
          v-model="editForm.description"
          placeholder="Goal Description"
          required
          class="h-28 rounded-xl bg-[#222244]/50 border-2 border-black p-3 text-indigo-400 placeholder:text-indigo-400/80 focus:outline-none focus:ring-2 focus:ring-[#2963A5] resize-none w-full mb-3"></textarea>
        <input
          v-model="editForm.deadline"
          type="date"
          class="w-full rounded-xl bg-[#222244]/50 border-2 border-black p-3 text-indigo-400 focus:outline-none focus:ring-2 focus:ring-[#2963A5] mb-4" />
        <div class="flex gap-3 justify-end">
          <button class="px-4 py-2 rounded-2xl border-2 border-black bg-[#1a2038] hover:bg-[#222244]" @click="CancelEdit">Cancel</button>
          <button class="px-4 py-2 rounded-2xl border-2 border-black bg-indigo-600 text-white hover:bg-indigo-500" @click="SaveEdit">
            Save
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import DoneButton from '~/assets/Done.svg';
import UndoButton from '~/assets/Undo.svg';
import DeleteButton from '~/assets/Trash.svg';
import EditButton from '~/assets/Edit.svg';
const userId = useState('user').value.id;
const loading = ref(true);
const search = ref('');
const sortBy = ref('dateAsc');
const filterMonth = ref('');
const goals = ref([]);
const editing = ref(false);
const editForm = ref({ id: null, name: '', description: '', deadline: '', completed: 'FALSE' });
const selected = ref(null);
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const stats = ref({ completed: 0, incomplete: 0, total: 0 });

const formatDate = (datetime) => {
  const [datePart] = datetime.split(' ');
  const [year, month, day] = datePart.split('-');
  const monthNames = [
    'January','February','March','April','May','June','July','August','September','October','November','December'
  ];
  return `${monthNames[parseInt(month)-1]} ${parseInt(day)}, ${year}`;
};

const fetchData = async () => {
  try {
    const data = await $fetch(`/api/goals?id=${userId}&method=archive`);
    goals.value = data.map((g) => ({
      id: g.goal_id,
      name: g.goal_name,
      description: g.description,
      formatteddeadline: formatDate(g.deadline),
      deadline: g.deadline,
      completed: g.completed,
    }));
    stats.value.total = goals.value.length;
    stats.value.completed = goals.value.filter((g)=>g.completed==='TRUE').length;
    stats.value.incomplete = stats.value.total - stats.value.completed;
  } catch { alert('Failed to fetch user data'); } finally { setTimeout(()=>loading.value=false,300); }
};

onMounted(()=>{ fetchData(); });

const filteredGoals = computed(()=>{
  let result = [...goals.value];
  if(search.value) result = result.filter(g=>g.name.toLowerCase().includes(search.value.toLowerCase()));
  if(filterMonth.value) result = result.filter(g=>new Date(g.deadline).toLocaleString('default',{month:'long'})===filterMonth.value);
  if(sortBy.value==='dateAsc') result.sort((a,b)=>new Date(a.deadline)-new Date(b.deadline));
  else if(sortBy.value==='dateDesc') result.sort((a,b)=>new Date(b.deadline)-new Date(a.deadline));
  else if(sortBy.value==='status') result.sort((a,b)=>a.completed===b.completed ? new Date(a.deadline)-new Date(b.deadline) : a.completed==='TRUE'?1:-1);
  return result;
});

const Completegoal = async(goal)=>{ const b={...goal}; goal.completed='TRUE'; try{await $fetch('/api/goals',{method:'POST',body:{action:'complete',goalID:goal.id}}); await fetchData();}catch{Object.assign(goal,b);alert('Could not mark goal as complete. Try again.');}};
const UndoGoal = async(goal)=>{ const b={...goal}; goal.completed='FALSE'; try{await $fetch('/api/goals',{method:'POST',body:{action:'undo',goalID:goal.id}}); await fetchData();}catch{Object.assign(goal,b);alert('Could not undo goal. Try again.');}};
const DeleteGoal = async(goal)=>{ const backup=[...goals.value]; goals.value=goals.value.filter(g=>g.id!==goal.id); try{await $fetch('/api/goals',{method:'POST',body:{action:'delete',goalID:goal.id}}); await fetchData();}catch{goals.value=backup;alert('Could not delete goal. Try again.');}};
const StartEdit = (goal)=>{ editing.value=true; editForm.value={id:goal.id,name:goal.name,description:goal.description,deadline:goal.deadline,completed:goal.completed}; };
const CancelEdit = ()=>{ editing.value=false; editForm.value={id:null,name:'',description:'',deadline:'',completed:'FALSE'}; };
const SaveEdit = async()=>{ try{await $fetch(`/api/goals?id=${userId}&method=edit`,{method:'PATCH',body:{goalID:editForm.value.id,goalname:editForm.value.name,goaldesc:editForm.value.description,deadline:editForm.value.deadline}}); await fetchData(); CancelEdit(); selected.value=null;}catch{alert('Failed to save edits.');}};
</script>

<style scoped>
.slide-list-enter-from{opacity:0;transform:translateY(-6px) scale(0.995);}
.slide-list-enter-to{opacity:1;transform:translateY(0) scale(1);}
.slide-list-leave-active{transition:transform 250ms ease,opacity 250ms ease;}
.slide-list-leave-to{opacity:0;transform:translateY(6px) scale(0.995);}
</style>
