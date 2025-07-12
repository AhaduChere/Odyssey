<script setup>
import { ref } from "vue";
import LoginForm from "../components/LoginForm.vue";
import SignupForm from "../components/SignupForm.vue";

const isLogin = ref(true);
const toggle = () => (isLogin.value = !isLogin.value);
</script>

<template>
  <div class="flip‑cube" :class="{ flipped: !isLogin }">
    <div class="face front">
      <LoginForm :onToggle="toggle" />
    </div>
    <div class="face back">
      <SignupForm :onToggle="toggle" />
    </div>
  </div>
</template>

<style>
.flip‑cube {
  position: relative;
  width: 100%;
  max-width: 400px;
  min-width: 280px;
  height: 800px;
  perspective: 1200px;
  transition: transform 0.6s ease-in-out;
  transform-style: preserve-3d;
  margin: 0 auto;
}

.flip‑cube.flipped {
  transform: rotateY(180deg);
}

.face {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  display: flex;
  justify-content: center;
  align-items: center;
}

.face.front {
  transform: rotateY(0deg);
}

.face.back {
  transform: rotateY(180deg);
}
</style>
