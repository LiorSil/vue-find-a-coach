<template>
  <div class="container mx-auto px-4 py-6 space-y-6 max-w-3xl">
    <!-- Back Button -->
    <div class="mb-6">
      <BaseButton variant="info" @click="goBack">
        <template #icon>
          <svg
            class="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </template>
        Back to Coaches
      </BaseButton>
    </div>

    <div v-if="isLoading" class="loading"><Loading /></div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <template v-else-if="selectedCoach">
      <!-- Profile Section -->
      <BaseCard>
        <div class="flex flex-col items-center p-8 ">
          <div class="w-32 h-32 mb-4 rounded-full bg-gray-500 hover:bg-gray-600 flex items-center justify-center">
            <span class="text-4xl text-white">
              {{ selectedCoach.firstname[0] }}{{ selectedCoach.lastname[0] }}
            </span>
          </div>
          <h2 class="text-3xl font-bold text-white mb-2">
            {{ selectedCoach.firstname }} {{ selectedCoach.lastname }}
          </h2>
          <span class="text-xl text-gray-300">
            ${{ selectedCoach.pricePerHour }}/hour
          </span>
        </div>
      </BaseCard>

      <!-- About Section -->
      <BaseCard>
        <div class="p-8">
          <h3 class="text-2xl font-semibold text-white mb-6">
            About Me
          </h3>

          <p class="text-gray-300 mb-8 leading-relaxed">
            {{ selectedCoach.description || "No description available." }}
          </p>

          <!-- Skills Section -->
          <Skills :skills="selectedCoach.skills" :isTitle="true" />

          <!-- Contact Section -->
          <div class="flex justify-center">
            <BaseButton variant="success" @click="openContactModal">
              <template #icon>
                <svg
                  class="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </template>
              Contact Coach
            </BaseButton>
          </div>
        </div>
      </BaseCard>
    </template>
    <div v-else class="error">Coach not found</div>

    <!-- Contact Modal -->
    <ContactCoachModal
      :is-open="isContactModalOpen"
      @close="closeContactModal"
      :coachFirstName="selectedCoach?.firstname"
      :coachLastName="selectedCoach?.lastname"
    />

    <!-- Toast -->
    <Toast
      :is-visible="showToast"
      :message="toastMessage"
      @hide="showToast = false"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState, mapActions, mapGetters } from "vuex";
import BaseCard from "../ui/BaseCard.vue";
import BaseButton from "../ui/BaseButton.vue";
import Loading from "../ui/Loading.vue";
import Skills from "./Skills.vue";
import ContactCoachModal from "./ContactCoachModal.vue";
import Toast from "../ui/Toast.vue";

export default defineComponent({
  name: "CoachDetail",
  components: {
    BaseCard,
    BaseButton,
    Loading,
    Skills,
    ContactCoachModal,
    Toast,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isContactModalOpen: false,
      showToast: false,
      toastMessage: "",
    };
  },
  computed: {
    ...mapState("Coach", ["isLoading", "error"]),
    ...mapGetters("Coach", ["selectedCoach"]),
  },
  methods: {
    ...mapActions("Coach", ["fetchCoachById"]),
    goBack() {
      this.$router.push("/coaches");
    },
    openContactModal() {
      this.isContactModalOpen = true;
    },
    closeContactModal() {
      this.isContactModalOpen = false;
    },
    showSuccessToast(message: string) {
      this.toastMessage = message;
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 5000);
    }
  },
  provide() {
    return {
      showSuccessToast: this.showSuccessToast
    };
  },
  created() {
    this.fetchCoachById(this.id);
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

/* Smooth transitions for cards */
:deep(.base-card) {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

:deep(.base-card:hover) {
  transform: translateY(-2px);
}

/* Skill badge hover effect */
:deep(.base-card) {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

:deep(.base-card:hover) {
  transform: translateY(-2px);
}

/* Add a subtle pulse animation to the skills */
@keyframes subtle-pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.1);
  }
  70% {
    box-shadow: 0 0 0 6px rgba(59, 130, 246, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
  }
}

span[class*="bg-gradient-to-r"] {
  animation: subtle-pulse 2s infinite;
}
</style>
