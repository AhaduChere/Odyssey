<template>
  <header
    class="fixed flex flex-col bg-[#C4C4C4] shadow-xl rounded-3xl w-[80px] h-[96vh] mt-4 pt-4 ml-4 px-auto">

    <img
      :src="Logo"
      draggable="false"
      alt="Logo"
      class="w-16 h-auto select-none self-center ml-0.5"
      style="filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.25))">

    <nav class="flex-1 flex items-center justify-center">
      <ul class="flex flex-col items-center gap-8">
        <li
          v-for="link in links"
          :key="link.to">
          <NuxtLink :to="link.to">
            <img
              :src="link.icon"
              class="w-10 h-auto transition duration-200 ease-in-out"
              :class="{
                'drop-shadow-2xl': route.path === link.to,
                'opacity-60 hover:opacity-100 hover:drop-shadow-2xl': route.path !== link.to,
              }">
          </NuxtLink>
        </li>
      </ul>
    </nav>
    <img
      :src="Settings"
      draggable="false"
      alt="Logo"
      class="w-10 h-auto select-none mb-6 self-center cursor-pointer transition duration-200"
      style="filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.25))"
      :class="{
        'opacity-100 drop-shadow-2xl': route.name === 'Settings',
        'opacity-60 hover:opacity-100': route.name !== 'Settings'
      }">

    <img
     :src="Logout"
     draggable="false"
     alt="Logo"
     class="w-10 h-auto select-none mb-6 opacity-60 hover:opacity-100 self-center cursor-pointer"
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
