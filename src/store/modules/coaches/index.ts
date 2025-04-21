import type { CoachesState } from "./types";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

const state: CoachesState = {
  coaches: [],
};

const coachesModule = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

export default coachesModule;
