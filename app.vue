<template>
    <MainHeader v-if="!['/Auth'].includes(route.path)"/>
    <NuxtPage/>
</template>

<script setup>
  import { useRoute } from "vue-router";
const route = useRoute();
</script>

<style>
@font-face {
  font-family: "Caeser";
  src: url("/CAESAR.TTF") format("truetype");
}
body {
  height: 100%;
  overflow-y: auto;
  background-image: linear-gradient(to top, #1a3a5d 0%, #4a90e2 100%);
  background-attachment: fixed;
}
</style>
