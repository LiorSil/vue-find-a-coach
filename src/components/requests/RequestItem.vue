<template>
  <BaseCard :roundedClass="'rounded-3xl'">
    <div class="flex flex-col space-y-4 w-">
      <!-- Coach Name -->
      <div class="flex items-center space-x-2">
        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <h3 class="text-lg font-semibold text-white">
          {{ firstname }} {{ lastname }}
        </h3>
      </div>

      <!-- Email -->
      <div class="flex items-center space-x-2">
        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <span class="text-gray-300">{{ email }}</span>
      </div>

      <!-- Request Date -->
      <div class="flex items-center space-x-2">
        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span class="text-gray-300">{{ formattedDate }}</span>
      </div>

      <!-- Requested By -->
      <div class="flex items-center space-x-2">
        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span class="text-gray-300">Requested by: {{ requestedBy }}</span>
      </div>

      <!-- Message -->
      <div class="mt-4 p-4 bg-gray-400/50 rounded-lg">
        <p class="text-gray-300 whitespace-pre-wrap">{{ message }}</p>
      </div>
    </div>
  </BaseCard>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseCard from '../ui/BaseCard.vue';

export default defineComponent({
  name: 'RequestItem',
  components: {
    BaseCard
  },
  props: {
    id: {
      type: Number,
      required: true
    },
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    formattedDate: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
 
    requestedBy: {
      type: String,
      required: true
    }
  }
});
</script>

<style scoped>
.whitespace-pre-wrap {
  white-space: pre-wrap;
}
</style>