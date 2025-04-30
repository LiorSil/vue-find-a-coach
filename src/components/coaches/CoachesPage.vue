<template>
  <div class="coaches-page">
    <div class="filter-container">
     
        <CoachesFilter
          :professions="professions"
          @filter-professions="updateProfessions"
        />
      
    </div>

    <transition name="fade" mode="out-in">
      <div v-if="isLoading" class="loading">Loading...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <CoachesList
        v-else-if="filteredCoaches && filteredCoaches.length > 0"
        :coaches="filteredCoaches"
      />
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState, mapGetters, mapActions } from "vuex";
import CoachesFilter from "./CoachesFilter.vue";
import CoachesList from "./CoachesList.vue";
import type { Profession } from "../../store/types";
import { professions as professionsData } from "../../data/Professions.json";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "CoachesPage",
  components: {
    CoachesFilter,
    CoachesList,
  },
  data() {
    return {
      professions: professionsData as Profession[],
      router: useRouter(),
    };
  },
  computed: {
    ...mapState("Coach", ["isLoading", "error"]),
    ...mapGetters("Coach", ["filteredCoaches", "allCoaches"]),
  },
  methods: {
    ...mapActions("Coach", ["fetchCoaches", "updateSelectedProfessions"]),
    updateProfessions(professions: Profession[]) {
      console.log("CoachesPage - updateProfessions called", professions);
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
    this.fetchCoaches();
  },
});
</script>

<style scoped>
.coaches-page {
  padding: 1rem;
}

.filter-container {
  margin-bottom: 1rem;
}

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

.content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}



/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Slide fade transition */
</style>
