<template>
  <AppHeader v-if="!['/Auth'].includes(route.path)" />
  <NuxtPage />
</template>

<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
</script>

<style>
@font-face {
  font-family: 'Caeser';
  src: url('/CAESAR.TTF') format('truetype');
}
body {
  height: 100%;
  min-width: 950px;
  background: #1c2541;
  background-attachment: fixed;
}
</style>
