<template>
  <section
    v-if="loading"
    class="flex items-center justify-center h-[80vh] overflow-hidden"
  >
    <!-- Loading Animation From Uiverse.io by Javierrocadev -->
    <div class="flex flex-row gap-2">
      <div class="w-10 h-10 rounded-full bg-blue-50 animate-bounce" />
      <div
        class="w-10 h-10 rounded-full bg-blue-50 animate-bounce [animation-delay:-.3s]"
      />
      <div
        class="w-10 h-10 rounded-full bg-blue-50 animate-bounce [animation-delay:-.5s]"
      />
    </div>
  </section>
  <section v-else>
    <div class="flex items-center justify-center mt-2 px-6 overflow-hidden">
      <div
        class="relative min-h-[600px] w-full max-w-[75vw] min-w-[989px] bg-[#e3e9f3] rounded-3xl flex flex-col backdrop-blur-sm p-10 mt-10"
      >
        <h2
          class="text-5xl font-Caeser font-extrabold text-center text-neutral-800 tracking-tight select-none pb-10 -mt-4"
        >
          My Dashboard
        </h2>
        <div class="grid grid-cols-2 gap-4">
          <div class="p-4 rounded-lg border-2 border-neutral-800">
            <h3 class="text-lg font-semibold select-none">Goals In Progress</h3>
            <p class="text-3xl select-none">{{ inProgressCount }}</p>
          </div>
          <div class="p-4 rounded-lg border-2 border-neutral-800">
            <h3 class="text-lg font-semibold select-none">Goals Completed</h3>
            <p class="text-3xl select-none">{{ completedCount }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const loading = ref(true);
const inProgressCount = ref(0);
const completedCount = ref(0);
const userId = useState("user").value.id;

onMounted(() => {
  const fetchData = async () => {
    try {
      const goalsdata = await $fetch(`/api/goals?id=${userId}`);
      inProgressCount.value = goalsdata.inprogress;
      completedCount.value = goalsdata.completed;
    } catch (err) {
      console.error("Failed to fetch data", err);
    }
    setTimeout(() => {
      loading.value = false;
    }, 200);
  };
  fetchData();
});
</script>
