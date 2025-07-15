<template>
  <header
    class="flex items-center justify-between bg-gradient-to-b from-white to-[#c4c4c4] shadow-lg px-6 rounded-3xl max-w-[98vw] mx-auto mt-4"
  >
    <div class="flex items-center">
      <img
        :src="Logo"
        draggable="false"
        alt="Logo"
        class="w-20 h-20 flex-shrink-0 select-none"
        style="filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.25))"
      />
      <h1
        class="text-4xl pl-4 pt-2 font-Caeser select-none font-bold text-black whitespace-nowrap"
      >
        Odyssey
      </h1>
    </div>

  <div class="overflow-visible w-full flex relative">
    <ul
      ref="nav"
      class="flex items-center  text-xl font-medium select-none ml-auto whitespace-nowrap relative"
    >
      <li
        v-for="(link, index) in links"
        :key="link.to"
        ref="items"
        @click="select(index)"
        class="cursor-pointer mr-4 last:mr-0"
      >
        <NuxtLink
          :to="link.to"
          :class="{ 'text-black': selectedIndex === index, 'text-gray-600': selectedIndex !== index }"
        >
          {{ link.label }}
        </NuxtLink>
      </li>
      <span
        class="absolute bottom-0 h-0.5 bg-black transition-all duration-300"
        :style="{ left: underlineLeft + 'px', width: underlineWidth + 'px' }"
      ></span>
    </ul>
  </div>

    <!-- <button -->
    <!--   @click="logout" -->
    <!--   class="text-sm px-4 py-1 rounded bg-red-500 text-white hover:bg-red-600" -->
    <!-- > -->
    <!--   Logout -->
    <!-- </button> -->
  </header>
</template>

<script setup>
import Logo from "~/assets/Logo.svg";
import { useState } from "#app";
import { ref, onMounted, watch, nextTick } from "vue";

const logout = async () => {
  await $fetch("/api/logout", { method: "POST" });
  const user = useState("user");
  user.value = null;
  window.location.reload();
};

const links = [
  { to: "/", label: "Home" },
  { to: "/filler1", label: "Filler" },
  { to: "/filler2", label: "Filler" },
  { to: "/Account", label: "Account" },
];

const selectedIndex = ref(0);
const nav = ref(null);
const items = ref([]);

const underlineLeft = ref(0);
const underlineWidth = ref(0);

function updateUnderline() {
  const el = items.value[selectedIndex.value];
  if (!el) return;
  underlineLeft.value = el.offsetLeft;
  underlineWidth.value = el.offsetWidth;
}

function select(index) {
  selectedIndex.value = index;
}

onMounted(() => {
  items.value = nav.value.querySelectorAll("li");
  updateUnderline();
});

watch(selectedIndex, () => {
  nextTick(() => updateUnderline());
});
</script>
