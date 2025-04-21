import type { Coach, CoachesState } from "./types";

export default {
  allCoaches(state: CoachesState): Coach[] {
    return state.coaches;
  },
};