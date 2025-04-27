<template>
  <div class="space-y-4">
    <!-- Back Button -->
    <div class="mb-4">
      <button
        @click="goBack"
        class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Coaches
      </button>
    </div>

    <!-- First Card: Name and Price -->
    <BaseCard>
      <div class="flex flex-col items-center p-6">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {{ coach.firstName }} {{ coach.lastName }}
        </h2>
        <span class="text-lg text-gray-500 dark:text-gray-400">
          ${{ coach.pricePerHour }}/hour
        </span>
      </div>
    </BaseCard>

    <!-- Second Card: Description and Skills -->
    <BaseCard>
      <div class="p-6">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">About Me</h3>
        
        <p class="text-gray-600 dark:text-gray-300 mb-6">
          {{ coach.description || 'No description available.' }}
        </p>

        <!-- Skills Section -->
        <div class="mb-6">
          <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-3">Skills</h4>
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="skill in coach.skills" 
              :key="skill"
              class="px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300"
            >
              {{ skill }}
            </span>
          </div>
        </div>

        <!-- Contact Button -->
        <div class="flex justify-center">
          <button
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Contact Coach
          </button>
        </div>
      </div>
    </BaseCard>
  </div>
</template>

<script>
import BaseCard from '../ui/BaseCard.vue';

export default {
  name: 'CoachDetail',
  components: {
    BaseCard
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      coach: null
    };
  },
  methods: {
    goBack() {
      this.$router.push('/coaches');
    },
    async fetchCoachDetails() {
      // Here you would typically fetch the coach details from your API
      // For now, we'll use a mock implementation
      this.coach = {
        id: this.id,
        firstName: 'John',
        lastName: 'Doe',
        pricePerHour: 50,
        description: 'Experienced coach with a passion for teaching.',
        skills: ['Vue.js', 'JavaScript', 'TypeScript']
      };
    }
  },
  created() {
    this.fetchCoachDetails();
  }
}
</script>

<style scoped>

</style>