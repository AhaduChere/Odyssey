<template>
  <section v-if="loading" class="flex items-center justify-center h-screen">
    <LoaderWidget />
  </section>

  <section v-else class="min-h-screen text-white">
    <div class="px-6 flex flex-col max-w-4xl mx-auto min-w-[700px]">
      <div class="flex justify-between items-center pb-4">
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
            'p-4 rounded-xl h-20 flex flex-col items-center justify-center transition-all duration-150 bg-[#222244] hover:scale-105 shadow text-xl',
            isToday(day) ? 'text-indigo-500 font-extrabold' : 'text-indigo-100 font-medium',
            deadlines[day]
              ? deadlines[day].every((d) => d.completed === 'TRUE')
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
import { ref, onMounted, onUnmounted, watch, computed } from 'vue';
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
      const d = new Date(deadline.deadline + 'T00:00:00');
      if (d.getMonth() !== displayedMonth.value || d.getFullYear() !== displayedYear.value) return;
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
  } catch {
    alert('Failed to fetch user data');
  } finally {
    setTimeout(() => (loading.value = false), 400);
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
  const formattedDate = `${displayedYear.value}-${String(displayedMonth.value + 1).padStart(
    2,
    '0'
  )}-${String(selectedDay.value).padStart(2, '0')}`;
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
  await fetchDeadlines();
  goal_name.value = '';
  goal_desc.value = '';
};

const Completegoal = async (goal) => {
  try {
    await $fetch('/api/goals', {
      method: 'POST',
      body: { action: 'complete', goalID: goal.goalid },
    });
    await fetchDeadlines();
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
    await fetchDeadlines();
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
    await fetchDeadlines();
  } catch {
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
