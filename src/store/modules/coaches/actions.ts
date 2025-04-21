import type { Coach } from "./types";

export default {
  async fetchCoaches({ commit }: { commit: Function }) {
    const coaches: Coach[] = [];
    commit("setCoaches", coaches);
  },
};
