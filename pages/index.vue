<template>
  <main>
    <section v-if="loading" class="flex items-center justify-center h-[80vh] overflow-hidden">
      <!-- Loading Animation -->
      <div class="flex flex-row gap-2">
        <div class="w-10 h-10 rounded-full bg-blue-50 animate-bounce" />
        <div class="w-10 h-10 rounded-full bg-blue-50 animate-bounce [animation-delay:-.3s]" />
        <div class="w-10 h-10 rounded-full bg-blue-50 animate-bounce [animation-delay:-.5s]" />
      </div>
    </section>
    <section class="flex items-center justify-center flex-row min-w-[1800px] w-[1800px] mx-auto">
      <HomeLwidget v-show="!loading" @ready="LWloading = false" />
      <HomeDashboard v-show="!loading" @ready="Dloading = false" />
      <HomeRwidget v-if="!loading" />
    </section>
  </main>
</template>

<script setup>
  import { ref, watch } from "vue";

  const Dloading = ref(true);
  const LWloading = ref(true);
  const loading = ref(true);

  watch([Dloading, LWloading], ([d, lw]) => {
    loading.value = d || lw;
  });
</script>
