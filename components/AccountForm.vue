<template>
  <section v-if="loading" class="flex items-center justify-center h-[80vh] overflow-hidden">
    <!-- Loading Animation From Uiverse.io by Javierrocadev -->
    <div class="flex flex-row gap-2">
      <div class="w-10 h-10 rounded-full bg-blue-50 animate-bounce"/>
      <div class="w-10 h-10 rounded-full bg-blue-50 animate-bounce [animation-delay:-.3s]"/>
      <div class="w-10 h-10 rounded-full bg-blue-50 animate-bounce [animation-delay:-.5s]"/>
    </div>
  </section>

  <section v-else class="min-w-[1800px] pt-32">
    <div class="flex items-center justify-center px-6 overflow-hidden">
      <div
        class="relative w-full max-w-[700px] min-w-[320px] min-h-[600px] bg-[#C4C4C4] rounded-3xl flex flex-col backdrop-blur-sm p-10 justify-between shadow-xl border border-white/10">
        <div class="space-y-8">
          <h2
            class="text-5xl font-Caeser font-extrabold text-center text-neutral-800 tracking-tight select-none">
            My Account
          </h2>

          <div class="grid grid-cols-1 gap-6 max-w-4xl mx-auto text-neutral-900">
            <!-- Username & Email Fields -->
            <section
              v-for="field in fields"
              :key="field.key"
              class="relative p-6 rounded-2xl border border-neutral-800 shadow-lg bg-transparent">
              <p class="text-xs uppercase tracking-wide text-neutral-600 mb-1 select-none">
                {{ field.label }}
              </p>
              <div v-if="Edit">
                <input
                  v-model="field.temp.value"
                  :type="field.type"
                  class="text-2xl font-bold bg-transparent border-black border-b w-full focus:outline-none focus:shadow-none">
              </div>
              <div v-else>
                <p class="text-2xl font-bold select-none">
                  {{ field.model.value }}
                </p>
              </div>
            </section>
          </div>

          <section
            class="relative p-6 rounded-2xl border border-neutral-800 shadow-lg bg-transparent max-w-4xl mx-auto">
            <p class="text-xs uppercase tracking-wide text-neutral-600 mb-1 select-none">
              Account Created
            </p>
            <p class="text-2xl font-bold select-none">
              {{ created_at }}
            </p>
          </section>
        </div>

        <div class="flex gap-4 -mb-2">
          <button
            v-if="Edit"
            class="flex-1 py-3 rounded-2xl border border-neutral-800 text-neutral-900 bg-transparent hover:bg-neutral-800 hover:text-white transition duration-200"
            @click="saveChanges">
            Save Changes
          </button>
          <button
            v-else
            class="flex-1 py-3 rounded-2xl border border-neutral-800 text-neutral-900 bg-transparent hover:bg-neutral-800 hover:text-white transition duration-200"
            @click="editProfile">
            Edit Profile
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
  const created_at = ref("");
  const userId = useState("user").value.id;
  const Tempusername = ref("");
  const Tempemail = ref("");

  const fields = [
    {
      key: "username",
      label: "Username",
      model: username,
      temp: Tempusername,
      type: "text",
    },
    {
      key: "email",
      label: "Email",
      model: email,
      temp: Tempemail,
      type: "email",
    },
  ];

  onMounted(() => {
    const fetchData = async () => {
      try {
        const userdata = await $fetch(`/api/user?id=${userId}`);
        username.value = userdata.username;
        email.value = userdata.email;
        created_at.value = formatDate(userdata.created_at);
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

  const formatDate = (datetime) => {
    const [datePart] = datetime.split(" ");
    const [year, month, day] = datePart.split("-");
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${monthNames[parseInt(month) - 1]} ${parseInt(day)}, ${year}`;
  };

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


  onBeforeUnmount(() => {
    Edit.value = false;
  });
</script>
