import { ref } from 'vue';

export const needsRefresh = ref(false);

export function triggerRefresh() {
  needsRefresh.value = true;
  setTimeout(() => {
    needsRefresh.value = false;
  }, 0);
}
