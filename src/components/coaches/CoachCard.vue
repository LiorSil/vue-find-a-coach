<template>
  <BaseCard class="coach-item">
    <div class="flex justify-center">
      <div class="w-full max-w-sm">
        <div class="flex flex-col items-center p-1.5 md:p-6">
          <h5 class="mb-0.5 md:mb-1 text-sm md:text-xl font-medium text-gray-900 dark:text-white truncate w-full text-center">
            {{ coach.firstname }} {{ coach.lastname }}
          </h5>
          <span class="text-[10px] md:text-sm text-gray-500 dark:text-gray-400 mb-0.5 md:mb-2">
            ${{ coach.pricePerHour }}/h
          </span>

          <!-- Skills Stamps -->
          <div class="flex flex-wrap gap-0.5 md:gap-2 mb-1 md:mb-4 w-max">
            <span class="flex flex-row lg:flex-col items-center gap-1">
              <Skills :skills="coach.skills" :title="true" />
            </span>
          </div>

          <!-- Buttons -->
          <div class="flex gap-1 md:gap-3">
            <BaseButton variant="success" @click="openContactModal" class="text-[10px] md:text-base py-0.5 md:py-1 flex flex-col items-center">
              <template #icon>
                <svg class="w-4 h-4 lg:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </template>
              <span class="text-[8px] lg:hidden">Contact</span>
              <span class="hidden lg:inline">Contact</span>
            </BaseButton>
            <BaseButton variant="info" @click="viewDetails" class="text-[8px] md:text-base py-0.5 md:py-1 flex flex-col items-center">
              <template #icon>
                <svg class="w-4 h-4 lg:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </template>
              <span class="text-[8px] lg:hidden">Info</span>
              <span class="hidden lg:inline">Info</span>
            </BaseButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact Modal -->
    <ContactCoachModal
      :isOpen="isContactModalOpen"
      :coachFirstName="coach.firstname"
      :coachLastName="coach.lastname"
      @close="closeContactModal"
    />
  </BaseCard>
</template>

<script>
import BaseCard from "../ui/BaseCard.vue";
import BaseButton from "../ui/BaseButton.vue";
import Skills from "./Skills.vue";
import ContactCoachModal from "./ContactCoachModal.vue";

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
  data() {
    return {
      isContactModalOpen: false
    };
  },
  methods: {
    openContactModal() {
      this.isContactModalOpen = true;
    },
    closeContactModal() {
      this.isContactModalOpen = false;
    },
    viewDetails() {
      this.$router.push({
        name: 'coach-detail',
        params: { id: this.coach.id }
      });
    }
  }
};
</script>

<style scoped>
.coach-item {
  transition: all 0.5s ease;
}
</style>
