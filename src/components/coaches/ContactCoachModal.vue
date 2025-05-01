<template>
  <div v-if="isOpen" class="fixed inset-0 bg-gray-700/30 backdrop-blur-3xl flex items-center justify-center z-50">
    <div class="bg-gray-900/90 backdrop-blur-sm rounded-lg p-6 w-full max-w-md border-2 border-gray-800 shadow-xl">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-semibold text-white">Contact Coach</h3>
        <button @click="closeModal" class="text-gray-400 hover:text-white">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form @submit.prevent="submitForm" class="space-y-4">
        <div>
          <label for="fullName" class="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
          <input
            type="text"
            id="fullName"
            v-model="formData.fullName"
            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-300 mb-1">Email</label>
          <input
            type="email"
            id="email"
            v-model="formData.email"
            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label for="message" class="block text-sm font-medium text-gray-300 mb-1">Message</label>
          <textarea
            id="message"
            v-model="formData.message"
            rows="4"
            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>

        <div class="flex justify-end space-x-3">
          <button
            type="button"
            @click="closeModal"
            class="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? 'Sending...' : 'Send Message' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ContactCoachModal',
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    coachId: {
      type: String,
      required: true
    }
  },
  emits: ['close', 'submit'],
  setup(props, { emit }) {
    const formData = ref({
      fullName: '',
      email: '',
      message: ''
    });
    const isSubmitting = ref(false);

    const closeModal = () => {
      emit('close');
    };

    const submitForm = async () => {
      isSubmitting.value = true;
      try {
        // Here you would typically make an API call to send the message
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
        emit('submit', { ...formData.value, coachId: props.coachId });
        formData.value = { fullName: '', email: '', message: '' };
        closeModal();
      } catch (error) {
        console.error('Error sending message:', error);
      } finally {
        isSubmitting.value = false;
      }
    };

    return {
      formData,
      isSubmitting,
      closeModal,
      submitForm
    };
  }
});
</script>

<style scoped>
.fixed {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
</style> 