<script setup>
import { ref } from "vue";
import LoginForm from "../components/LoginForm.vue";
import SignupForm from "../components/SignupForm.vue";
import ForgotPasswordForm from "../components/ForgotPasswordForm.vue";

const activeForm = ref("login");

const setForm = (formName) => {
  if (formName !== activeForm.value) {
    activeForm.value = formName;
  }
};
</script>

<template>
  <div
    class="flip-cube"
    :class="{
      flippedSignup: activeForm === 'signup',
      flippedForgot: activeForm === 'forgot'
    }"
  >
    <div class="face front">
      <LoginForm :onToggle="setForm" />
    </div>

    <div class="face back">
      <SignupForm :onToggle="setForm" />
    </div>

    <div class="face left">
      <ForgotPasswordForm :onToggle="setForm" />
    </div>
  </div>
</template>

<style scoped>
.flip-cube {
  position: relative;
  width: 100%;
  max-width: 400px;
  min-width: 280px;
  height: 800px;
  perspective: 1200px;
  transform-style: preserve-3d;
  transition: transform 0.6s ease-in-out;
  margin: 0 auto;
}

/* flips */
.flip-cube.flippedSignup {
  transform: rotateY(180deg);
}
.flip-cube.flippedForgot {
  transform: rotateY(-180deg);
}

.face {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0; left: 0;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* the three faces */
.face.front { transform: rotateY(0deg); z-index: 2; }
.face.back  { transform: rotateY(180deg); }
.face.left  { transform: rotateY(-180deg); }

/* DEFAULT: hide back & left until explicitly flipped-to */
.face.back,
.face.left {
  opacity: 0;
  pointer-events: none;
}

/* When you flip to signup, show the back immediately */
.flip-cube.flippedSignup .face.back {
  opacity: 1;
  pointer-events: auto;
  transition: opacity 0.3s ease;
}
/* And hide it *after* you flip back home (= no flippedSignup) */
.flip-cube:not(.flippedSignup) .face.back {
  transition: opacity 0.3s ease 0.6s;
  opacity: 0;
  pointer-events: none;
}

/* Same for forgot-password face */
.flip-cube.flippedForgot .face.left {
  opacity: 1;
  pointer-events: auto;
  transition: opacity 0.3s ease;
}
.flip-cube:not(.flippedForgot) .face.left {
  transition: opacity 0.3s ease 0.6s;
  opacity: 0;
  pointer-events: none;
}
</style>
