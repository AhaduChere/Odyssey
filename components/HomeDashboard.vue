<template>
  <section class="flex flex-col items-center mt-8 px-6">
    <div
      class="relative min-h-[550px] max-w-[35vw] min-w-[880px] bg-[#e3e9f3] rounded-3xl flex flex-col backdrop-blur-sm p-10">
      <div>
        <h3 class="text-2xl font-semibold mb-4 -mt-5 text-center">UPCOMING GOALS</h3>
        <ul class="space-y-3 max-h-[600px] overflow-y-auto">
          <li
            v-for="(goal, index) in upcomingGoals.slice(0, 5)"
            :key="index"
            class="flex justify-between items-center border-2 border-neutral-800 p-4 rounded-lg hover:shadow-md transition-shadow duration-200">
            <div>
              <p class="font-medium text-lg">{{ goal.name }}</p>
              <p class="text-sm text-gray-500">
                Deadline:
                <span class="font-semibold">{{ goal.deadline }}</span>
              </p>
            </div>
            <button
              class="px-3 py-1 border border-l-black h-full rounded text-sm select-none"
              @click="Completegoal(goal)">
              <div>
                Mark as Complete
              </div>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { needsRefresh } from "~/composables/refresh.js";
const emit = defineEmits(["ready"]);
const userId = useState("user").value.id;
const upcomingGoals = ref([]);

const formatDate = (datetime) => {
  const [datePart] = datetime.split(" ");
  const [year, month, day] = datePart.split("-");
  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
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
    console.error("Failed to fetch data", err);
  }
  setTimeout(() => {
    emit("ready");
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
await $fetch("/api/goals", {
  method: "POST",
  body: {
    action: "update",
    goalID: goal.goalid
  }
});
    needsRefresh.value = true;
  } catch (err) {
    console.error("Failed to complete goal", err);
    alert("Could not mark goal as complete. Try again.");
  }
};
</script>
