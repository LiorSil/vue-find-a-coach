import { Module } from 'vuex';
import type { RootState } from '../../types';

export interface CoachesState {
  coaches: Array<any>; // Replace `any` with a proper type for your coaches
}

const state: CoachesState = {
  coaches: [],
};

const coachesModule: Module<CoachesState, RootState> = {
  namespaced: true,
  state,
  mutations: {
    setCoaches(state , coaches) {
      state.coaches = coaches;
    },
  },
  actions: {
    fetchCoaches({ commit }) {
      // Add logic to fetch coaches from an API or other source
      const coaches = []; // Replace with actual fetched data
      commit('setCoaches', coaches);
    },
  },
  getters: {
    allCoaches(state) {
      return state.coaches;
    },
  },
};

export default coachesModule;