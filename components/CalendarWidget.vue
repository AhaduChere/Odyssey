<template>
  <section v-if="loading" class="flex items-center justify-center h-screen">
    <LoaderWidget />
  </section>

  <section v-else class="min-h-screen text-white">
    <div class="px-6 flex flex-col max-w-4xl mx-auto min-w-[700px]">
      <h1 class="text-4xl font-bold text-center text-[#a0a0ff] tracking-wide select-none drop-shadow pb-4">
        {{ monthNames[currentMonth] }}
      </h1>
      <div class="w-full h-1 bg-gradient-to-r from-[#2963A5] to-[#a0a0ff] mx-auto rounded mb-2"></div>

      <div class="grid grid-cols-7 gap-4 pt-8 bg-[#181c2a] rounded-2xl p-6 shadow-lg">
        <div
          v-for="day in weekdays"
          :key="day"
          class="text-center font-semibold text-[#a0a0ff] uppercase tracking-wide pb-2 border-b border-[#222244]">
          {{ day }}
          <div class="w-full h-1 bg-[#2963A5] mx-auto rounded"></div>
        </div>
        <div v-for="blank in firstDayOffset" :key="'b' + blank"></div>
        <button
          v-for="day in daysInMonth"
          :key="day"
          :class="[
            'p-4 rounded-xl h-20 flex flex-col items-center justify-center border transition-all duration-150',
            'bg-[#222244] hover:scale-105 shadow',
            day === today.getDate()
              ? 'text-blue-600 border-blue-600 bg-[#0f172a]'
              : !deadlines[day]
                ? 'border-neutral-800 bg-[#0f172a]'
                : deadlines[day].every((d) => d.completed === 'TRUE')
                  ? 'text-green-600 border-green-600 bg-[#0f172a]'
                  : 'text-red-600 border-red-600 bg-[#0f172a]',
          ]"
          @click="selectedDay = day">
          <span class="text-xl font-bold text-[#a0a0ff]">{{ day }}</span>
        </button>
      </div>

      <div v-if="selectedDay" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div class="bg-[#0f172a] rounded-2xl border border-neutral-800 max-w-xl w-full p-6 shadow-xl">
          <div class="grid grid-cols-1 gap-6">
            <div class="flex flex-col">
              <h2 class="text-xl font-bold text-[#a0a0ff] mb-4">Add New Goal</h2>
              <form class="flex flex-col gap-4" @submit.prevent="AddGoal">
                <input
                  v-model="goal_name"
                  type="text"
                  placeholder="Goal Name"
                  required
                  class="rounded-xl bg-[#222244]/50 border-2 border-black p-3 text-[#a0a0ff] placeholder:text-[#a0a0ff]/80 focus:outline-none focus:ring-2 focus:ring-[#2963A5]" />
                <textarea
                  v-model="goal_desc"
                  placeholder="Goal Description"
                  required
                  class="h-full rounded-xl bg-[#222244]/50 border-2 border-black p-3 text-[#a0a0ff] placeholder:text-[#a0a0ff]/80 focus:outline-none focus:ring-2 focus:ring-[#2963A5] resize-none"></textarea>
                <button type="submit" class="w-full py-3 rounded-2xl border-2 border-black bg-[#1a2038] hover:bg-[#222244]">
                  Add Goal
                </button>
              </form>
            </div>

            <div class="flex flex-col">
              <h2 class="text-xl font-bold text-[#a0a0ff] mb-4">Deadlines on {{ currentMonth + 1 }}/{{ selectedDay }}/{{ currentYear }}</h2>
              <ul class="overflow-y-scroll max-h-48 space-y-3 scrollbar">
                <li
                  v-if="!deadlines[selectedDay] || deadlines[selectedDay].length === 0"
                  class="p-4 bg-[#222244]/50 rounded-xl border-2 border-black text-center">
                  No deadlines
                </li>

                <li
                  v-for="(item, index) in deadlines[selectedDay]"
                  :key="index"
                  class="p-4 bg-[#222244] rounded-xl border-2 flex justify-between items-center"
                  :class="{
                    'border-green-600': item.completed === 'TRUE',
                    'border-red-600': item.completed === 'FALSE',
                  }">
                  <div class="flex-1 min-w-0 pr-4">
                    <p class="font-bold text-lg truncate">{{ item.name }}</p>
                    <p class="text-sm break-words whitespace-normal">{{ item.description }}</p>
                  </div>

                  <div class="flex gap-2 items-center">
                    <div
                      class="flex items-center justify-center w-18 h-auto px-4 py-2 rounded-lg cursor-pointer bg-[#2963A5]/20 hover:bg-[#2963A5]/30 transition-colors duration-200"
                      @click="DeleteGoal(item)">
                      <img :src="DeleteButton" class="w-18 h-auto" alt="Delete Button" />
                    </div>
                    <div
                      class="flex items-center justify-center w-18 h-auto px-4 py-2 rounded-lg cursor-pointer bg-[#2963A5]/20 hover:bg-[#2963A5]/30 transition-colors duration-200"
                      @click="item.completed === 'TRUE' ? UndoGoal(item) : Completegoal(item)">
                      <img :src="item.completed === 'TRUE' ? UndoButton : DoneButton" class="w-18 h-auto" alt="Action Button" />
                    </div>
                  </div>
                </li>
              </ul>

              <button class="mt-4 py-3 rounded-2xl border-2 border-black bg-[#1a2038] hover:bg-[#222244]" @click="selectedDay = null">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import DoneButton from '~/assets/Done.svg';
