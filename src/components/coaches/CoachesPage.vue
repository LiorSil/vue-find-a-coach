<template>
  <div class="p-2">
    <div
      class="sticky mx-auto max-w-2/5 top-0 z-10 bg-gray-200/40 transition-all duration-300 ease-in-out p-3 rounded-lg  border-white/20 shadow-md mb-2"
    >
      <!-- Filter Section -->
      <div class="mb-2">
        <CoachesFilter
          :professions="professions"
          @filter-professions="updateProfessions"
        />
      </div>

  

      <!-- Actions Section -->
      <div class="w-full  mx-auto">
        <CoachesActions @register-coach="showCreateCoachModal = true" />
      </div>
    </div>

    <CoachesContent
      :is-loading="isLoading"
      :error="error"
      :coaches="filteredCoaches"
    />

    <!-- Create Coach Modal -->
    <CreateCoach
      :is-open="showCreateCoachModal"
      @close="showCreateCoachModal = false"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { mapState, mapGetters, mapActions } from "vuex";
import CoachesFilter from "./CoachesFilter.vue";
import CoachesContent from "./CoachesContent.vue";
import CoachesActions from "./CoachesActions.vue";
import CreateCoach from "./CreateCoach.vue";

import type { Profession } from "../../store/types";
import { professions as professionsData } from "../../data/Professions.json";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "CoachesPage",
  components: {
    CoachesFilter,
    CoachesContent,
    CoachesActions,
    CreateCoach,
  },
  setup() {
    const showCreateCoachModal = ref(false);
    return { showCreateCoachModal };
  },
  data() {
    return {
      professions: professionsData as Profession[],
      router: useRouter(),
    };
  },
  computed: {
    ...mapState("Coach", ["isLoading", "error", "shouldAnimateInitialLoad"]),
    ...mapGetters("Coach", [
      "filteredCoaches",
      "allCoaches",
      "isCoachesLoaded",
    ]),
  },
  methods: {
    ...mapActions("Coach", [
      "fetchCoaches",
      "updateSelectedProfessions",
      "disableInitialLoadAnimation",
    ]),
    updateProfessions(professions: Profession[]) {
      this.professions = professions;
      const selectedProfessions = professions
        .filter((p) => p.selected)
        .map((p) => p.name);
      this.updateSelectedProfessions(selectedProfessions);
    },
    navigateToCoach(id: string) {
      this.$router.push(`/coaches/${id}`);
    },
  },
  provide() {
    return {
      navigateToCoach: this.navigateToCoach,
    };
  },
  mounted() {
    if (this.shouldAnimateInitialLoad) {
      this.fetchCoaches();
    }
  },
  beforeUnmount() {
    this.disableInitialLoadAnimation();
  },
});
</script>

<style scoped>
/* Only keeping the fade transition as it's not easily achievable with Tailwind */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
