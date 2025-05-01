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
    shouldAnimateInitialLoad: true,
    selectedCoach: null as Coach | null,
    isLoaded: false,
  },

  mutations: {
    SET_COACHES(state: CoachesState, coaches: Coach[]) {
      state.coaches = coaches;
      state.isLoaded = true;
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
    DISABLE_INITIAL_LOAD_ANIMATION(state: CoachesState) {
      state.shouldAnimateInitialLoad = false;
    },
  },

  actions: {
    async fetchCoaches({
      commit,
      state,
    }: {
      commit: Commit;
      state: CoachesState;
    }) {
      if (state.isLoaded && state.coaches.length > 0 && !state.selectedCoach) {
        console.log("Coaches already loaded, skipping fetch");
        return;
      }

      console.log("Fetching coaches...", new Date().toISOString());
      commit("SET_SELECTED_PROFESSIONS", ["Frontend", "Backend", "Full stack"]);
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);

      try {
        const db = getFirestore(app);
        const querySnapshot = await getDocs(collection(db, "coaches"));
        const data = querySnapshot.docs.map((doc) => doc.data());
        commit("SET_COACHES", data);

        if (state.selectedCoach?.id) {
          const coach = data.find(
            (coach) => String(coach.id) === String(state.selectedCoach?.id)
          );
          if (coach) {
            commit("SET_SELECTED_COACH", coach);
          }
        }
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
        let coach = state.coaches.find((coach) => String(coach.id) === id);

        if (!coach) {
          const db = getFirestore(app);
          const querySnapshot = await getDocs(collection(db, "coaches"));
          const coaches = querySnapshot.docs.map((doc) => doc.data());

          if (coaches.length === 0) {
            throw new Error("No coaches found");
          }

          commit("SET_COACHES", coaches);

          coach = coaches.find((coach) => String(coach.id) === id) as Coach;

          if (!coach) {
            throw new Error("Coach not found");
          }
        }

        commit("SET_SELECTED_COACH", coach);
        commit("SET_ERROR", null);
      } catch (error) {
        console.error("Error finding/fetching coach:", error);
        console.log("error", error);
        commit(
          "SET_ERROR",
          error instanceof Error
            ? error.message
            : "Failed to find/fetch coach details"
        );
        commit("SET_SELECTED_COACH", null);
      } finally {
        commit("SET_LOADING", false);
      }
    },
    disableInitialLoadAnimation({ commit }: { commit: Commit }) {
      commit("DISABLE_INITIAL_LOAD_ANIMATION");
    },
  },

  getters: {
    allCoaches: (state: CoachesState) => state.coaches,
    selectedCoach: (state: CoachesState) => state.selectedCoach,
    filteredCoaches: (state: CoachesState) => {
      if (!state.isLoaded) {
        return [];
      }

      return state.coaches.filter((coach) => {
        const hasSelectedSkill = coach.skills.some((skill) =>
          state.selectedProfessions.some(
            (prof) => prof.toLowerCase() === skill.toLowerCase()
          )
        );
        return hasSelectedSkill;
      });
    },
    isCoachesLoaded: (state: CoachesState) => state.isLoaded,
    shouldAnimateInitialLoad: (state: CoachesState) =>
      state.shouldAnimateInitialLoad,
  },
};

export default coachesModule;
