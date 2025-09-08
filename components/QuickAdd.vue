<template>
  <div class="relative h-[600px] w-[450px] bg-[#1c2541] rounded-3xl flex flex-col p-6 mt-8 border-2 border-black shadow-lg">
    <h3 class="text-2xl font-semibold mb-6 text-center text-white select-none">QUICK ADD</h3>

    <form class="space-y-4 max-h-48" @submit.prevent="AddGoal">
      <div class="h-48 rounded-lg flex items-center justify-center text-neutral-50 select-none mb-11">
        <Button @click="$event.target.closest('form').requestSubmit()" />
      </div>

      <div class="grid gap-3">
        <input v-model="deadline" type="date" placeholder="deadline" required
          class="rounded-xl bg-[#0f172a] border-2 border-black p-3 text-[#a0a0ff] placeholder:text-[#a0a0ff]/80 focus:outline-none focus:ring-2 focus:ring-[#2963A5]" />
        <input v-model="goal_name" type="text" placeholder="Goal Name" required
          class="rounded-xl bg-[#0f172a] border-2 border-black p-3 text-[#a0a0ff] placeholder:text-[#a0a0ff]/80 focus:outline-none focus:ring-2 focus:ring-[#2963A5]" />
        <input v-model="goal_desc" type="text" placeholder="Goal Description" required
          class="h-28 rounded-xl bg-[#0f172a] border-2 border-black p-3 text-[#a0a0ff] text-top placeholder:text-[#a0a0ff]/80 focus:outline-none focus:ring-2 focus:ring-[#2963A5]" />
      </div>
    </form>
  </div>
</template>

<script setup>
import Button from './QAButton.vue';
import { triggerRefresh } from '~/composables/refresh.js';
const userId = useState('user').value.id;
const goal_name = ref('');
const goal_desc = ref('');
const deadline = ref('');

const AddGoal = async () => {
  try {
    await $fetch('/api/goals', {
      method: 'POST',
      body: { action: 'add', userID: userId, goalname: goal_name.value, goaldesc: goal_desc.value, deadline: deadline.value },
    });
    triggerRefresh();
    goal_name.value = '';
    goal_desc.value = '';
    deadline.value = '';
  } catch (error) {
    console.error('Failed to add Goal:', error);
  }
};
</script>
