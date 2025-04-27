<template>
  <BaseCard>
    <div class="flex justify-center">
      <div class="w-full max-w-sm">
        <div class="flex flex-col items-center p-6">
          <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {{ coach.firstName }} {{ coach.lastName }}
          </h5>
          <span class="text-sm text-gray-500 dark:text-gray-400 mb-2">
            ${{ coach.pricePerHour }}/hour
          </span>
          
          <!-- Skills Stamps -->
          <div class="flex flex-wrap gap-2 mb-4">
            <span 
              v-for="skill in coach.skills" 
              :key="skill"
              class="px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300"
            >
              {{ skill }}
            </span>
          </div>

          <!-- Buttons -->
          <div class="flex gap-3">
            <button
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Contact
            </button>
            <button
              @click="viewDetails"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Info
            </button>
          </div>
        </div>
      </div>
    </div>
  </BaseCard>
</template>

<script>
import BaseCard from '../ui/BaseCard.vue';
import { useRouter } from 'vue-router';

export default {
  name: "CoachCard",
  components: {
    BaseCard,
  },
  props: {
    coach: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    viewDetails() {
      this.router.push(`/coaches/${this.coach.id}`);
    }
  }
};
</script>

<style scoped></style>
