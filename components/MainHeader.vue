<template>
  <header
    class="fixed flex flex-col bg-[#C4C4C4] shadow-2xl rounded-3xl w-[80px] h-[96vh] mt-4 pt-4 ml-4 px-auto">

    <img
      :src="Logo"
      draggable="false"
      alt="Logo"
      class="w-16 h-auto select-none self-center ml-0.5"
      style="filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.25))">

    <nav class="flex-1 flex items-center justify-center">
      <ul class="flex flex-col items-center gap-10">
        <li
          v-for="link in links"
          :key="link.to">
          <NuxtLink :to="link.to">
          <div
            class="w-14 h-14 flex items-center rounded-xl justify-center transition-all duration-200 ease-in-out"
            :class="{
            'bg-black': route.path === link.to,
              'hover:scale-105': route.path !== link.to
            }">
            <img 
              :src="link.icon" 
              class="w-[36px] h-auto transition duration-200 ease-in-out"
              :class="{ 'invert': route.path === link.to, }">
            </div>
          </NuxtLink>
        </li>
      </ul>
    </nav>
    <img
     :src="Settings"
     draggable="false"
     alt="Logo"
     class="w-10 h-auto select-none mb-6 opacity-80 hover:opacity-100 self-center cursor-pointer"
     style="filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.25))">

    <img
     :src="Logout"
     draggable="false"
     alt="Logo"
     class="w-10 h-auto select-none mb-6 opacity-80 hover:opacity-100 self-center cursor-pointer"
     style="filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.25))"
     @click="logout">
  </header>
</template>

<script setup>
import Logo from "~/assets/Logo.svg";
import Home from "~/assets/Home.svg";
import Calendar from "~/assets/Calendar.svg";
import Archive from "~/assets/Archive.svg";
import Account from "~/assets/Account.svg";
import Logout from "~/assets/Logout.svg";
import Settings from "~/assets/Settings.svg";
import { useRoute } from "vue-router";

const route = useRoute();

const links = [
  { to: "/", label: "Home", icon: Home },
  { to: "/Calendar", label: "Calendar", icon: Calendar },
  { to: "/Archive", label: "Archive", icon: Archive },
  { to: "/Account", label: "Account", icon: Account },
];

  const logout = async () => {
    await $fetch("/api/logout", { method: "POST" });
    useState("user").value = null;
    window.location.reload();
  };

</script>
