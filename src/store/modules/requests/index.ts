import type { RequestsState } from "./types";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

const state: RequestsState = {
  requests: [],
};

const requestModule = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

export default requestModule;
