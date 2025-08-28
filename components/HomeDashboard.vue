<template>
  <section class="flex flex-col items-center mt-8 px-6">
    <div class="relative h-[580px] max-w-[35vw] min-w-[880px] bg-[#C4C4C4] rounded-3xl flex flex-col p-10">
      <div>
        <h3 class="text-3xl font-bold mb-6 text-center text-black">UPCOMING GOALS</h3>
        <ul class="space-y-4 max-h-[400px]">
          <li
            v-for="(goal, index) in upcomingGoals.slice(0, 5)"
            :key="index"
            class="flex justify-between items-center p-4 rounded-xl bg-black border-4 border-black duration-300">
            <div>
              <p class="font-semibold text-lg text-[#ffffff]">{{ goal.name }}</p>
              <p class="text-sm text-[#a0a0ff] mt-1">
                Deadline: <span class="font-bold">{{ goal.deadline }}</span>
              </p>
            </div>
            <button
              class="px-4 py-2 rounded-lg text-sm font-medium bg-[#ffffff]/20 text-[#ffffff] hover:scale-105 transition-all duration-200"
              @click="Completegoal(goal)">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12S5.925 1 12 1s11 4.925 11 11M7 13l1.5-1.5l2 2l5-5L17 10l-6.5 6.5z"
                  clip-rule="evenodd" />
              </svg>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { needsRefresh } from '~/composables/refresh.js';
const emit = defineEmits(['ready']);
const userId = useState('user').value.id;
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
  } catch (err) {
    console.error('Failed to fetch data', err);
  }
  setTimeout(() => {
    emit('ready');
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
        action: 'update',
        goalID: goal.goalid,
      },
    });
    needsRefresh.value = true;
  } catch (err) {
    console.error('Failed to complete goal', err);
    alert('Could not mark goal as complete. Try again.');
  }
};
</script>
