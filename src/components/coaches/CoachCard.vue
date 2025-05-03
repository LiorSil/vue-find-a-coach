<template>
  <BaseCard class="coach-item">
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
            <span>
              <Skills :skills="coach.skills" :title="true" />
            </span>
          </div>

          <!-- Buttons -->
          <div class="flex gap-3">
            <BaseButton variant="success" @click="openContactModal">
              Contact
            </BaseButton>
            <BaseButton variant="info" @click="viewDetails"> Info </BaseButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact Modal -->
    <ContactCoachModal
      :isOpen="isContactModalOpen"
      :coachFirstName="coach.firstName"
      :coachLastName="coach.lastName"
      @close="closeContactModal"
    />
  </BaseCard>
</template>

<script>
import BaseCard from "../ui/BaseCard.vue";
import BaseButton from "../ui/BaseButton.vue";
import { useRouter } from "vue-router";
import Skills from "./Skills.vue";
import ContactCoachModal from "./ContactCoachModal.vue";
import { ref } from "vue";

export default {
  name: "CoachCard",
  components: {
    BaseCard,
    Skills,
    BaseButton,
    ContactCoachModal,
  },
  props: {
    coach: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const router = useRouter();
    const isContactModalOpen = ref(false);

    const openContactModal = () => {
      isContactModalOpen.value = true;
    };

    const closeContactModal = () => {
      isContactModalOpen.value = false;
    };

    return {
      router,
      isContactModalOpen,
      openContactModal,
      closeContactModal,
    };
  },
  methods: {
    viewDetails() {
      this.router.push(`/coaches/${this.coach.id}`);
    },
  },
};
</script>

<style scoped>
.coach-item {
  transition: all 0.5s ease;
}
</style>
