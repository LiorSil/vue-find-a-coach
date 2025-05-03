<template>
  <div v-if="isOpen" class="fixed inset-0 bg-gray-700/30 backdrop-blur-3xl flex items-center justify-center z-50">
    <div class="bg-gray-900/90 backdrop-blur-sm rounded-lg p-6 w-full max-w-md border-2 border-gray-800 shadow-xl">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-semibold text-white">Register as a Coach</h3>
        <button @click="closeModal" class="text-gray-400 hover:text-white">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form @submit.prevent="submitForm" class="space-y-4">
        <div>
          <label for="firstName" class="block text-sm font-medium text-gray-300 mb-1">First Name</label>
          <input
            type="text"
            id="firstName"
            v-model="formData.firstName"
            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label for="lastName" class="block text-sm font-medium text-gray-300 mb-1">Last Name</label>
          <input
            type="text"
            id="lastName"
            v-model="formData.lastName"
            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label for="description" class="block text-sm font-medium text-gray-300 mb-1">Description</label>
          <textarea
            id="description"
            v-model="formData.description"
            rows="4"
            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>

        <div>
          <label for="hourlyRate" class="block text-sm font-medium text-gray-300 mb-1">Hourly Rate ($)</label>
          <input
            type="number"
            id="hourlyRate"
            v-model.number="formData.hourlyRate"
            min="0"
            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1">Areas of Expertise</label>
          <div class="space-y-2">
            <label v-for="skill in availableSkills" :key="skill" class="flex items-center space-x-2">
              <input
                type="checkbox"
                :value="skill"
                v-model="formData.skills"
                class="rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500"
              />
              <span class="text-gray-300">{{ skill }}</span>
            </label>
          </div>
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
            {{ isSubmitting ? 'Registering...' : 'Register as Coach' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'CreateCoach',
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const store = useStore();
    const formData = ref({
      firstName: '',
      lastName: '',
      description: '',
      hourlyRate: 0,
      skills: [] as string[]
    });
    const isSubmitting = ref(false);

    const availableSkills = [
      'Frontend',
      'Backend',
      'Full stack',
      'DevOps',
      'Mobile',
      'UI/UX',
      'Database',
      'Cloud'
    ];

    const closeModal = () => {
      emit('close');
    };

    const submitForm = async () => {
      isSubmitting.value = true;
      try {
        await store.dispatch('coaches/registerCoach', {
          ...formData.value,
          fullName: `${formData.value.firstName} ${formData.value.lastName}`
        });
        formData.value = {
          firstName: '',
          lastName: '',
          description: '',
          hourlyRate: 0,
          skills: []
        };
        closeModal();
      } catch (error) {
        console.error('Error registering coach:', error);
      } finally {
        isSubmitting.value = false;
      }
    };

    return {
      formData,
      isSubmitting,
      closeModal,
      submitForm,
      availableSkills
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