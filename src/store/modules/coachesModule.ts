import type { Coach, CoachesState, Profession, Skill } from "../types";
import type { Commit, Module } from "vuex";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import app from "../../data/firebase.js";

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
    SET_SELECTED_PROFESSIONS(state: CoachesState, professions: Profession[]) {
     
      state.selectedProfessions = professions;
    },
    SET_LOADING(state: CoachesState, isLoading: boolean) {
     
      state.isLoading = isLoading;
    },
    SET_ERROR(state: CoachesState, error: string | null) {
      console.log("Error state changed:", {
        previous: state.error,
        new: error,
        timestamp: new Date().toISOString(),
      });
      state.error = error;
    },
  },

  actions: {
    async fetchCoaches({ commit }: { commit: Commit }) {
      console.log("Fetching coaches...", new Date().toISOString());
      commit("SET_SELECTED_PROFESSIONS", ["Frontend", "Backend", "Full stack"]);
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);

      try {
        const db = getFirestore(app);
        const querySnapshot = await getDocs(collection(db, "coaches"));
        const data = querySnapshot.docs.map((doc) => doc.data());
        commit("SET_COACHES", data);
      } catch (error) {
        console.error("Error fetching coaches:", error);
        commit("SET_ERROR", "Failed to fetch coaches");
      } finally {
        commit("SET_LOADING", false);
      }
    },

    updateSelectedProfessions(
      { commit }: { commit: Commit },
      professions: Profession[]
    ) {
      commit("SET_SELECTED_PROFESSIONS", professions);
    },
  },

  getters: {
    allCoaches: (state: CoachesState) => {
      return state.coaches;
    },
    filteredCoaches: (state: CoachesState) => {

      return state.coaches.filter((coach) => {
        const hasSelectedSkill = coach.skills.some((skill) =>
          state.selectedProfessions.includes(skill)
        );
      
        return hasSelectedSkill;
      });
    },

    isLoading: (state: CoachesState) => state.isLoading,
    error: (state: CoachesState) => state.error,
    selectedProfessions: (state: CoachesState) => state.selectedProfessions,
  },
};

export default coachesModule;
