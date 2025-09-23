<template>
  <section v-if="loading" class="flex items-center justify-center h-screen">
    <LoaderWidget />
  </section>

  <section v-else class="min-h-screen text-white flex flex-col items-center pt-28">
    <div class="px-6 flex flex-row gap-8 w-full max-w-[1600px]">
      <div class="flex-1 flex flex-col gap-4">
        <h3 class="text-3xl text-indigo-400 font-semibold text-center select-none">Upcoming Deadlines</h3>
        <div class="w-full h-1 bg-gradient-to-r from-[#2963A5] to-indigo-400 mx-auto rounded"></div>
        <transition-group name="slide-left" tag="ul" class="space-y-4">
          <li
            v-for="goal in upcomingGoals.slice(0, 5)"
            :key="goal.goalid"
            class="flex justify-between items-center p-4 rounded-xl bg-[#0f172a] border-2 hover:scale-[1.01] border-black duration-300">
            <div>
              <p class="font-semibold text-lg text-[#ffffff]">{{ goal.name }}</p>
              <p class="text-sm text-indigo-400 mt-1">
                Deadline: <span class="font-extrabold">{{ goal.deadline }}</span>
              </p>
            </div>
            <button
              class="px-4 py-2 rounded-lg text-sm font-medium bg-[#2963A5]/20 text-[#ffffff] filter hover:bg-[#2963A5]/25 transition-transform duration-200"
              @click="Completegoal(goal, 'upcoming')">
              <img :src="DoneButton" alt="Complete" class="w-8 h-8" />
            </button>
          </li>
        </transition-group>
      </div>

      <div class="flex-1 flex flex-col gap-4">
        <h3 class="text-3xl text-indigo-400 font-semibold text-center select-none">Past Due Deadlines</h3>
        <div class="w-full h-1 bg-gradient-to-l from-[#2963A5] to-indigo-400 mx-auto rounded"></div>
        <transition-group name="slide-right" tag="ul" class="space-y-4">
          <li
            v-for="goal in pastDueGoals.slice(0, 5)"
            :key="goal.goalid"
            class="flex justify-between items-center p-4 rounded-xl bg-[#0f172a] border-2 hover:scale-[1.01] border-black duration-300">
            <div>
              <p class="font-semibold text-lg text-[#ffffff]">{{ goal.name }}</p>
              <p class="text-sm text-indigo-400 mt-1">
                Deadline: <span class="font-extrabold">{{ goal.deadline }}</span>
              </p>
            </div>
            <button
              class="px-4 py-2 rounded-lg text-sm font-medium bg-indigo-500/20 text-[#ffffff] filter hover:bg-indigo-500/25 transition-transform duration-200"
              @click="Completegoal(goal, 'past')">
              <img :src="DoneButton" alt="Complete" class="w-8 h-8" />
            </button>
          </li>
        </transition-group>
      </div>
    </div>
  </section>
</template>

<script setup>
import DoneButton from '~/assets/Done.svg';
const userId = useState('user').value.id;
const loading = ref(true);
const upcomingGoals = ref([]);
const pastDueGoals = ref([]);

const formatDate = (datetime) => {
  const [datePart] = datetime.split(' ');
  const [year, month, day] = datePart.split('-');
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return `${monthNames[parseInt(month) - 1]} ${parseInt(day)}, ${year}`;
};

const fetchData = async () => {
  try {
    const goalsdata = await $fetch(`/api/goals?id=${userId}&method=dashboard`);
    upcomingGoals.value = goalsdata.upcoming.map((g) => ({
      goalid: g.goal_id,
      name: g.goal_name,
      deadline: formatDate(g.deadline),
    }));
    pastDueGoals.value = goalsdata.pastdue.map((g) => ({
      goalid: g.goal_id,
      name: g.goal_name,
      deadline: formatDate(g.deadline),
    }));
  } catch {
    alert('Failed to fetch user data');
  }
  setTimeout(() => (loading.value = false), 200);
};

onMounted(fetchData);

const Completegoal = async (goal, section) => {
  const backup = { ...goal };
  if (section === 'upcoming') {
    upcomingGoals.value = upcomingGoals.value.filter((g) => g.goalid !== goal.goalid);
  } else {
    pastDueGoals.value = pastDueGoals.value.filter((g) => g.goalid !== goal.goalid);
  }
  try {
    await $fetch('/api/goals', {
      method: 'POST',
      body: {
        action: 'complete',
        goalID: goal.goalid,
      },
    });
    await fetchData();
  } catch {
    if (section === 'upcoming') upcomingGoals.value.unshift(backup);
    else pastDueGoals.value.unshift(backup);
    alert('Could not mark goal as complete. Try again.');
  }
};
</script>

<style scoped>
.slide-left-leave-active,
.slide-right-leave-active {
  transition:
    transform 300ms ease,
    opacity 300ms ease;
}
.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
.slide-left-enter-from,
.slide-right-enter-from {
  opacity: 0;
  transform: translateX(0);
}
.slide-left-enter-to,
.slide-right-enter-to {
  opacity: 1;
  transform: translateX(0);
}
</style>
