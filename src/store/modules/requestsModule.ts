import type { Module } from "vuex";
import type { Coach, RequestsState, Profession } from "../types";

const coachesModule: Module<RequestsState, any> = {
  namespaced: true,

  state: {
    requests: [],
    isLoading: false,
    error: null,
  },

  mutations: {
    SET_REQUESTS(state: RequestsState, requests: Request[]) {
      state.requests = requests;
    },
    SET_LOADING(state: RequestsState, isLoading: boolean) {
      state.isLoading = isLoading;
    },
    SET_ERROR(state: RequestsState, error: string | null) {
      state.error = error;
    },
  },

  actions: {
    async fetchRequests({ commit }) {
      commit("SET_LOADING", true);
      try {
        commit("SET_REQUESTS", []);
      } catch (error) {
        commit("SET_ERROR", error);
      } finally {
        commit("SET_LOADING", false);
      }
    },
  },

  getters: {
    requests: (state: RequestsState) => state.requests,
    isLoading: (state: RequestsState) => state.isLoading,
    error: (state: RequestsState) => state.error,
  },
};
