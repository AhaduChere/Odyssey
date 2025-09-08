<template>
  <main>
    <section v-if="loading" class="flex items-center justify-center h-[80vh] overflow-hidden">
      <div class="flex flex-row gap-2">
        <div class="w-10 h-10 rounded-full bg-blue-50 animate-bounce" />
        <div class="w-10 h-10 rounded-full bg-blue-50 animate-bounce [animation-delay:-.3s]" />
        <div class="w-10 h-10 rounded-full bg-blue-50 animate-bounce [animation-delay:-.5s]" />
      </div>
    </section>
    <section class="flex items-start justify-center flex-row pt-20">
      <HomeDashboard v-show="!loading" @ready="Dloading = false" />
        <QuickAdd v-show="!loading" />
    </section>
  </main>
</template>

<script setup>
import { ref, watch } from 'vue';

const Dloading = ref(true);
const loading = ref(true);

watch([Dloading], ([d]) => {
  loading.value = d;
});
</script>
