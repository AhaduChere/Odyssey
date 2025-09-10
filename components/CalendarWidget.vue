<template>
  <section v-if="loading" class="flex items-center justify-center h-screen">
    <LoaderWidget />
  </section>

  <section v-else class="min-h-screen text-white">
    <div class="px-6 flex flex-col space-y-4 max-w-4xl mx-auto min-w-[700px]">
      <h1 class="text-4xl font-bold text-center text-[#a0a0ff] tracking-wide select-none">
        {{ monthNames[currentMonth] }}
      </h1>
      <div class="w-24 h-1 bg-[#2963A5] mx-auto rounded"></div>

      <div class="grid grid-cols-7 gap-2 pt-8">
        <div v-for="day in weekdays" :key="day" class="text-center font-semibold">{{ day }}</div>
        <div v-for="blank in firstDayOffset" :key="'b' + blank"></div>
        <button
          v-for="day in daysInMonth"
          :key="day"
          :class="['p-4 rounded-xl h-24 flex flex-col items-center justify-center border', getDayClass(day)]"
          @click="selectedDay = day">
          <span class="text-xl font-bold">{{ day }}</span>
        </button>
      </div>

      <div v-if="selectedDay" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div class="bg-[#0f172a] rounded-2xl border border-neutral-800 max-w-4xl w-full p-6 shadow-xl">
          <div class="grid grid-cols-2 gap-6">
            <!-- Deadlines Column -->
            <div class="flex flex-col">
              <h2 class="text-xl font-bold text-[#a0a0ff] mb-4">
                Deadlines for {{ currentMonth + 1 }}/{{ selectedDay }}/{{ currentYear }}
              </h2>
              <ul class="flex-1 overflow-y-auto space-y-3 max-h-[400px]">
                <li
                  v-if="!deadlines[selectedDay] || deadlines[selectedDay].length === 0"
                  class="p-4 bg-[#222244] rounded-xl border border-neutral-800 text-center">
                  No deadlines
                </li>
                <li
                  v-for="(item, index) in deadlines[selectedDay]"
                  :key="index"
                  class="p-4 bg-[#222244] rounded-xl border"
                  :class="{
                    'border-green-600': item.completed === 'TRUE',
                    'border-red-600': item.completed === 'FALSE',
                  }">
                  <p class="font-bold text-lg">{{ item.name }}</p>
                  <p class="text-sm">{{ item.description }}</p>
                </li>
              </ul>
              <button class="mt-4 py-3 rounded-2xl border-2 border-black bg-[#1a2038] hover:bg-[#222244]" @click="selectedDay = null">
                Close
              </button>
            </div>

            <!-- Add Goal Column -->
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
                  class="h-32 rounded-xl bg-[#222244]/50 border-2 border-black p-3 text-[#a0a0ff] placeholder:text-[#a0a0ff]/80 focus:outline-none focus:ring-2 focus:ring-[#2963A5] resize-none"></textarea>
                <button type="submit" class="w-full py-3 rounded-2xl border-2 border-black bg-[#1a2038] hover:bg-[#222244]">
                  Add Goal
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

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
      map[day].push({ name: deadline.goal_name, description: deadline.description, completed: deadline.completed });
    });
    deadlines.value = map;
  } catch (err) {
    console.error('Failed to fetch user data', err);
  } finally {
    loading.value = false;
  }
};
onMounted(() => {
  fetchDeadlines();
});

const getDayClass = (day) => {
  const dayDeadlines = deadlines.value[day];

  if (day === today.getDate()) {
    return 'text-blue-600 border-blue-600 bg-[#1a2038]';
  }

  if (!dayDeadlines) return 'border-neutral-800 bg-[#1a2038]';

  const allCompleted = dayDeadlines.every((d) => d.completed === 'TRUE');
  if (allCompleted) return 'text-green-600 border-green-600 bg-[#1a2038]';

  return 'text-red-600 border-red-600 bg-[#1a2038]';
};

watch(needsRefresh, async (val) => {
  if (val) {
    await fetchDeadlines();
    needsRefresh.value = false;
  }
});

const AddGoal = async () => {
  try {
    await $fetch('/api/goals', {
      method: 'POST',
      body: { action: 'add', userID: userId, goalname: goal_name.value, goaldesc: goal_desc.value, deadline: today.getDate },
    });
    triggerRefresh();
    goal_name.value = '';
    goal_desc.value = '';
  } catch (error) {
    console.error('Failed to add Goal:', error);
  }
};
</script>
