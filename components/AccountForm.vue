<template>
  <section
    v-if="loading"
    class="flex items-center justify-center h-[80vh] overflow-hidden"
  >
    <!-- From Uiverse.io by Javierrocadev -->
    <div class="flex flex-row gap-2">
      <div class="w-10 h-10 rounded-full bg-blue-50 animate-bounce"></div>
      <div
        class="w-10 h-10 rounded-full bg-blue-50 animate-bounce [animation-delay:-.3s]"
      ></div>
      <div
        class="w-10 h-10 rounded-full bg-blue-50 animate-bounce [animation-delay:-.5s]"
      ></div>
    </div>
  </section>
  <section v-else>
    <div class="flex items-center justify-center mt-10 px-6 overflow-hidden">
      <div
        class="relative min-h-[725px] w-full max-w-[35vw] min-w-[615px] bg-gradient-to-b from-neutral-200 to-neutral-500 rounded-3xl flex flex-col backdrop-blur-sm p-10 justify-between"
      >
        <div class="space-y-8">
          <h2
            class="text-5xl font-Caeser font-extrabold text-center text-neutral-800 tracking-tight"
          >
            My Account
          </h2>

          <div
            class="grid grid-cols-1 gap-6 max-w-4xl mx-auto text-neutral-900"
          >
            <div
              class="relative p-6 rounded-2xl border border-neutral-800 shadow-lg bg-transparent"
            >
              <p class="text-xs uppercase tracking-wide text-neutral-600 mb-1">
                Username
              </p>
              <div v-if="Edit">
                <input
                  class="text-2xl font-bold bg-transparent border-black border-b w-full focus:outline-none focus:shadow-none"
                  v-model="Tempusername"
                />
              </div>
              <div v-else>
                <p class="text-2xl font-bold">{{ username }}</p>
              </div>
            </div>

            <div
              class="relative p-6 rounded-2xl border border-neutral-800 shadow-lg bg-transparent"
            >
              <p class="text-xs uppercase tracking-wide text-neutral-600 mb-1">
                Email
              </p>
              <div v-if="Edit">
                <input
                  class="text-2xl font-bold bg-transparent border-black border-b w-full focus:outline-none focus:shadow-none"
                  v-model="Tempemail"
                  type="email"
                />
              </div>
              <div v-else>
                <p class="text-2xl font-bold">{{ email }}</p>
              </div>
            </div>

            <div
              class="relative p-6 rounded-2xl border border-neutral-800 shadow-lg bg-transparent"
            >
              <p class="text-xs uppercase tracking-wide text-neutral-600 mb-1">
                Goals In Progress
              </p>
              <p class="text-2xl font-bold">{{ goalsInProgress }}</p>
            </div>

            <div
              class="relative p-6 rounded-2xl border border-neutral-800 shadow-lg bg-transparent"
            >
              <p class="text-xs uppercase tracking-wide text-neutral-600 mb-1">
                Goals Completed
              </p>
              <p class="text-2xl font-bold">{{ goalsCompleted }}</p>
            </div>
          </div>
        </div>
        <div class="flex gap-4 pt-4">
          <button
            v-if="Edit"
            @click="saveChanges"
            class="flex-1 py-3 rounded-2xl border border-neutral-800 text-neutral-900 bg-transparent hover:bg-neutral-800 hover:text-white transition duration-200"
          >
            Save Changes
          </button>
          <button
            v-else
            @click="editProfile"
            class="flex-1 py-3 rounded-2xl border border-neutral-800 text-neutral-900 bg-transparent hover:bg-neutral-800 hover:text-white transition duration-200"
          >
            Edit Profile
          </button>

          <button
            @click="logout"
            class="flex-1 py-3 rounded-2xl border border-neutral-800 text-neutral-900 bg-transparent hover:bg-neutral-800 hover:text-white transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useState } from "#app";

const Edit = ref(false);
const loading = ref(true);
const username = ref("");
const email = ref("");
const goalsInProgress = ref(0);
const goalsCompleted = ref(0);
const userId = useState("user").value.id;
const Tempusername = ref();
const Tempemail = ref();

onMounted(() => {
  const fetchData = async () => {
    try {
      const data = await $fetch(`/api/user?id=${userId}`);
      username.value = data.username;
      email.value = data.email;
      Tempusername.value = data.username;
      Tempemail.value = data.email;
    } catch (err) {
      console.error("Failed to fetch user data", err);
    }
    setTimeout(() => {
      loading.value = false;
    }, 200);
  };
  fetchData();
});

const editProfile = () => {
  Edit.value = !Edit.value;
};
const saveChanges = async () => {
  if (Tempusername.value != username.value) {
    await $fetch("api/user", {
      method: "PATCH",
      body: {
        newusername: Tempusername.value,
        userid: userId,
      },
    });
    username.value = Tempusername.value;
  } else if (Tempemail.value != email.value) {
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(Tempemail.value)) {
      alert("Please enter a valid email address.");
      Tempemail.value = email.value;
      return;
    }
    await $fetch("api/email", {
      method: "PATCH",
      body: {
        newemail: Tempemail.value,
        userid: userId,
      }
    });
    email.value = Tempemail.value;
  } else {
    console.log("no changes made");
  }
  Edit.value = !Edit.value;
};

const logout = async () => {
  await $fetch("/api/logout", { method: "POST" });
  useState("user").value = null;
  window.location.reload();
};

onBeforeUnmount(() => {
  Edit.value = false;
});
</script>
