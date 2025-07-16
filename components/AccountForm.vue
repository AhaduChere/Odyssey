<template>
  <div class="flex items-center justify-center mt-10 px-6 overflow-hidden">
    <div
      class="relative min-h-[725px] w-full max-w-[90vw] min-w-[615px] bg-gradient-to-b from-white to-[#7a7a7a] rounded-3xl flex flex-col border border-gray-300/50 backdrop-blur-sm p-10 justify-between"
    >
      <div class="space-y-8">
        <h2 class="text-5xl font-Caeser font-extrabold text-center text-neutral-800 tracking-tight">
          My Account
        </h2>

        <div class="grid grid-cols-2 gap-6 text-neutral-800">
          <div class="p-4 rounded-xl backdrop-blur-sm border border-neutral-300 shadow-sm">
            <p class="text-sm font-medium text-neutral-500">Username</p>
            <p class="font-semibold text-xl">{{ username }}</p>
          </div>
          <div class="p-4 rounded-xl backdrop-blur-sm border border-neutral-300 shadow-sm">
            <p class="text-sm font-medium text-neutral-500">Email</p>
            <p class="font-semibold text-xl">{{ email }}</p>
          </div>
          <div class="p-4 rounded-xl backdrop-blur-sm border border-neutral-300 shadow-sm">
            <p class="text-sm font-medium text-neutral-500">Goals In Progress</p>
            <p class="font-semibold text-xl">{{ goalsInProgress }}</p>
          </div>
          <div class="p-4 rounded-xl backdrop-blur-sm border border-neutral-300 shadow-sm">
            <p class="text-sm font-medium text-neutral-500">Goals Completed</p>
            <p class="font-semibold text-xl">{{ goalsCompleted }}</p>
          </div>
        </div>
      </div>

      <div class="flex gap-4 pt-4">
        <button
          @click="editProfile"
          class="flex-1 py-3 rounded-xl text-base font-semibold border border-neutral-800 text-neutral-800 hover:bg-neutral-800 hover:text-white transition"
        >
          Edit Profile
        </button>
        <button
          @click="logout"
          class="flex-1 py-3 rounded-xl text-base font-semibold border border-neutral-800 text-neutral-800 hover:bg-neutral-800 hover:text-white transition"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useState } from "#app";

const username = ref("");
const email = ref("");
const goalsInProgress = ref(0);
const goalsCompleted = ref(0);

onMounted(() => {
  const Userid = useState("user").value;
  username.value = "john_doe";
  email.value = "john@example.com";
});

const logout = async () => {
  await $fetch("/api/logout", { method: "POST" });
  useState("user").value = null;
  window.location.reload();
};
</script>
