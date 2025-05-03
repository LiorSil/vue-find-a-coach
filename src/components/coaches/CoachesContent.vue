<template>
  <div >
    <transition  name="fade" mode="out-in">
      <Loading v-if="isLoading" />
      <div v-else-if="error" class="error">{{ error }}</div>
      <CoachesList 
        v-else-if="coaches && coaches.length > 0"
        :key="refreshKey"
        :coaches="coaches"
      />
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import CoachesList from "./CoachesList.vue";
import Loading from "../ui/Loading.vue";
import type { Coach } from "../../store/types";

export default defineComponent({
  name: "CoachesContent",
  components: {
    CoachesList,
    Loading,
  },
  props: {
    isLoading: {
      type: Boolean,
      required: true,
    },
    error: {
      type: String,
      default: null,
    },
    coaches: {
      type: Array as PropType<Coach[]>,
      required: true,
    },
    refreshKey: {
      type: Number,
      required: true,
    },
  },

});
</script>

<style scoped>
.loading {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #666;
}

.error {
  text-align: center;
  padding: 2rem;
  color: #dc2626;
  font-size: 1.2rem;
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 