import UndoButton from '~/assets/Undo.svg';
import DeleteButton from '~/assets/Trash.svg';

const loading = ref(true);
const goal_name = ref('');
const goal_desc = ref('');
const selectedDay = ref(null);
const deadlines = ref({});
const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const today = new Date();
const userId = useState('user').value.id;
const currentYear = today.getFullYear();
const currentMonth = today.getMonth();
const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
const firstDayOffset = new Date(currentYear, currentMonth, 1).getDay();
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const fetchDeadlines = async () => {
  try {
    const data = await $fetch(`/api/deadlines?id=${userId}`);
    const map = {};
    data.forEach((deadline) => {
      const d = new Date(deadline.deadline + 'T00:00:00');
      if (d.getMonth() !== currentMonth) return;
      const day = d.getDate();
      if (!map[day]) map[day] = [];
      map[day].push({
        name: deadline.goal_name,
        description: deadline.description,
        completed: deadline.completed,
        goalid: deadline.goal_id,
      });
    });
    deadlines.value = map;
  } catch (err) {
    console.error('Failed to fetch user data', err);
  } finally {
    setTimeout(() => (loading.value = false), 400);
  }
};

onMounted(fetchDeadlines);

watch(needsRefresh, async (val) => {
  if (val) {
    await fetchDeadlines();
    needsRefresh.value = false;
  }
});

const AddGoal = async () => {
  if (!selectedDay.value) return;
  const formattedDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(selectedDay.value).padStart(2, '0')}`;
  await $fetch('/api/goals', {
    method: 'POST',
    body: {
      action: 'add',
      userID: userId,
      goalname: goal_name.value,
      goaldesc: goal_desc.value,
      deadline: formattedDate,
    },
  });
  triggerRefresh();
  goal_name.value = '';
  goal_desc.value = '';
};

const Completegoal = async (goal) => {
  try {
    await $fetch('/api/goals', {
      method: 'POST',
      body: { action: 'complete', goalID: goal.goalid },
    });
    triggerRefresh();
  } catch {
    alert('Could not mark goal as complete. Try again.');
  }
};

const UndoGoal = async (goal) => {
  try {
    await $fetch('/api/goals', {
      method: 'POST',
      body: { action: 'undo', goalID: goal.goalid },
    });
    triggerRefresh();
  } catch {
    alert('Could not undo goal. Try again.');
  }
};

const DeleteGoal = async (goal) => {
  try {
    await $fetch('/api/goals', {
      method: 'POST',
      body: { action: 'delete', goalID: goal.goalid },
    });
    triggerRefresh();
  } catch {
    alert('Could not delete goal. Try again.');
  }
};
</script>
