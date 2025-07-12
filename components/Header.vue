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
      <h1 class="text-4xl pl-4 pt-2 font-Caeser select-none font-bold text-black whitespace-nowrap">
        Odyssey Financial
      </h1>
    </div>

    <ul class="flex items-center space-x-4 text-md font-medium text-black uppercase select-none">
      <li><NuxtLink to="/About" class="hover:underline">About</NuxtLink></li>
      <li><NuxtLink to="/Privacy" class="hover:underline">Privacy</NuxtLink></li>
      <li><NuxtLink to="/Locations" class="hover:underline">Locations</NuxtLink></li>
      <li><NuxtLink to="/Contact" class="hover:underline">Contact</NuxtLink></li>
    </ul>
  </header>
</template>

<script setup>
import Logo from '~/assets/Logo.svg'
</script>
