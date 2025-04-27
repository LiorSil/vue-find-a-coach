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

    <div v-if="isLoading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <template v-else-if="selectedCoach">
      <!-- First Card: Name and Price -->
      <BaseCard>
        <div class="flex flex-col items-center p-6">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {{ selectedCoach.firstName }} {{ selectedCoach.lastName }}
          </h2>
          <span class="text-lg text-gray-500 dark:text-gray-400">
            ${{ selectedCoach.pricePerHour }}/hour
          </span>
        </div>
      </BaseCard>

      <!-- Second Card: Description and Skills -->
      <BaseCard>
        <div class="p-6">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">About Me</h3>
          
          <p class="text-gray-600 dark:text-gray-300 mb-6">
            {{ selectedCoach.description || 'No description available.' }}
          </p>

          <!-- Skills Section -->
          <div class="mb-6">
            <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-3">Skills</h4>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="skill in selectedCoach.skills" 
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
    </template>
    <div v-else class="error">Coach not found</div>
  </div>
</template>

<script>
import BaseCard from '../ui/BaseCard.vue';
import { mapState, mapActions, mapGetters } from 'vuex';

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
  computed: {
    ...mapState('Coach', ['isLoading', 'error']),
    ...mapGetters('Coach', ['selectedCoach'])
  },
  methods: {
    ...mapActions('Coach', ['fetchCoachById']),
    goBack() {
      this.$router.push('/coaches');
    }
  },
  created() {
    this.fetchCoachById(this.id);
  }
}
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
</style>