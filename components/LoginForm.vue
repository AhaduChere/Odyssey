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
          <span class="block text-xl font-normal mt-2 text-[#a0a0ff]">Track your goals</span>
          <span class="block text-xl font-normal text-[#a0a0ff]">one journey at a time</span>
        </div>

        <div class="w-full flex justify-center items-center">
          <input
            v-model="username"
            required
            placeholder="Username"
            type="text"
            class="w-11/12 bg-[#1c2541] border border-neutral-800 outline-none rounded-2xl text-[#a0a0ff] text-md font-serif placeholder-[#a0a0ff] px-5 py-3 mb-5 shadow-sm focus:ring-2 focus:ring-[#a0a0ff]" />
        </div>

        <div class="w-full flex justify-center items-center">
          <input
            v-model="password"
            required
            placeholder="Password"
            type="password"
            class="w-11/12 bg-[#1c2541] border border-neutral-800 outline-none rounded-2xl text-[#a0a0ff] text-md font-serif placeholder-[#a0a0ff] px-5 py-3 shadow-sm focus:ring-2 focus:ring-[#a0a0ff]" />
        </div>

        <div class="w-full flex justify-center pt-4">
          <button
            type="submit"
            class="inline-flex w-10/12 items-center justify-center rounded-2xl bg-[#1c2541] border border-neutral-800 px-4 py-3 font-semibold text-[#a0a0ff] shadow-md hover:scale-105 active:translate-y-1 transition-all duration-200">
            Login
          </button>
        </div>

        <div class="text-center mt-4">
          <p class="text-sm font-medium text-[#a0a0ff] text-center">
            <span
              role="button"
              tabindex="0"
              class="hover:underline select-none block cursor-pointer"
              @click="() => props.onToggle('signup')"
              @keydown.enter="() => props.onToggle('signup')">
              Sign Up
            </span>

            <span
              role="button"
              tabindex="0"
              class="hover:underline select-none block cursor-pointer pt-2"
              @click="() => props.onToggle('forgot')">
              Forgot Password?
            </span>
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
