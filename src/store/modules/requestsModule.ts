import type { Commit, Module } from "vuex";
import type { Request, RequestsState, ProcessedRequest } from "../types";
import { convertFirebaseTimestamp } from "../types";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import app from "../../data/firebase";

const requestsModule: Module<RequestsState, any> = {
  namespaced: true,

  state: {
    requests: [],
    isLoading: false,
    error: null,
  },

  mutations: {
    SET_REQUESTS(state: RequestsState, requests: Request[]) {
      state.requests = requests.map((request) => {
        const date = convertFirebaseTimestamp(request.requestDate);
        const formattedDate = date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        const processedRequest: ProcessedRequest = {
          ...request,
          requestDate: date,
          formattedDate,
        };
      
        return processedRequest;
      });
      console.log("state.requests", state.requests);
    },
    SET_LOADING(state: RequestsState, isLoading: boolean) {
      state.isLoading = isLoading;
    },
    SET_ERROR(state: RequestsState, error: string | null) {
      state.error = error;
    },
  },

  actions: {
    async fetchRequests({
      commit,
      state,
    }: {
      commit: Commit;
      state: RequestsState;
    }) {
      if (state.requests.length > 0) {
        console.log("Requests already loaded, skipping fetch");
        return;
      }
      commit("SET_LOADING", true);
      try {
        const db = getFirestore(app);
        const querySnapshot = await getDocs(collection(db, "requests"));
        const data = querySnapshot.docs.map((doc) => doc.data());
        commit("SET_REQUESTS", data);
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

export default requestsModule;
