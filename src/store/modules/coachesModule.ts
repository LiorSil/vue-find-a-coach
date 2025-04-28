import type { Coach, CoachesState, Profession } from "../types";
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
    selectedCoach: null as Coach | null,
  },

  mutations: {
    SET_COACHES(state: CoachesState, coaches: Coach[]) {
      state.coaches = coaches;
    },
    SET_SELECTED_COACH(state: CoachesState, coach: Coach) {
      state.selectedCoach = coach;
    },
    SET_SELECTED_PROFESSIONS(state: CoachesState, professions: Profession[]) {
      state.selectedProfessions = professions;
    },
    SET_LOADING(state: CoachesState, isLoading: boolean) {
      state.isLoading = isLoading;
    },
    SET_ERROR(state: CoachesState, error: string | null) {
      if (state.error) {
        console.log("Error state changed:", {
          previous: state.error,
          new: error,
          timestamp: new Date().toISOString(),
        });
        state.error = error;
      }
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

    async fetchCoachById(
      { commit, state }: { commit: Commit; state: CoachesState },
      id: string
    ) {
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);

      try {
        // First try to find coach in filtered coaches
        let coach = state.coaches.find((coach) => String(coach.id) === id);

        // If coach not found in filtered coaches, try all coaches
        if (!coach) {
          const db = getFirestore(app);
          const querySnapshot = await getDocs(collection(db, "coaches"));
          const coaches = querySnapshot.docs.map((doc) => doc.data());

          if (coaches.length === 0) {
            throw new Error("No coaches found");
          }

          // Update the coaches state with all coaches
          commit("SET_COACHES", coaches);

          // Find the coach in the updated state
          coach = coaches.find((coach) => String(coach.id) === id) as Coach;

          if (!coach) {
            throw new Error("Coach not found");
          }
        }

        // Update the selected coach
        commit("SET_SELECTED_COACH", coach);
        commit("SET_ERROR", null); // Clear any previous errors
      } catch (error) {
        console.error("Error finding/fetching coach:", error);
        console.log("error", error);
        commit(
          "SET_ERROR",
          error instanceof Error
            ? error.message
            : "Failed to find/fetch coach details"
        );
        commit("SET_SELECTED_COACH", null); // Clear selected coach on error
      } finally {
        commit("SET_LOADING", false);
      }
    },
  },
  getters: {
    allCoaches: (state: CoachesState) => {
      return state.coaches;
    },
    selectedCoach: (state: CoachesState) => {
      return state.selectedCoach;
    },
    filteredCoaches: (state: CoachesState) => {
      return state.coaches.filter((coach) => {
        const hasSelectedSkill = coach.skills.some((skill) =>
          state.selectedProfessions.some(
            (prof) => prof.toLowerCase() === skill.toLowerCase()
          )
        );
        return hasSelectedSkill;
      });
    },
    getCoachById: (state: CoachesState) => (id: string) => {
      return state.coaches.find((coach) => coach.id === id);
    },
    isLoading: (state: CoachesState) => state.isLoading,
    error: (state: CoachesState) => state.error,
    selectedProfessions: (state: CoachesState) => state.selectedProfessions,
  },
};

export default coachesModule;
