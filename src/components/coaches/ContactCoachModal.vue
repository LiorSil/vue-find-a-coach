<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-gray-700/30 backdrop-blur-3xl flex items-center justify-center z-50 p-4 overflow-hidden"
    @click.self="closeModal"
  >
    <div v-if="isSubmitting" class="loading"><Loading /></div>
    <div
      v-else
      class="bg-gray-900/90 backdrop-blur-sm rounded-lg p-4 md:p-6 w-full max-w-[90%] md:max-w-md border-2 border-gray-800 shadow-xl mx-auto"
    >
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg md:text-xl font-semibold text-white">Contact Coach</h3>
        <button @click="closeModal" class="text-gray-400 hover:text-white">
          <svg
            class="w-5 h-5 md:w-6 md:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <form @submit.prevent="handleContactSubmit" class="space-y-3 md:space-y-4">
        <div>
          <label
            for="fullname"
            class="block text-sm font-medium text-gray-300 mb-1"
            >Full Name</label
          >
          <input
            type="text"
            id="fullname"
            v-model="formData.fullname"
            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            for="email"
            class="block text-sm font-medium text-gray-300 mb-1"
            >Email</label
          >
          <input
            type="email"
            id="email"
            v-model="formData.email"
            class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            for="message"
            class="block text-sm font-medium text-gray-300 mb-1"
            >Message</label
          >
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
            class="px-3 py-1.5 md:px-4 md:py-2 text-sm font-medium text-gray-300 hover:text-white bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-3 py-1.5 md:px-4 md:py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? "Sending..." : "Send Message" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "vuex";
import Loading from "../ui/Loading.vue";

export default defineComponent({
  name: "ContactCoachModal",
  components: {
    Loading,
  },
  inject: ["showSuccessToast"],
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    coachFirstName: {
      type: String,
      required: true,
    },
    coachLastName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      formData: {
        fullname: "",
        email: "",
        message: "",
        firstname: this.coachFirstName,
        lastname: this.coachLastName,
      },
      isSubmitting: false,
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
    ...mapActions("Request", ["createRequest"]),
    closeModal() {
      this.clearForm();
      this.$emit("close");
    },

    clearForm() {
      this.formData = {
        fullname: "",
        email: "",
        message: "",
        firstname: this.coachFirstName,
        lastname: this.coachLastName,
      };
    },
    async handleContactSubmit() {
      this.isSubmitting = true;
      try {
        await this.createRequest(this.formData);
        (this.showSuccessToast as (message: string) => void)(
          "Message sent successfully!"
        );
        this.clearForm();
        this.closeModal();
        if (this.$route.path.includes("coaches/")) {
          this.$router.go(-1);
        }
      } catch (error) {
        console.error("Error sending message:", error);
        (this.showSuccessToast as (message: string) => void)(
          "Failed to send message. Please try again."
        );
      } finally {
        this.isSubmitting = false;
      }
    },
  },
});
</script>

<style scoped>
.fixed {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
</style>
