<template>
  <div>
    <MainHeader v-if="!['/Auth'].includes(route.path)" />
    <slot />
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
</script>
