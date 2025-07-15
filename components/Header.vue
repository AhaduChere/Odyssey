<template>
  <header class="flex items-center justify-between bg-gradient-to-b from-white to-[#c4c4c4] shadow-lg px-5">
    <div class="flex items-center">
      <NuxtLink to="/" class="flex items-center">
        <img
          :src="Logo"
          alt="Logo"
          class="w-20 h-20"
          style="filter: drop-shadow(0px 5px 5px rgba(0,0,0,0.25))"
        />
      </NuxtLink>
      <h1
        class="text-4xl pl-4 pt-2 font-Caeser select-none font-bold text-black whitespace-nowrap"
      >
        Odyssey Financial
      </h1>
    </div>

    <div class="flex items-center space-x-4">
      <button
        @click="logout"
        class="text-sm px-4 py-1 rounded bg-red-500 text-white hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  </header>
</template>

<script setup>
import Logo from '~/assets/Logo.svg'
import { useState, useCookie } from '#app'

const logout = async () => {
  await $fetch('/api/logout', { method: 'POST' });
  const user = useState('user');
  user.value = null;
  window.location.reload();
};
</script>
