<template>
  <div
    class="relative min-h-[600px] min-w-[400px] bg-[#e3e9f3] rounded-3xl flex flex-col backdrop-blur-sm p-6 mt-8">
    <h3 class="text-2xl font-semibold mb-4 text-center">QUICK ADD</h3>

    <div>User ID:{{ userId }}</div>
    <div>TODO: add quick add goals here</div>
  </div>
</template>

<script setup>
  const userId = useState("user").value.id;
</script>
