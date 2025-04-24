import type { Coach, CoachesState } from "../types";
import type { Commit, Module } from "vuex";


const coachesModule: Module<CoachesState, any> = {
  namespaced: true,

  state: {
    coaches: [],
    selectedProfessions: [],
    isLoading: false,
    error: null,
  },

  mutations: {
    SET_COACHES(state: CoachesState, coaches: Coach[]) {
      state.coaches = coaches;
    },
    SET_SELECTED_PROFESSIONS(state: CoachesState, professions: string[]) {
      state.selectedProfessions = professions;
    },
    SET_LOADING(state: CoachesState, isLoading: boolean) {
      state.isLoading = isLoading;
    },
    SET_ERROR(state: CoachesState, error: string | null) {
      state.error = error;
    },
  },

  actions: {
    async fetchCoaches({ commit }: { commit: Commit }) {
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);

      try {
        // TODO: Replace with actual API call
        const response = await fetch("/api/coaches");
        const data = await response.json();
        commit("SET_COACHES", data);
      } catch (error) {
        commit("SET_ERROR", "Failed to fetch coaches");
        console.error("Error fetching coaches:", error);
      } finally {
        commit("SET_LOADING", false);
      }
    },

    updateSelectedProfessions(
      { commit }: { commit: Commit },
      professions: string[]
    ) {
      commit("SET_SELECTED_PROFESSIONS", professions);
    },
  },

  getters: {
    filteredCoaches: (state: CoachesState) => {
      if (state.selectedProfessions.length === 0) {
        return state.coaches;
      }

      return state.coaches.filter((coach) =>
        state.selectedProfessions.includes(coach.profession)
      );
    },

    isLoading: (state: CoachesState) => state.isLoading,
    error: (state: CoachesState) => state.error,
    selectedProfessions: (state: CoachesState) => state.selectedProfessions,
  },
};

export default coachesModule;
