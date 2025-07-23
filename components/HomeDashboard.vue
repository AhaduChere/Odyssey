<template>
  <section v-if="loading" class="flex items-center justify-center h-[80vh] overflow-hidden">
    <!-- Loading Animation From Uiverse.io by Javierrocadev -->
    <div class="flex flex-row gap-2">
      <div class="w-10 h-10 rounded-full bg-blue-50 animate-bounce" />
      <div class="w-10 h-10 rounded-full bg-blue-50 animate-bounce [animation-delay:-.3s]" />
      <div class="w-10 h-10 rounded-full bg-blue-50 animate-bounce [animation-delay:-.5s]" />
    </div>
  </section>
  <section v-else class="flex flex-col items-center mt-8 px-6">
    <div
      class="relative min-h-[600px] w-full max-w-[35vw] min-w-[989px] bg-[#e3e9f3] rounded-3xl flex flex-col backdrop-blur-sm p-10">
      <h2
        class="text-5xl font-Caeser font-extrabold text-center text-neutral-800 tracking-tight select-none pb-10 -mt-4">
        My Dashboard
      </h2>

      <div class="grid grid-cols-3 gap-6 mb-8">
        <div class="p-4 rounded-lg border-2 border-neutral-800">
          <h3 class="text-lg font-semibold select-none">Incomplete Goals</h3>
          <p class="text-3xl select-none">{{ incompleteGoals }}</p>
        </div>
        <div class="p-4 rounded-lg border-2 border-neutral-800">
          <h3 class="text-lg font-semibold select-none">Complete Goals</h3>
          <p class="text-3xl select-none">{{ completedGoals }}</p>
        </div>
        <div class="p-4 rounded-lg border-2 border-neutral-800">
          <h3 class="text-lg font-semibold select-none">Total Goals</h3>
          <p class="text-3xl select-none">{{ totalGoals }}</p>
        </div>
      </div>
      <div class="mb-8">
        <div class="h-48 rounded-lg flex items-center justify-center text-neutral-500 select-none">
          <Doughnut :data="goaldata" :options="options" />
        </div>
      </div>
      <div>
        <h3 class="text-2xl font-semibold mb-4">Upcoming Goals</h3>
        <ul class="space-y-3 max-h-[200px] overflow-y-auto">
          <li
            v-for="(goal, index) in upcomingGoals"
            :key="index"
            class="flex justify-between items-center border-2 border-neutral-800 p-4 rounded-lg hover:shadow-md transition-shadow duration-200">
            <div>
              <p class="font-medium text-lg">{{ goal.name }}</p>
              <p class="text-sm text-gray-500">
                Deadline:
                <span class="font-semibold">{{ goal.deadline }}</span>
              </p>
            </div>
            <button class="px-3 py-1 bg-green-200 text-green-800 rounded text-sm select-none">
              {{ goal.completed === "TRUE" ? "Done" : "Mark as Complete" }}
            </button>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
  import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
  import { Doughnut } from "vue-chartjs";
  ChartJS.register(ArcElement, Tooltip);

  const loading = ref(true);
  const incompleteGoals = ref(0);
  const completedGoals = ref(0);
  const totalGoals = ref(0);
  const userId = useState("user").value.id;
  const upcomingGoals = ref({});

  onMounted(() => {
    const fetchData = async () => {
      try {
        const goalsdata = await $fetch(`/api/goals?id=${userId}`);
        incompleteGoals.value = goalsdata.incomplete;
        completedGoals.value = goalsdata.completed;
        totalGoals.value = incompleteGoals.value + completedGoals.value;
        for (let i = 0; i < goalsdata.upcoming.length; i++) {
          const upcg = {
            goalid: goalsdata.upcoming[i].goal_id,
            name: goalsdata.upcoming[i].goal_name,
            startD: formatDate(goalsdata.upcoming[i].start_date),
            completed: goalsdata.upcoming[i].completed,
            completedD: formatDate(goalsdata.upcoming[i].completed_date),
            createdD: formatDate(goalsdata.upcoming[i].created_at),
            deadline: formatDate(goalsdata.upcoming[i].deadline),
            description: goalsdata.upcoming[i].description,
          };
          upcomingGoals.value[upcg.goalid] = upcg;
        }
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
      setTimeout(() => {
        loading.value = false;
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

  const formatDate = (datetime) => {
    const [datePart] = datetime.split(" ");
    const [year, month, day] = datePart.split("-");
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${monthNames[parseInt(month) - 1]} ${parseInt(day)}, ${year}`;
  };
</script>
