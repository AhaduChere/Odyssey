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
        class="relative min-h-[500px] w-full max-w-[75vw] bg-[#e3e9f3] rounded-3xl flex flex-col backdrop-blur-sm p-10 justify-between mt-10"
      >
        <h2
          class="text-5xl font-Caeser font-extrabold text-center text-neutral-800 tracking-tight select-none"
        >
          Dashboard
        </h2>
        <div class="grid grid-cols-2 gap-4">
          <div class="p-4 rounded-lg shadow">
            <h3 class="text-lg font-semibold select-none">Goals In Progress</h3>
            <p class="text-3xl select-none">{{ inProgressCount }}</p>
          </div>
          <div class="p-4 rounded-lg shadow">
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

onMounted(() => {
  loading.value = false;
});
</script>
