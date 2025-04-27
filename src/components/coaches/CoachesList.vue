<template>
  <div class="container mx-auto px-4 rounded-lg">
    <!-- Header with buttons -->
    <div class="flex justify-between items-center mb-6 m-2" >
      
      <h2 class="text-2xl font-semibold text-gray-800 dark:text-white">Available Coaches</h2>
      <div class="flex gap-3">
        <button
          @click="refreshCoaches"
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-all duration-200"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
        <button
          @click="registerCoach"
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 transition-all duration-200"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Register Coach
        </button>
      </div>
    </div>

    <!-- Cards Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 border-2 border-gray-800 rounded-lg">
      <CoachCard v-for="(coach, index) in coaches" :key="index" :coach="coach" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CoachCard from "./CoachCard.vue";

export default defineComponent({
  components: {
    CoachCard,
  },
  props: {
    coaches: {
      type: Array,
      required: true,
    },
    
  },
  methods: {
    refreshCoaches() {
      // Emit event to parent to refresh coaches
      this.$emit('refresh-coaches');
    },
    registerCoach() {
      // Emit event to parent to show registration form
      this.$emit('register-coach');
    }
  }
});
</script>

<style scoped>
/* Add smooth transitions */
button {
  transition: all 0.2s ease-in-out;
}

button:hover {
  transform: translateY(-1px);
}

button:active {
  transform: translateY(0);
}
</style>
