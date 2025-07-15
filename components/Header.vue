<template>
  <header
    class="flex items-center justify-between bg-gradient-to-b from-white to-[#c4c4c4] shadow-lg px-5"
  >
    <div class="flex items-center">
      <NuxtLink to="/" class="flex items-center">
        <img
          :src="Logo"
          alt="Logo"
          class="w-20 h-20"
          style="filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.25))"
        />
      </NuxtLink>
      <h1
        class="text-4xl pl-4 pt-2 font-Caeser select-none font-bold text-black whitespace-nowrap"
      >
        Odyssey
      </h1>
    </div>

    <ul
      class="flex items-center space-x-6 text-xl font-medium select-none"
    >
      <li v-for="link in links" :key="link.to">
        <NuxtLink
          :to="link.to"
          class="text-gray-400 hover:text-black transition-colors duration-200 cursor-pointer"
          exact-active-class="!text-black"
        >
          {{ link.label }}
        </NuxtLink>
      </li>
    </ul>

    <!-- <button -->
    <!--   @click="logout" -->
    <!--   class="text-sm px-4 py-1 rounded bg-red-500 text-white hover:bg-red-600" -->
    <!-- > -->
    <!--   Logout -->
    <!-- </button> -->
  </header>
</template>

<script setup>
import Logo from "~/assets/Logo.svg";
import { useState, useCookie } from "#app";

const logout = async () => {
  await $fetch("/api/logout", { method: "POST" });
  const user = useState("user");
  user.value = null;
  window.location.reload();
};
const links = [
  { to: "/", label: "Home" },
  { to: "/filler1", label: "Filler" },
  { to: "/filler2", label: "Filler" },
  { to: "/Account", label: "Account" },
];
</script>
