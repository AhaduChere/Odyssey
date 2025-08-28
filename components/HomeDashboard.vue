<template>
  <section class="flex flex-col items-center mt-8 px-6">
    <div
      class="relative h-[580px] max-w-[35vw] min-w-[880px] bg-gradient-to-br from-[#0f0f1f]/80 to-[#1a1a2e]/80 rounded-3xl flex flex-col p-10 backdrop-blur-lg border border-[#ffffff20] shadow-lg">
      <div>
        <h3 class="text-3xl font-bold mb-6 text-center text-gradient bg-clip-text text-transparent from-[#00fff7] to-[#ff00ff]">
          UPCOMING GOALS
        </h3>
        <ul class="space-y-4 overflow-y-auto max-h-[400px]">
          <li
            v-for="(goal, index) in upcomingGoals.slice(0, 5)"
            :key="index"
            class="flex justify-between items-center p-4 rounded-xl border border-[#ffffff10] bg-[#11111f]/50 hover:bg-[#22223f]/70 transition-all duration-300 shadow-md hover:shadow-xl">
            <div>
              <p class="font-semibold text-lg text-[#e0e0ff]">{{ goal.name }}</p>
              <p class="text-sm text-[#a0a0ff] mt-1">
                Deadline: <span class="font-bold">{{ goal.deadline }}</span>
              </p>
            </div>
            <button
              class="px-4 py-2 rounded-lg text-sm font-medium bg-[#00fff7]/20 text-[#00fff7] hover:bg-[#00fff7]/50 hover:text-[#0f0f1f] transition-all duration-200"
              @click="Completegoal(goal)">
              Mark Complete
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
  }, 200);
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

<style scoped>
.text-gradient {
  background-image: linear-gradient(to right, #00fff7, #ff00ff);
}
</style>
