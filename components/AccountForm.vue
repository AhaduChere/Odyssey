<template>
  <div
    class="flex items-start justify-center min-h-screen mt-10 overflow-hidden"
  >
    <div class="relative h-[80vh] max-w-[90vw] min-w-[1200px] mx-auto bg-gradient-to-b from-white to-[#c4c4c4] shadow-2xl rounded-3xl flex justify-center drop-shadow-lg">
      <div class="pt-20 w-full">
        <h2 class="text-4xl mb-6 font-semibold">Account Info</h2>

        <p class="mb-4 text-gray-700 text-lg">
          <span class="font-semibold capitalize">Username:</span> {{ username }}
        </p>
        <p class="mb-8 text-gray-700 text-lg">
          <span class="font-semibold capitalize">Email:</span> {{ email }}
        </p>

        <button
          @click="logout"
          type="button"
          class="w-full text-lg px-6 py-3 rounded bg-stone-500 text-white hover:bg-stone-600 transition"
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

onMounted(() => {
  let UserID = useState("user").value.id;

  // username.value = "john_doe";
  // email.value = "john@example.com";
});

const logout = async () => {
  await $fetch("/api/logout", { method: "POST" });
  const user = useState("user");
  user.value = null;
  window.location.reload();
};
</script>
