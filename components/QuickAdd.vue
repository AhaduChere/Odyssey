<template>
 <div
    class="relative min-h-[600px] w-[450px] bg-[#e3e9f3] rounded-3xl flex flex-col backdrop-blur-sm p-6 mt-8">
    <h3 class="text-2xl font-semibold mb-4 text-center">QUICK ADD</h3>

    <!-- <div>User ID:{{ userId }}</div> -->
    <!-- <div>TODO: add quick add goals here</div> -->

  <form @submit.prevent="AddGoal">
    <h3 class="text-md font-semibold select-none mb-1">Goal</h3>
      <input 
        v-model="goal_name" 
        class="rounded-lg w-full border-2 border-neutral-800 bg-gray-50 px-3 py-2 text-sm text-gray-900 mb-2"  
        type="text" 
        placeholder="Goal Name">
     <h3 class="text-md font-semibold select-none mb-1">Description</h3>
      <input 
        v-model="goal_desc" 
        class="rounded-lg w-full border-2 border-neutral-800 bg-gray-50 px-3 py-2 text-sm text-gray-900 mb-2" 
        type="text" 
        placeholder="Goal Description">
     <h3 class="text-md font-semibold select-none mb-1">Deadline</h3>
      <input 
        v-model="deadline" 
        class="rounded-lg w-full border-2 border-neutral-800 px-3 py-2 text-sm text-gray-800" 
        type="date" 
        name="deadline" 
        required>
  </form>
 </div>
</template>

<script setup>
  const userId = useState("user").value.id;
</script>
