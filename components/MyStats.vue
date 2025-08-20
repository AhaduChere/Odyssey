<template>
  <div
    class="relative min-h-[600px] w-[450px] bg-[#e3e9f3] rounded-3xl flex flex-col backdrop-blur-sm p-6 mt-8">
    <h3 class="text-2xl font-semibold mb-4 text-center">MY STATS</h3>

    <div class="mb-6">
      <div class="h-48 rounded-lg flex items-center justify-center text-neutral-500 select-none pb-10">
        <Doughnut :data="goaldata" :options="options"/>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div class="p-5 rounded-lg border border-neutral-600 bg-white/30">
        <h3 class="text-md font-semibold select-none mb-1 text-center">Incomplete Goals</h3>
        <p class="text-2xl select-none font-mono">{{ incompleteGoals }}</p>
      </div>
      <div class="p-5 rounded-lg border border-neutral-600">
        <h3 class="text-md font-semibold select-none mb-1 text-center">Complete Goals</h3>
        <p class="text-2xl select-none font-mono">{{ completedGoals }}</p>
      </div>
      <div class="p-5 rounded-lg border border-neutral-600 bg-white/30 col-span-2">
        <h3 class="text-md font-semibold select-none mb-1 text-center">Total Goals</h3>
        <p class="text-2xl select-none font-mono">{{ totalGoals }}</p>
      </div>
    </div>

  </div>
</template>

<script setup>
  import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
  import { Doughnut } from "vue-chartjs";
  ChartJS.register(ArcElement, Tooltip);

  const emit = defineEmits(["ready"]);
  const userId = useState("user").value.id;
  const incompleteGoals = ref(0);
  const completedGoals = ref(0);
  const totalGoals = ref(0);

  onMounted(() => {
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
    fetchData();
  });
  const options = {
    maintainAspectRatio: true,
  };

  const goaldata = computed(() => ({
    labels: ["Incomplete Goals", "Complete Goals"],
    datasets: [
      {
        backgroundColor: ["#94a3b8", "#1a3a5d"],
        data: [incompleteGoals.value, completedGoals.value],
      },
    ],
  }));
</script>
