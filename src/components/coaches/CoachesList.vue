<template>
  <div class="container mx-auto px-1 md:px-4 rounded-lg max-w-full lg:max-w-11/12">
    <!-- Cards Grid -->
    <transition-group
      name="list"
      tag="div"
      class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 p-0.5 md:p-2 xl:grid-cols-4 gap-1 md:gap-4 border-2 border-gray-800/10 rounded-lg"
    >
      <CoachCard
        v-for="coach in coaches"
        :key="coach.id"
        :coach="coach"
        class="coach-item"
      />
    </transition-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import CoachCard from "./CoachCard.vue";
import type { Coach } from "../../store/types";

export default defineComponent({
  name: "CoachesList",
  components: {
    CoachCard,
  },
  props: {
    coaches: {
      type: Array as PropType<Coach[]>,
      required: true,
    },
  },
});
</script>

<style scoped>
/* List transition */
.list-enter-active {
  transition: all 0.5s ease;
}

.list-leave-active {
  transition: all 0.5s ease;
  position: absolute;
  width: 100%;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.list-move {
  transition: transform 0.5s ease;
}

/* Ensure grid maintains structure during animation */
.grid {
  position: relative;
}
</style>