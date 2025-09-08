<template>
  <div
    class="relative h-[600px] w-[450px] bg-[#1c2541] rounded-3xl flex flex-col p-6 mt-8 border-2 border-black shadow-lg">
    <h3 class="text-2xl font-semibold mb-6 text-center text-white select-none">MY STATS</h3>

    <div class="h-48 rounded-lg flex items-center justify-center text-neutral-50 select-none mb-11">
      <Doughnut :data="goaldata" :options="options" />
    </div>

    <div class="grid gap-4">
      <div class="rounded-xl bg-[#0f172a] p-6 shadow-sm border-2 border-black flex flex-col items-center">
        <h3 class="text-sm font-extrabold text-[#a0a0ff] mb-1">Complete Goals</h3>
        <p class="text-3xl font-bold text-white">{{ completedGoals }}</p>
      </div>

      <div class="rounded-xl bg-[#0f172a] p-6 shadow-sm border-2 border-black flex flex-col items-center">
        <h3 class="text-sm font-extrabold text-[#a0a0ff] mb-1">Incomplete Goals</h3>
        <p class="text-3xl font-bold text-white">{{ incompleteGoals }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { needsRefresh } from '~/composables/refresh.js';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Doughnut } from 'vue-chartjs';
ChartJS.register(ArcElement, Tooltip);

const emit = defineEmits(['ready']);
const userId = useState('user').value.id;
const incompleteGoals = ref(0);
const completedGoals = ref(0);
const totalGoals = ref(0);

const fetchData = async () => {
  try {
    const goalsdata = await $fetch(`/api/goals?id=${userId}`);
    incompleteGoals.value = goalsdata.incomplete;
    completedGoals.value = goalsdata.completed;
    totalGoals.value = incompleteGoals.value + completedGoals.value;
  } catch (err) {
    alert.error('Failed to fetch data', err);
  }
  setTimeout(() => {
    emit('ready');
  }, 200);
};

onMounted(() => {
  fetchData();
});
const options = {
  maintainAspectRatio: true,
};

watch(needsRefresh, async (val) => {
  if (val) {
    await fetchData();
    needsRefresh.value = false;
  }
});

const goaldata = computed(() => ({
  labels: ['Incomplete Goals', 'Complete Goals'],
  datasets: [
    {
      backgroundColor: ['#2963A5', '#4a90e2'],
      hoverBackgroundColor: ['#2963A5', '#4a90e2'],
      borderColor: '#000000',
      data: [incompleteGoals.value, completedGoals.value],
    },
  ],
}));
</script>
