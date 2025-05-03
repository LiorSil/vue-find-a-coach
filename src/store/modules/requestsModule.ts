import type { Commit, Module } from "vuex";
import type {
  Request,
  RequestsState,
  ProcessedRequest,
  RequestData,
} from "../types";
import { convertFirebaseTimestamp } from "../types";
import {
  collection,
  getDocs,
  getFirestore,
  addDoc,
  Timestamp,
} from "firebase/firestore";
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
    },
    SET_LOADING(state: RequestsState, isLoading: boolean) {
      state.isLoading = isLoading;
    },
    SET_ERROR(state: RequestsState, error: string | null) {
      state.error = error;
    },
    ADD_REQUEST(state: RequestsState, request: Request) {
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
      state.requests.push(processedRequest);
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
        commit(
          "SET_ERROR",
          error instanceof Error ? error.message : "Failed to fetch requests"
        );
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async createRequest(
      { commit, state }: { commit: Commit; state: RequestsState },
      requestData: RequestData
    ) {
      commit("SET_LOADING", true);
      commit("SET_ERROR", null);

      try {
        const db = getFirestore(app);
        const requestsCollection = collection(db, "requests");
        const newRequest = {
          id: state.requests.length + 1,
          firstname: requestData.firstname,
          lastname: requestData.lastname,
          email: requestData.email,
          message: requestData.message,
          requestDate: Timestamp.fromDate(new Date()),
          requestedBy: requestData.fullname,
        };
        const docRef = await addDoc(requestsCollection, newRequest);
        const requestWithId = { ...newRequest, id: docRef.id };

        commit("ADD_REQUEST", requestWithId);
        return requestWithId;
      } catch (error) {
        console.error("Error creating request:", error);
        commit(
          "SET_ERROR",
          error instanceof Error ? error.message : "Failed to create request"
        );
        throw error;
      } finally {
        commit("SET_LOADING", false);
      }
    },
  },

  getters: {
    requests: (state: RequestsState) => state.requests,
    isLoading: (state: RequestsState) => state.isLoading,
    error: (state: RequestsState) => state.error,
    hasRequests: (state: RequestsState) => state.requests.length > 0,
    requestsCount: (state: RequestsState) => state.requests.length,
    sortedRequests: (state: RequestsState) => {
      return [...state.requests].sort(
        (a, b) => b.requestDate.getTime() - a.requestDate.getTime()
      );
    },
  },
};

export default requestsModule;
