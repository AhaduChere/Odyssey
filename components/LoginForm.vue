<template>
  <div class="flex items-center justify-center min-h-screen -mt-24">
    <div
      class="relative w-fit bg-[#0f172a] shadow-xl flex rounded-3xl px-8 py-10 justify-center text-center border-2 border-black"
      style="max-width: 100%; min-width: 424px">
      <form class="w-full" @submit.prevent="login">
        <div class="flex justify-center">
          <div class="mb-16 -mt-4 select-none">
            <img draggable="false" :src="Logo" alt="Logo" class="drop-shadow-lg w-20" />
          </div>
        </div>

        <div class="text-center text-white text-5xl font-Caeser select-none -mt-10 font-bold pb-8">
          <span class="block font-bold">Odyssey</span>
          <span class="block text-xl font-normal mt-2 text-indigo-400">Track your goals</span>
          <span class="block text-xl font-normal text-indigo-400">one journey at a time</span>
        </div>

        <div class="w-full flex justify-center items-center">
          <input
            v-model="username"
            required
            placeholder="Username"
            type="text"
            class="w-11/12 bg-[#1c2541] border border-neutral-800 outline-none rounded-2xl text-indigo-400 text-md font-serif placeholder-indigo-400 px-5 py-3 mb-5 shadow-sm focus:ring-2 focus:ring-indigo-400" />
        </div>

        <div class="w-full flex justify-center items-center">
          <input
            v-model="password"
            required
            placeholder="Password"
            type="password"
            class="w-11/12 bg-[#1c2541] border border-neutral-800 outline-none rounded-2xl text-indigo-400 text-md font-serif placeholder-indigo-400 px-5 py-3 shadow-sm focus:ring-2 focus:ring-indigo-400" />
        </div>

        <div class="w-full flex justify-center pt-4">
          <button
            type="submit"
            class="inline-flex w-10/12 items-center justify-center rounded-2xl bg-[#1c2541] border border-neutral-800 px-4 py-3 font-semibold text-indigo-400 shadow-md hover:scale-105 active:translate-y-1 transition-all duration-200">
            Login
          </button>
        </div>

        <div class="text-center mt-5 -mb-2">
          <p class="text-sm font-medium text-indigo-400">
            <span>Dont have an account?</span>
            <button
              type="button"
              class="text-indigo-400 hover:underline select-none cursor-pointer ml-1 bg-transparent border-none p-0 font-extrabold"
              @click="() => props.onToggle('signup')">
              Signup
            </button>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import Logo from '~/assets/Logo.svg';
import { ref } from 'vue';

const props = defineProps({
  onToggle: {
    type: Function,
    default: () => {},
  },
});

const username = ref('');
const password = ref('');

const login = async () => {
  try {
    await $fetch('/api/login', {
      method: 'POST',
      body: { username: username.value, password: password.value },
    });
    window.location.reload();
  } catch (error) {
    if (error?.statusCode === 401) {
      alert('Invalid Credentials');
    } else {
      alert('Server Error');
    }
  }
};
</script>
