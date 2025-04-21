import type { Request, RequestsState } from "./types";

export default {
  getRequests(state: RequestsState): Request[]  {
        return state.requests
        
  } 

};