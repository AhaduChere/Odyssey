import { defineNuxtRouteMiddleware, navigateTo, useState, useCookie } from 'nuxt/app';

export default defineNuxtRouteMiddleware(async (to) => {
  const userState = useState('user');

  if (!userState.value) {
    const token = useCookie('session_token').value;
    if (token) {
      try {
        const res = await $fetch('/api/auth', {
          method: 'POST',
          body: { token },
        });
        if (res?.userId) userState.value = { id: res.userId };
      } catch (e) {
        userState.value = null;
      }
    }
  }

  const isAuthPage = to.path === '/Auth';
  if (!userState.value && !isAuthPage) return navigateTo('/Auth');
  if (userState.value && isAuthPage) return navigateTo('/');
});
