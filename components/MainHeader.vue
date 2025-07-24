<template>
  <header
  class="flex items-center justify-between bg-[#f5f5f5] shadow-xl px-6 rounded-3xl max-w-[98vw] min-w-[1800px] min-h-[65px] mx-auto mt-4 border border-white/20"
  >
    <img
      :src="Logo"
      draggable="false"
      alt="Logo"
      class="w-[80px] h-[80px] flex-shrink-0 select-none"
      style="filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.25))"
    >
    <h1
      class="text-4xl ml-2 pt-2 font-Caeser select-none font-bold text-black whitespace-nowrap"
    >
      Odyssey
    </h1>

    <div class="overflow-visible w-full flex relative">
      <ul
        class="flex items-center text-2xl font-medium select-none ml-auto whitespace-nowrap relative"
      >
        <li
          v-for="link in links"
          :key="link.to"
          class="cursor-pointer divide-x-2 font-Caeser font-bold"
        >
          <NuxtLink
            :to="link.to"
            :class="{
              'text-black px-2  drop-shadow-2xl': route.path === link.to,
              'text-neutral-500 px-2 hover:text-black hover:drop-shadow-2xl':
                route.path !== link.to,
            }"
          >
            {{ link.label }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup>
import Logo from "~/assets/Logo.svg";
import { useRoute } from "vue-router";

const route = useRoute();

const links = [
  { to: "/", label: "Home" },
  { to: "/Calendar", label: "Calendar" },
  { to: "/Archive", label: "Archive" },
  { to: "/Account", label: "Account" },
];
</script>
