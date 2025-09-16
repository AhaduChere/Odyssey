<template>
  <section v-if="loading" class="flex items-center justify-center h-screen">
    <LoaderWidget />
  </section>
  <section v-else class="min-h-screen text-white flex flex-col items-center">
    <div class="px-6 flex flex-col gap-8 w-full max-w-4xl">
      <ul class="space-y-4">
        <h3 class="text-4xl text-indigo-400 font-semibold text-center select-none">Upcoming Deadlines</h3>
        <div class="w-full h-1 bg-gradient-to-r from-[#2963A5] to-indigo-400 mx-auto rounded"></div>
        <li
          v-for="(goal, index) in upcomingGoals.slice(0, 5)"
          :key="index"
          class="flex justify-between items-center p-4 rounded-xl bg-[#0f172a] border-2 hover:scale-[1.01] border-black duration-300">
          <div>
            <p class="font-semibold text-lg text-[#ffffff]">{{ goal.name }}</p>
            <p class="text-sm text-indigo-400 mt-1">
              Deadline: <span class="font-bold">{{ goal.deadline }}</span>
            </p>
          </div>
          <button
            class="px-4 py-2 rounded-lg text-sm font-medium bg-[#2963A5]/20 text-[#ffffff] filter hover:bg-[#2963A5]/25 transition-transform duration-200"
            @click="Completegoal(goal)">
            <img :src="DoneButton" alt="Complete" class="w-8 h-8 fill-[#2963A5]" />
          </button>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { needsRefresh } from '~/composables/refresh.js';
import DoneButton from '~/assets/Done.svg';
const userId = useState('user').value.id;
const loading = ref(true);
const upcomingGoals = ref([]);

const formatDate = (datetime) => {
  const [datePart] = datetime.split(' ');
  const [year, month, day] = datePart.split('-');
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
  return `${monthNames[parseInt(month) - 1]} ${parseInt(day)}, ${year}`;
};

const fetchData = async () => {
  try {
    const goalsdata = await $fetch(`/api/goals?id=${userId}`);
    upcomingGoals.value = goalsdata.upcoming.map((g) => ({
      goalid: g.goal_id,
      name: g.goal_name,
      deadline: formatDate(g.deadline),
    }));
  } catch {
    alert('Failed to fetch user data');
  }
  setTimeout(() => {
    loading.value = false;
  }, 400);
};

onMounted(() => {
  fetchData();
});

watch(needsRefresh, async (val) => {
  if (val) {
    await fetchData();
    needsRefresh.value = false;
  }
});

const Completegoal = async (goal) => {
  try {
    await $fetch('/api/goals', {
      method: 'POST',
      body: {
        action: 'complete',
        goalID: goal.goalid,
      },
    });
    triggerRefresh();
  } catch {
    alert('Could not mark goal as complete. Try again.');
  }
};
</script>
