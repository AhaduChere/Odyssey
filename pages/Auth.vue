<template>
  <div class="auth-container">
    <transition name="fade-scale" mode="out-in">
      <component
        :is="
          {
            login: LoginForm,
            signup: SignupForm,
          }[activeForm]
        "
        :key="activeForm"
        :on-toggle="setForm"
        class="auth-form-card" />
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import LoginForm from '../components/LoginForm.vue';
import SignupForm from '../components/SignupForm.vue';

const activeForm = ref('login');

const setForm = (formName) => {
  if (formName !== activeForm.value) {
    activeForm.value = formName;
  }
};
</script>

<style scoped>
.auth-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-form-card {
  width: 100%;
  min-height: 420px;
  padding: 2rem;
  box-sizing: border-box;
}

.fade-scale-enter-active,
.fade-scale-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease,
    filter 0.2s ease;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
  filter: blur(3px);
}

.fade-scale-enter-to,
.fade-scale-leave-from {
  opacity: 1;
  transform: scale(1);
  filter: blur(0);
}
</style>
