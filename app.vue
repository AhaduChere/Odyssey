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
  min-width: 950px;
  overflow-y: hidden;
  background: #1c2541;
  background-attachment: fixed;
}
input:-moz-autofill {
  background-color: transparent !important;
  box-shadow: 0 0 0px 1000px transparent inset !important;
  -webkit-text-fill-color: black !important;
}
</style>
