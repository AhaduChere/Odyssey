<template>
  <header
    class="flex items-center justify-between bg-gradient-to-b from-white to-[#c4c4c4] shadow-lg px-6 rounded-3xl max-w-[98vw] min-w-[615px] min-h-[65px] mx-auto mt-4"
  >
    <img
      :src="Logo"
      draggable="false"
      alt="Logo"
      class="w-[80px] h-[80px] flex-shrink-0 select-none"
      style="filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.25))"
    />
    <h1
      class="text-4xl ml-2 pt-2 font-Caeser select-none font-bold text-black whitespace-nowrap"
    >
      Odyssey
    </h1>

    <div class="overflow-visible w-full flex relative">
      <ul
        ref="nav"
        class="flex items-center text-xl font-medium select-none ml-auto whitespace-nowrap relative"
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
            :class="{
              'text-black': selectedIndex === index,
              'text-gray-600 hover:text-black': selectedIndex !== index,
            }"
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
  </header>
</template>

<script setup>
import Logo from "~/assets/Logo.svg";
import { ref, onMounted, watch, nextTick } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

const links = [
  { to: "/", label: "Home" },
  { to: "/", label: "Filler" },
  { to: "/", label: "Filler" },
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

  // Find index matching current route path
  const currentIndex = links.findIndex((link) => link.to === route.path);
  selectedIndex.value = currentIndex >= 0 ? currentIndex : 0;

  updateUnderline();
});
watch(selectedIndex, () => {
  nextTick(() => updateUnderline());
});
</script>
