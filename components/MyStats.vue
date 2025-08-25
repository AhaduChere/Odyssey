<template>
  <div
    class="relative h-[550px] w-[450px] bg-[#e3e9f3] rounded-3xl flex flex-col backdrop-blur-sm p-6 mt-8">
    <h3 class="text-2xl font-semibold mb-4 text-center">MY STATS</h3>

       <div class="h-48 rounded-lg flex items-center justify-center text-neutral-500 select-none mb-11 mt-4">
        <Doughnut :data="goaldata" :options="options"/>
      </div>

<div class="grid grid-cols-2 gap-4">
  <div class="rounded-lg border-2 border-neutral-800 px-4 py-3 shadow-sm">
    <h3 class="text-sm font-semibold select-none text-gray-700 mb-1">Incomplete Goals</h3>
    <p class="text-2xl font-mono text-gray-900">{{ incompleteGoals }}</p>
  </div>

  <div class="rounded-lg border-2 border-neutral-800 px-4 py-3 shadow-sm">
    <h3 class="text-sm font-semibold select-none text-gray-700 mb-1">Complete Goals</h3>
    <p class="text-2xl font-mono text-gray-900">{{ completedGoals }}</p>
  </div>

  <div class="rounded-lg border-2 border-neutral-800 px-4 py-3 shadow-sm col-span-2">
    <h3 class="text-sm font-semibold select-none text-gray-700 mb-1">Total Goals</h3>
    <p class="text-2xl font-mono text-gray-900">{{ totalGoals }}</p>
  </div>
</div>

  </div>
</template>

<script setup>
  import { needsRefresh } from "~/composables/refresh.js";
  import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
  import { Doughnut } from "vue-chartjs";
  ChartJS.register(ArcElement, Tooltip);


  const emit = defineEmits(["ready"]);
  const userId = useState("user").value.id;
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
        console.error("Failed to fetch data", err);
      }
      setTimeout(() => {
        emit("ready");
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
    labels: ["Incomplete Goals", "Complete Goals"],
    datasets: [
      {
        backgroundColor: ["#2963A5", "#4a90e2"],
        data: [incompleteGoals.value, completedGoals.value],
      },
    ],
  }));
</script>
