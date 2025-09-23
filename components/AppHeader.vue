<template>
  <header class="flex fixed items-center bg-[#0f172a] shadow-2xl w-full min-w-[950px] h-20 px-6 mb-8 z-50">
    <img
      :src="Logo"
      draggable="false"
      alt="Logo"
      class="w-14 h-auto select-none"
      style="filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.25))" />

    <nav class="flex-1 flex justify-center">
      <ul class="flex items-center gap-8">
        <li v-for="link in links" :key="link.to">
          <NuxtLink :to="link.to">
            <div
              class="w-14 h-14 flex items-center justify-center rounded-xl transition-all duration-200 ease-in-out select-none"
              :class="{
                'bg-[#4a90e2]/20': route.path === link.to,
                'hover:bg-[#4a90e2]/20': route.path !== link.to,
              }">
              <img :src="link.icon" class="w-[36px] h-auto transition duration-200 ease-in-out" />
            </div>
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <img
      :src="Logout"
      draggable="false"
      alt="Logout"
      class="w-10 h-auto select-none opacity-80 hover:opacity-100 cursor-pointer"
      style="filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.25))"
      @click="logout" />
  </header>
</template>

<script setup>
import Logo from '~/assets/Logo.svg';
import Home from '~/assets/Home.svg';
import Calendar from '~/assets/Calendar.svg';
import Archive from '~/assets/Archive.svg';
import Account from '~/assets/Account.svg';
import Logout from '~/assets/Logout.svg';
import { useRoute } from 'vue-router';

const route = useRoute();

const links = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/Calendar', label: 'Calendar', icon: Calendar },
  { to: '/Archive', label: 'Archive', icon: Archive },
  { to: '/Account', label: 'Account', icon: Account },
];

const logout = async () => {
  await $fetch('/api/logout', { method: 'POST' });
  useState('user').value = null;
  window.location.reload();
};
</script>
