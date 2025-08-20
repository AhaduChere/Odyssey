<template>
 <div
    class="relative min-h-[600px] w-[450px] bg-[#e3e9f3] rounded-3xl flex flex-col backdrop-blur-sm p-6 mt-8">
    <h3 class="text-2xl font-semibold mb-4 text-center">QUICK ADD</h3>

  <form @submit.prevent="AddGoal">
    <h3 class="text-md font-semibold select-none mb-1">Goal</h3>
      <input 
        v-model="goal_name" 
        class="rounded-lg w-full border-2 border-neutral-800 bg-gray-50 px-3 py-2 text-sm text-gray-900 mb-2"  
        type="text" 
        required
        placeholder="Goal Name">
     <h3 class="text-md font-semibold select-none mb-1">Description</h3>
      <input 
        v-model="goal_desc" 
        class="rounded-lg w-full border-2 border-neutral-800 bg-gray-50 px-3 py-2 text-sm text-gray-900 mb-2" 
        type="text" 
        required
        placeholder="Goal Description">
     <h3 class="text-md font-semibold select-none mb-1">Deadline</h3>
      <input 
        v-model="deadline" 
        class="rounded-lg w-full border-2 border-neutral-800 px-3 py-2 text-sm text-gray-800" 
        type="date" 
        name="deadline" 
        required>
      <button
       type="submit"
       class="inline-flex w-10/12 items-center justify-center rounded-full bg-black py-2 font-semibold leading-7 text-white ml-8 mt-5">
       Submit 
      </button>
  </form>
 </div>
</template>

<script setup>
const userId = useState("user").value.id;
const goal_name = ref("")
const goal_desc = ref("")
const deadline = ref("")

const AddGoal = async () => {
  try {
    await $fetch("/api/goals", {
      method: "POST",
  body: { userID: userId, goalname: goal_name.value, goaldesc: goal_desc.value, deadline: deadline.value },
    });
  } catch (error) {
    console.error("Failed to add Goal:", error);
  }
}

</script>
