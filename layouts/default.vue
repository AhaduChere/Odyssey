<template>
  <Header v-if="!['/Auth'].includes(route.path)" />
  <main>
    <slot />
  </main>
</template>

<script setup>
import { useRoute } from 'vue-router'
import Header from '~/components/Header.vue'
const route = useRoute()
</script>
