<template>
  <div class="flex items-center justify-center min-h-screen -mt-24">
    <div
      class="relative w-fit bg-gradient-to-b from-white to-[#c4c4c4] shadow-2xl flex rounded-3xl px-6 py-8 justify-center text-center drop-shadow-lg"
      style="max-width: 100%; min-width: 424px"
    >
      <form @submit.prevent="login">
        <div class="flex justify-center">
          <div class="w-[120px] h-[120px] mx-32 mb-4 select-none">
            <img
              draggable="false"
              :src="Logo"
              alt="Logo"
              style="filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.25))"
            />
          </div>
        </div>

        <div
          class="text-center text-black text-5xl font-Caeser select-none -mt-10 font-bold pb-6"
        >
          <span class="block font-bold">Odyssey</span>
          <span class="block text-xl font-normal mt-2">Track your goals</span>
          <span class="block text-xl font-normal">one journey at a time</span>
        </div>

        <div class="w-full flex justify-center items-center">
          <input
            v-model="username"
            required
            placeholder="Username"
            type="text"
            class="w-11/12 bg-white border-2 border-black outline-none rounded-full text-black text-md font-serif placeholder-black px-5 py-2 mb-5"
          />
        </div>

        <div class="w-full flex justify-center items-center">
          <input
            v-model="password"
            required
            placeholder="Password"
            type="password"
            class="w-11/12 bg-white border-2 border-black outline-none rounded-full text-black text-md font-serif placeholder-black px-5 py-2"
          />
        </div>

        <div class="w-full flex justify-center pt-4">
          <button
            type="submit"
            class="inline-flex w-10/12 items-center justify-center rounded-full bg-black px-3.5 py-2 font-semibold leading-7 text-white"
          >
            Login
          </button>
        </div>

        <div class="text-center mt-2">
          <p class="text-sm font-medium text-black text-center">
            <span
              @click="() => props.onToggle('signup')"
              role="button"
              tabindex="0"
              class="text-black hover:underline select-none block cursor-pointer"
              @keydown.enter="() => props.onToggle('signup')"
            >
              Sign Up
            </span>

            <span
              @click="() => props.onToggle('forgot')"
              role="button"
              tabindex="0"
              class="text-black hover:underline select-none block cursor-pointer pt-2 -mb-4"
            >
              Forgot Password?
            </span>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import Logo from "~/assets/Logo.svg";
import { navigateTo } from "#app";
import { ref } from "vue";

const props = defineProps({
  onToggle: Function,
});

const username = ref("");
const password = ref("");

const login = async () => {
  try {
    await $fetch("/api/login", {
      method: "POST",
      body: { username: username.value, password: password.value },
    });
    window.location.reload();
  } catch (error) {
    console.error("Login failed:", error);
  }
};
</script>
