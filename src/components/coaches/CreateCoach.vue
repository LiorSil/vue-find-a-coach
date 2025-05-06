<template>
  <div v-if="isOpen" class="fixed inset-0 bg-gray-700/30 backdrop-blur-3xl flex items-center justify-center z-50 p-4 overflow-hidden" @click.self="closeModal">
    <div class="bg-gray-900/90 backdrop-blur-sm rounded-lg p-4 md:p-6 w-full max-w-[90%] md:max-w-md border-2 border-gray-800 shadow-xl mx-auto">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg md:text-xl font-semibold text-white">Register as a Coach</h3>
        <button @click="closeModal" class="text-gray-400 hover:text-white" :disabled="isSubmitting">
          <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form @submit.prevent="submitForm" class="space-y-3 md:space-y-4">
        <Loading v-if="isSubmitting" />
        <div v-else>
          <div>
            <label for="firstname" class="block text-sm font-medium text-gray-300 mb-1">First Name</label>
            <input
              type="text"
              id="firstname"
              v-model="formData.firstname"
              class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              :disabled="isSubmitting"
            />
          </div>

          <div>
            <label for="lastname" class="block text-sm font-medium text-gray-300 mb-1">Last Name</label>
            <input
              type="text"
              id="lastname"
              v-model="formData.lastname"
              class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              :disabled="isSubmitting"
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
              :disabled="isSubmitting"
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
              :disabled="isSubmitting"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">Areas of Expertise</label>
            <div class="space-y-1 md:space-y-2">
              <label v-for="skill in availableSkills" :key="skill" class="flex items-center space-x-2">
                <input
                  type="checkbox"
                  :value="skill"
                  v-model="formData.skills"
                  class="rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500"
                  :disabled="isSubmitting"
                />
                <span class="text-gray-300">{{ skill }}</span>
              </label>
            </div>
          </div>

          <div class="flex justify-end space-x-3">
            <button
              type="button"
              @click="closeModal"
              class="px-3 py-1.5 md:px-4 md:py-2 text-sm font-medium text-gray-300 hover:text-white bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
              :disabled="isSubmitting"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-3 py-1.5 md:px-4 md:py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              :disabled="isSubmitting"
            >
              {{ isSubmitting ? 'Registering...' : 'Register as Coach' }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';
import type { Skill } from '../../store/types';
import Loading from '../ui/Loading.vue';

export default defineComponent({
  name: 'CreateCoach',
  components: {
    Loading
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  emits: ['close', 'success'],
  data() {
    return {
      formData: {
        firstname: '',
        lastname: '',
        description: '',
        hourlyRate: 0,
        skills: [] as Skill[]
      },
      isSubmitting: false,
      availableSkills: [
        'Frontend',
        'Backend',
        'Full Stack',
      ]
    };
  },
  watch: {
    isOpen(newValue) {
      if (newValue) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  },
  beforeUnmount() {
    document.body.style.overflow = '';
  },
  methods: {
    ...mapActions("Coach", ["registerCoach"]),
    clearForm() {
      this.formData = {
        firstname: '',
        lastname: '',
        description: '',
        hourlyRate: 0,
        skills: []
      };
    },
    closeModal() {
      this.$emit('close');
    },
    async submitForm() {
      this.isSubmitting = true;
      try {
        await this.registerCoach({
          ...this.formData,
          fullName: `${this.formData.firstname} ${this.formData.lastname}`
        });
        this.clearForm();
        this.closeModal();
        this.$emit('success', 'Coach registered successfully!');
      } catch (error) {
        console.error('Error registering coach:', error);
        this.$emit('success', 'Failed to register coach. Please try again.');
      } finally {
        this.isSubmitting = false;
      }
    }
  }
});
</script>

<style scoped>
.fixed {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
</style>