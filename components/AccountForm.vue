<template>
  <section
    v-if="loading"
    class="flex items-center justify-center h-[80vh] overflow-hidden"
  >
    <!-- From Uiverse.io by Javierrocadev -->
    <div class="flex flex-row gap-2">
      <div class="w-10 h-10 rounded-full bg-blue-50 animate-bounce" />
      <div
        class="w-10 h-10 rounded-full bg-blue-50 animate-bounce [animation-delay:-.3s]"
      />
      <div
        class="w-10 h-10 rounded-full bg-blue-50 animate-bounce [animation-delay:-.5s]"
      />
    </div>
  </section>

  <section v-else>
    <div class="flex items-center justify-center mt-10 px-6 overflow-hidden">
      <div
        class="relative min-h-[80px] w-full max-w-[35vw] min-w-[615px] bg-gradient-to-b from-neutral-200 to-neutral-500 rounded-3xl flex flex-col backdrop-blur-sm p-10 justify-between"
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
              <p
                class="text-xs uppercase tracking-wide text-neutral-600 mb-1 select-none"
              >
                Username
              </p>
              <div v-if="Edit">
                <input
                  v-model="Tempusername"
                  class="text-2xl font-bold bg-transparent border-black border-b w-full focus:outline-none focus:shadow-none"
                >
              </div>
              <div v-else>
                <p class="text-2xl font-bold select-none">{{ username }}</p>
              </div>
            </div>

            <div
              class="relative p-6 rounded-2xl border border-neutral-800 shadow-lg bg-transparent"
            >
              <p
                class="text-xs uppercase tracking-wide text-neutral-600 mb-1 select-none"
              >
                Email
              </p>
              <div v-if="Edit">
                <input
                  v-model="Tempemail"
                  class="text-2xl font-bold bg-transparent border-black border-b w-full focus:outline-none focus:shadow-none"
                  type="email"
                >
              </div>
              <div v-else>
                <p class="text-2xl font-bold select-none">{{ email }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex gap-4 pt-4">
          <button
            v-if="Edit"
            class="flex-1 py-3 rounded-2xl border border-neutral-800 text-neutral-900 bg-transparent hover:bg-neutral-800 hover:text-white transition duration-200"
            @click="saveChanges"
          >
            Save Changes
          </button>
          <button
            v-else
            class="flex-1 py-3 rounded-2xl border border-neutral-800 text-neutral-900 bg-transparent hover:bg-neutral-800 hover:text-white transition duration-200"
            @click="editProfile"
          >
            Edit Profile
          </button>

          <button
            class="flex-1 py-3 rounded-2xl border border-neutral-800 text-neutral-900 bg-transparent hover:bg-neutral-800 hover:text-white transition duration-200"
            @click="logout"
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
const userId = useState("user").value.id;
const Tempusername = ref();
const Tempemail = ref();

onMounted(() => {
  const fetchData = async () => {
    try {
      const userdata = await $fetch(`/api/user?id=${userId}`);
      username.value = userdata.username;
      email.value = userdata.email;
      Tempusername.value = userdata.username;
      Tempemail.value = userdata.email;
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
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
      },
    });
    email.value = Tempemail.value;
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
