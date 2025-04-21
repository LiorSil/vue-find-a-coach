import type { RequestsState } from "./types";

export default {
  // Mutation to set the requests in the state
  setRequests(state: RequestsState, payload: RequestsState) {
    state.requests = payload.requests;
  },
};
