<template>
  <div class="coaches-page">
    <div v-if="isLoading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <template v-else>
      <CoachesFilter 
        :professions="professions" 
        @filter-professions="updateProfessions"
      />
      <CoachesList :coaches="filteredCoaches" />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState, mapGetters, mapActions } from 'vuex';
import CoachesFilter from "./CoachesFilter.vue";
import CoachesList from "./CoachesList.vue";
import type { Profession } from "../../store/types";
import {professions as professionsData } from '../../data/Professions.json';
export default defineComponent({
  name: "CoachesPage",
  components: {
    CoachesFilter,
    CoachesList,
  },
  data() {
    return {
      professions: professionsData,
    };
  },
  computed: {
    ...mapState('Coach', ['isLoading', 'error']),
    ...mapGetters('Coach', ['filteredCoaches']),
  },
  methods: {
    ...mapActions('Coach', ['fetchCoaches', 'updateSelectedProfessions']),
    updateProfessions(professions: Profession[]) {
      console.table(professions);
      this.professions = professions;
      const selectedProfessions = professions
        .filter(p => p.selected)
        .map(p => p.name);
      this.updateSelectedProfessions(selectedProfessions);
    }
  },
  created() {
    this.fetchCoaches();
    

    
  }
});
</script>

<style scoped>
.coaches-page {
  padding: 1rem;
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
</style>
