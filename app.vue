<template>
  <MainHeader v-if="!['/Auth'].includes(route.path)" />
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
  overflow-y: auto;
  background: #1a3a5d;
  background-attachment: fixed;
}
</style>
