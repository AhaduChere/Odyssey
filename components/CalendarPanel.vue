<template>
  <section v-if="loading" class="flex items-center justify-center h-screen">
    <LoaderWidget />
  </section>

  <section v-else class="min-h-screen text-white pt-28">
    <div class="px-6 flex flex-col max-w-4xl mx-auto min-w-[700px]">
      <div class="flex justify-between items-center pb-2.5">
        <button
          class="px-4 py-2 rounded-xl border border-neutral-800 bg-[#0f172a] hover:bg-[#0f172a]/80 text-indigo-400 shadow-md transition-all duration-200"
          @click="prevMonth">
          &lt; Prev
        </button>
        <h1 class="text-4xl font-bold text-center text-indigo-400 tracking-wide px-auto select-none drop-shadow">
          {{ monthNames[displayedMonth] }} {{ displayedYear }}
        </h1>
        <div class="flex gap-2 items-center">
          <button
            class="px-4 py-2 rounded-xl border border-neutral-800 bg-[#0f172a] hover:bg-[#0f172a]/80 text-indigo-400 shadow-md transition-all duration-200"
            @click="nextMonth">
            Next &gt;
          </button>
        </div>
      </div>
      <div class="w-full h-1 bg-gradient-to-r from-[#2963A5] to-indigo-400 mx-auto rounded mb-2"></div>
      <button
        v-if="displayedMonth !== today.getMonth() || displayedYear !== today.getFullYear()"
        class="fixed bottom-3 right-3 px-4 py-2 rounded-xl border border-neutral-800 bg-[#0f172a] hover:bg-[#0f172a]/80 text-indigo-400 shadow-md transition-all duration-200 z-50"
        @click="goToCurrentMonth">
        Back to Present
      </button>
      <div class="grid grid-cols-7 gap-4 pt-8 bg-[#181c2a] rounded-2xl p-6 shadow-lg">
        <div
          v-for="day in weekdays"
          :key="day"
          class="text-center select-none font-semibold text-indigo-400 uppercase tracking-wide pb-2 border-b border-[#222244]">
          {{ day }}
          <div class="w-full h-1 bg-[#2963A5] mx-auto rounded"></div>
        </div>
        <div v-for="blank in firstDayOffset" :key="'b' + blank"></div>
        <button
          v-for="day in daysInMonth"
          :key="day"
          :class="[
            'p-4 rounded-xl h-[80px] flex flex-col items-center justify-center transition-all duration-150 bg-[#222244] hover:scale-105 shadow text-xl',
            isToday(day) ? 'text-indigo-500 font-extrabold' : 'text-indigo-100 font-medium',
            deadlines[day] && deadlines[day].length
              ? deadlines[day].every((d) => d.completed === true)
                ? 'border-2 border-green-500'
                : 'border-2 border-red-500'
              : 'border border-indigo-500/40',
          ]"
          @click="selectedDay = day">
          {{ day }}
        </button>
      </div>

      <div v-if="selectedDay" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div class="bg-[#0f172a] rounded-2xl border border-neutral-800 max-w-xl w-full p-6 shadow-xl">
          <div class="grid grid-cols-1 gap-6">
            <div class="flex flex-col">
              <h2 class="text-xl font-bold text-indigo-400 mb-4">Add New Goal</h2>
              <form class="flex flex-col gap-4" @submit.prevent="AddGoal">
                <input
                  v-model="goal_name"
                  type="text"
                  placeholder="Goal Name"
                  required
                  class="rounded-xl bg-[#222244]/50 border-2 border-black p-3 text-indigo-400 placeholder:text-indigo-400/80 focus:outline-none focus:ring-2 focus:ring-[#2963A5]" />
                <textarea
                  v-model="goal_desc"
                  placeholder="Goal Description"
                  required
                  class="h-full rounded-xl bg-[#222244]/50 border-2 border-black p-3 text-indigo-400 placeholder:text-indigo-400/80 focus:outline-none focus:ring-2 focus:ring-[#2963A5] resize-none"></textarea>
                <button type="submit" class="w-full py-3 rounded-2xl border-2 border-black bg-[#1a2038] hover:bg-[#222244]">
                  Add Goal
                </button>
              </form>
            </div>

            <div class="flex flex-col">
              <h2 class="text-xl font-bold text-indigo-400 mb-4">
                Deadlines on {{ displayedMonth + 1 }}/{{ selectedDay }}/{{ displayedYear }}
              </h2>
              <ul class="overflow-y-scroll max-h-48 space-y-3 scrollbar">
                <li
                  v-if="!deadlines[selectedDay] || deadlines[selectedDay].length === 0"
                  class="p-4 bg-[#222244]/50 rounded-xl border-2 border-black text-center select-none">
                  No deadlines
                </li>

                <li
                  v-for="(item, index) in deadlines[selectedDay]"
                  :key="index"
                  class="p-4 bg-[#222244] rounded-xl border-2 flex justify-between items-center"
                  :class="{
                    'border-green-600': item.completed === true,
                    'border-red-600': item.completed === false,
                  }">
                  <div class="flex-1 min-w-0 pr-4">
                    <p class="font-bold text-lg truncate">{{ item.name }}</p>
                    <p class="text-sm break-words whitespace-normal">{{ item.description }}</p>
                  </div>

                  <div class="flex gap-2 items-center">
                    <div class="relative group" :class="item.pending ? 'opacity-50 pointer-events-none' : ''">
                      <div
                        class="flex items-center justify-center w-18 h-auto px-4 py-2 rounded-lg cursor-pointer bg-[#2963A5]/20 hover:bg-[#2963A5]/30 transition-colors duration-200"
                        @click="DeleteGoal(item)">
                        <img :src="DeleteButton" class="w-18 h-auto select-none" alt="Delete Button" />
                      </div>

                      <div v-if="item.pending" class="pointer-events-none absolute -top-10 right-0 z-50">
                        <div class="hidden group-hover:block bg-black/80 text-white text-xs px-2 py-1 rounded shadow">
                          Please wait before making immediate changes
                        </div>
                      </div>
                    </div>

                    <div class="relative group" :class="item.pending ? 'opacity-50 pointer-events-none' : ''">
                      <div
                        class="flex items-center justify-center w-18 h-auto px-4 py-2 rounded-lg cursor-pointer bg-[#2963A5]/20 hover:bg-[#2963A5]/30 transition-colors duration-200"
                        @click="item.completed === true ? UndoGoal(item) : Completegoal(item)">
                        <img :src="item.completed === true ? UndoButton : DoneButton" class="w-18 h-auto select-none" alt="Action Button" />
                      </div>

                      <div v-if="item.pending" class="pointer-events-none absolute -top-10 right-0 z-50">
                        <div class="hidden group-hover:block bg-black/80 text-white text-xs px-2 py-1 rounded shadow">
                          Please wait before making immediate changes
                        </div>
                      </div>
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
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
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
const displayedYear = ref(today.getFullYear());
const displayedMonth = ref(today.getMonth());
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
const daysInMonth = computed(() => new Date(displayedYear.value, displayedMonth.value + 1, 0).getDate());
const firstDayOffset = computed(() => new Date(displayedYear.value, displayedMonth.value, 1).getDay());
function isToday(day) {
  return day === today.getDate() && displayedMonth.value === today.getMonth() && displayedYear.value === today.getFullYear();
}
const fetchDeadlines = async () => {
  try {
    const data = await $fetch(`/api/deadlines?id=${userId}&year=${displayedYear.value}&month=${displayedMonth.value + 1}`);
    const map = {};
    data.forEach((deadline) => {
      const d = new Date(deadline.deadline);
      if (d.getMonth() !== displayedMonth.value || d.getFullYear() !== displayedYear.value) return;
      const day = d.getDate();
      if (!map[day]) map[day] = [];
      map[day].push({
        name: deadline.goal_name,
        description: deadline.description,
        completed: String(deadline.completed).toLowerCase() === 'true',
        goalid: deadline.goal_id,
        pending: false,
      });
    });
    deadlines.value = map;
  } catch {
    alert('Failed to fetch user data');
  } finally {
    setTimeout(() => (loading.value = false), 200);
  }
};
onMounted(() => {
  fetchDeadlines();
  window.addEventListener('keydown', handleKey);
});
onUnmounted(() => {
  window.removeEventListener('keydown', handleKey);
});
function handleKey(e) {
  if (e.key === 'Escape' && selectedDay.value) {
    selectedDay.value = null;
  }
}
watch([displayedMonth, displayedYear], async () => {
  loading.value = true;
  await fetchDeadlines();
});
const AddGoal = async () => {
  if (!selectedDay.value) return;
  const day = selectedDay.value;
  const formattedDate = `${displayedYear.value}-${String(displayedMonth.value + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  const tempId = `temp-${Date.now()}`;
  const tempItem = {
    name: goal_name.value,
    description: goal_desc.value,
    completed: false,
    goalid: tempId,
    deadline: formattedDate + 'T00:00:00',
    pending: true,
  };
  const backup = JSON.parse(JSON.stringify(deadlines.value));
  if (!deadlines.value[day]) deadlines.value[day] = [];
  deadlines.value[day].push(tempItem);
  goal_name.value = '';
  goal_desc.value = '';
  try {
    const res = await $fetch('/api/goals', {
      method: 'POST',
      body: {
        action: 'add',
        userID: userId,
        goalname: tempItem.name,
        goaldesc: tempItem.description,
        deadline: formattedDate,
      },
    });
    if (res?.success && res.goalId) {
      const list = deadlines.value[day];
      const idx = list.findIndex((g) => g.goalid === tempId);
      if (idx !== -1) {
        list[idx].goalid = res.goalId;
        list[idx].pending = false;
      }
    } else {
      const list = deadlines.value[day];
      const idx = list.findIndex((g) => g.goalid === tempId);
      if (idx !== -1) list[idx].pending = false;
    }
  } catch {
    deadlines.value = backup;
    alert('Failed to add goal — try again.');
  }
};
const Completegoal = async (goal) => {
  if (goal.pending) return;
  const backup = JSON.parse(JSON.stringify(deadlines.value));
  goal.completed = true;
  try {
    await $fetch('/api/goals', {
      method: 'POST',
      body: { action: 'complete', goalID: goal.goalid },
    });
  } catch {
    deadlines.value = backup;
    alert('Could not mark goal as complete. Try again.');
  }
};
const UndoGoal = async (goal) => {
  if (goal.pending) return;
  const backup = JSON.parse(JSON.stringify(deadlines.value));
  goal.completed = false;
  try {
    await $fetch('/api/goals', {
      method: 'POST',
      body: { action: 'undo', goalID: goal.goalid },
    });
  } catch {
    deadlines.value = backup;
    alert('Could not undo goal. Try again.');
  }
};
const DeleteGoal = async (goal) => {
  if (goal.pending) return;
  const backup = JSON.parse(JSON.stringify(deadlines.value));
  for (const day in deadlines.value) {
    const idx = deadlines.value[day].findIndex((g) => g.goalid === goal.goalid);
    if (idx !== -1) {
      deadlines.value[day].splice(idx, 1);
      if (deadlines.value[day].length === 0) delete deadlines.value[day];
      break;
    }
  }
  try {
    await $fetch('/api/goals', {
      method: 'POST',
      body: { action: 'delete', goalID: goal.goalid },
    });
  } catch {
    deadlines.value = backup;
    alert('Could not delete goal. Try again.');
  }
};
function prevMonth() {
  if (displayedMonth.value === 0) {
    displayedMonth.value = 11;
    displayedYear.value -= 1;
  } else {
    displayedMonth.value -= 1;
  }
  selectedDay.value = null;
}
function goToCurrentMonth() {
  displayedMonth.value = today.getMonth();
  displayedYear.value = today.getFullYear();
  selectedDay.value = null;
}
function nextMonth() {
  if (displayedMonth.value === 11) {
    displayedMonth.value = 0;
    displayedYear.value += 1;
  } else {
    displayedMonth.value += 1;
  }
  selectedDay.value = null;
}
</script>
