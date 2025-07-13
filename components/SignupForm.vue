<template>
  <div class="flex items-center justify-center min-h-screen -mt-24">
    <div
      class="relative w-fit bg-gradient-to-b from-white to-[#c4c4c4] shadow-2xl flex rounded-3xl px-6 py-8 justify-center text-center drop-shadow-lg"
      style="max-width: 100%; min-width: 280px;"
    >
      <form>
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
            required
            placeholder="Username"
            type="username"
            class="w-11/12 bg-white border-2 border-black outline-none rounded-full text-black text-md font-serif placeholder-black px-5 py-2 mb-3"
          />
        </div>

        <div class="w-full flex justify-center items-center">
          <input
            required
            placeholder="Email"
            type="email"
            class="w-11/12 bg-white border-2 border-black outline-none rounded-full text-black text-md font-serif placeholder-black px-5 py-2 mb-3"
          />
        </div>

        <div class="w-full flex justify-center items-center">
          <input
            required
            placeholder="Password"
            type="password"
            class="w-11/12 bg-white border-2 border-black outline-none rounded-full text-black text-md font-serif placeholder-black px-5 py-2"
          />
        </div>

        <div class="w-full flex justify-center pt-5">
          <button
            type="submit"
            class="inline-flex w-10/12 items-center justify-center rounded-full bg-black px-3.5 py-2.5 font-semibold leading-7 text-white"
          >
            Sign Up
          </button>
        </div>

        <div class="text-center mt-5 -mb-2">
          <p class="text-sm font-medium text-black">
            <span>Already have an account?</span>
            <button
              type="button"
              @click="() => props.onToggle('login')"
              class="text-black hover:underline select-none cursor-pointer ml-1 bg-transparent border-none p-0"
            >
              Log in
            </button>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import Logo from "~/assets/Logo.svg";
const props = defineProps({
  onToggle: Function,
});
</script>
