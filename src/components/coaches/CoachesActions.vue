<template>
  <div class="flex justify-between w-full gap-4 items-center  ">
    <BaseButton variant="primary" @click="refreshCoaches" class="flex-1 justify-center">
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
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </template>
      Refresh
    </BaseButton>
    <BaseButton variant="success" @click="registerCoach" class="flex-1 justify-center">
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
            d="M12 4v16m8-8H4"
          />
        </svg>
      </template>
      Register Coach
    </BaseButton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "vuex";

export default defineComponent({
  name: "CoachesActions",
  emits: ["register-coach"],
  methods: {
    ...mapActions("Coach", ["fetchCoaches"]),
    refreshCoaches() {
      this.fetchCoaches();
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