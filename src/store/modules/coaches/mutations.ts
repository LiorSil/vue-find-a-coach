import type { Coach, CoachesState } from "./types";

export default {
  setCoaches(state: CoachesState, coaches: Coach[]) {
    state.coaches = coaches;
  },
};

