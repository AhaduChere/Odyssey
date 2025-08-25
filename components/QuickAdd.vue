<template>
  <div class="relative h-[550px] w-[450px] bg-[#e3e9f3] rounded-3xl flex flex-col p-6 mt-8">
    <h3 class="text-2xl font-semibold mb-4 text-center">QUICK ADD</h3>

    <form @submit.prevent="AddGoal">
       <div
        class="rounded-lg flex items-center justify-center text-neutral-500 select-none
        mb-5 mt-4">
          <Button @click="$event.target.closest('form').requestSubmit()"/>
       </div>
      <h3 class="text-md font-semibold select-none mb-1">Goal</h3>
      <input
        v-model="goal_name"
        class="rounded-lg w-full border-2 border-neutral-800 px-3 py-2 text-sm text-gray-900 mb-2"
        type="text" required placeholder="Goal Name">
      <h3 class="text-md font-semibold select-none mb-1">Description</h3>
      <input
        v-model="goal_desc"
        class="rounded-lg w-full border-2 border-neutral-800 px-3 py-2 text-sm text-gray-900 mb-2"
        type="text" required placeholder="Goal Description">
      <h3 class="text-md font-semibold select-none mb-1">Deadline</h3>
      <input
        v-model="deadline" class="rounded-lg w-full border-2 border-neutral-800 px-3 py-2 text-sm text-gray-800"
        type="date" name="deadline" required>
      <!--       <button -->
      <!--   type="submit" -->
      <!--   class="inline-flex w-10/12 items-center justify-center rounded-full bg-black py-2 font-semibold leading-7 text-white ml-8 mt-5"> -->
      <!--   Submit -->
      <!-- </button> -->

    </form>
  </div>
</template>

<script setup>
import Button from "./QAButton.vue"
import { triggerRefresh } from "~/composables/refresh.js";
const userId = useState("user").value.id;
const goal_name = ref("")
const goal_desc = ref("")
const deadline = ref("")

const AddGoal = async () => {
  try {
    await $fetch("/api/goals", {
      method: "POST",
      body: { action: "add", userID: userId, goalname: goal_name.value, goaldesc: goal_desc.value, deadline: deadline.value },
    });
    triggerRefresh();
    goal_name.value = "";
    goal_desc.value = "";
    deadline.value = "";
  } catch (error) {
    console.error("Failed to add Goal:", error);
  }
}
</script>
