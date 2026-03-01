<template>
  <section v-if="loading" class="flex items-center justify-center h-screen">
    <LoaderWidget />
  </section>

  <section v-else class="min-h-screen text-white pt-28">
    <div class="px-6 flex flex-col space-y-4 max-w-4xl mx-auto min-w-[700px]">
      <h1 class="text-4xl font-bold text-center text-indigo-400 tracking-wide select-none -mb-1">My Account</h1>
      <div class="w-full h-1 bg-gradient-to-r from-[#2963A5] to-indigo-400 mx-auto rounded"></div>
      <section class="grid grid-cols-3 gap-4">
        <div class="p-6 bg-[#0f172a] rounded-xl border border-neutral-800 flex flex-col items-center">
          <h3 class="text-sm font-extrabold text-indigo-400 mb-1">Complete Goals</h3>
          <p class="text-3xl font-bold">{{ completedGoals }}</p>
        </div>
        <div class="p-6 bg-[#0f172a] rounded-xl border border-neutral-800 flex flex-col items-center">
          <h3 class="text-sm font-extrabold text-indigo-400 mb-1">Incomplete Goals</h3>
          <p class="text-3xl font-bold">{{ incompleteGoals }}</p>
        </div>
        <div class="p-6 bg-[#0f172a] rounded-xl border border-neutral-800 flex flex-col items-center">
          <h3 class="text-sm font-extrabold text-indigo-400 mb-1">Total Goals</h3>
          <p class="text-3xl font-bold">{{ totalGoals }}</p>
        </div>
      </section>

      <div class="grid grid-cols-1 gap-6">
        <section v-for="field in fields" :key="field.key" class="p-6 bg-[#0f172a] rounded-2xl border border-neutral-800">
          <p class="text-xs font-extrabold uppercase tracking-wide text-indigo-400 mb-1 select-none">
            {{ field.label }}
          </p>
          <div v-if="Edit">
            <input
              v-model="field.temp.value"
              :type="field.type"
              class="text-2xl text-white font-bold bg-transparent border-white border-b w-full focus:outline-none pb-1" />
          </div>
          <div v-else>
            <p class="text-2xl font-bold select-none pb-1">{{ field.model.value }}</p>
          </div>
        </section>
      </div>

      <section class="p-6 bg-[#0f172a] rounded-2xl border border-neutral-800">
        <p class="text-xs font-extrabold uppercase tracking-wide text-indigo-400 mb-1 select-none">Account Created</p>
        <p class="text-2xl font-bold select-none">{{ created_at }}</p>
      </section>

      <div class="flex gap-4">
        <button
          v-if="Edit"
          class="flex-1 py-5 rounded-2xl border border-neutral-800 bg-[#0f172a] text-white hover:bg-[#0f172a]/80 transition-all"
          @click="saveChanges">
          Save Changes
        </button>
        <button
          v-else
          class="flex-1 py-5 rounded-2xl border border-neutral-800 bg-[#0f172a] text-white hover:bg-[#0f172a]/80 transition-all"
          @click="editProfile">
          Edit Profile
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useState } from '#app';
const incompleteGoals = ref(0);
const completedGoals = ref(0);
const totalGoals = ref(0);
const Edit = ref(false);
const loading = ref(true);
const username = ref('');
const email = ref('');
const created_at = ref('');
const userId = useState('user').value.id;
const Tempusername = ref('');
const Tempemail = ref('');

const fields = [
  {
    key: 'username',
    label: 'Username',
    model: username,
    temp: Tempusername,
    type: 'text',
  },
  {
    key: 'email',
    label: 'Email',
    model: email,
    temp: Tempemail,
    type: 'email',
  },
];

onMounted(() => {
  const fetchData = async () => {
    try {
      const userdata = await $fetch(`/api/user?id=${userId}`);
      const goalsdata = await $fetch(`/api/goals?id=${userId}&method=account`);
      incompleteGoals.value = goalsdata.incomplete;
      completedGoals.value = goalsdata.completed;
      totalGoals.value = incompleteGoals.value + completedGoals.value;
      username.value = userdata.username;
      email.value = userdata.email;
      created_at.value = formatDate(userdata.created_at);
      Tempusername.value = userdata.username;
      Tempemail.value = userdata.email;
    } catch {
      alert('Failed to fetch user data');
    }
    setTimeout(() => (loading.value = false), 200);
  };
  fetchData();
});

const formatDate = (datetime) => {
  const [datePart] = datetime.split(' ');
  const [year, month, day] = datePart.split('-');
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return `${monthNames[parseInt(month) - 1]} ${parseInt(day)}, ${year}`;
};

const editProfile = () => {
  Edit.value = !Edit.value;
};
const saveChanges = async () => {
  if (Tempusername.value != username.value) {
    if (!Tempusername.value) {
      alert('Username cannot be blank.');
      Tempusername.value = username.value;
      return;
    }
    loading.value = true;
    await $fetch('api/user', {
      method: 'PATCH',
      body: {
        newusername: Tempusername.value,
        userid: userId,
      },
    });
    username.value = Tempusername.value;
  } else if (Tempemail.value != email.value) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(Tempemail.value)) {
      alert('Please enter a valid email address.');
      Tempemail.value = email.value;
      return;
    }
    loading.value = true;
    await $fetch('api/email', {
      method: 'PATCH',
      body: {
        newemail: Tempemail.value,
        userid: userId,
      },
    });
    email.value = Tempemail.value;
  }
  Edit.value = !Edit.value;
  loading.value = false;
};

onBeforeUnmount(() => {
  Edit.value = false;
});
</script>
