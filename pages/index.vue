<template>
  <main>
    <section v-if="loading" class="flex items-center justify-center h-[80vh] overflow-hidden">
      <div class="flex flex-row gap-2">
        <div class="w-10 h-10 rounded-full bg-blue-50 animate-bounce"/>
        <div class="w-10 h-10 rounded-full bg-blue-50 animate-bounce [animation-delay:-.3s]"/>
        <div class="w-10 h-10 rounded-full bg-blue-50 animate-bounce [animation-delay:-.5s]"/>
      </div>
    </section>
    <section class="flex items-startjustify-center flex-row w-[1200px] mx-auto">
     <HomeDashboard v-show="!loading" @ready="Dloading = false"/>
      <div class="grid-cols-1">
        <MyStats v-show="!loading" @ready="MSloading = false"/>
        <QuickAdd v-show="!loading"/>
      </div>
    </section>
  </main>
</template>

<script setup>
  import { ref, watch } from "vue";

  const Dloading = ref(true);
  const MSloading = ref(true);
  const loading = ref(true);

  watch([Dloading, MSloading], ([d, ms]) => {
    loading.value = d || ms;
  });
</script>
