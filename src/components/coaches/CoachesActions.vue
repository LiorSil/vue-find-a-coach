<template>
  <div class="flex flex-row justify-center w-full gap-4 items-center">
    <BaseButton variant="primary" @click="refreshCoaches" class="w-full md:flex-1 justify-center">
      <template #icon>
        <svg
          class="w-6 h-6 md:w-4 md:h-4 md:mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </template>
      <span class="hidden md:inline">Refresh</span>
    </BaseButton>
    <BaseButton variant="success" @click="registerCoach" class="w-full md:flex-1 justify-center">
      <template #icon>
        <svg
          class="w-6 h-6 md:w-4 md:h-4 md:mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
          />
        </svg>
      </template>
      <span class="hidden md:inline">Register Coach</span>
    </BaseButton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "vuex";

export default defineComponent({
  name: "CoachesActions",
  emits: ["register-coach", "refresh"],
  methods: {
    ...mapActions("Coach", ["fetchCoaches"]),
    refreshCoaches() {
      this.$emit("refresh");
    },
    registerCoach() {
      this.$emit("register-coach");
    },
  },
});
</script>

<style scoped>
button {
  transition: all 0.2s ease-in-out;
}

button:hover {
  transform: translateY(-1px);
}

button:active {
  transform: translateY(0);
}
</style> 