// create vuex a store and import from store modules
import { createStore } from "vuex";
import coachesModule from "./modules/coachesModule";
import requestsModule from "./modules/requestsModule";


import type { RootState } from "./types";

// create a store instance
const store = createStore<RootState>({
  modules: {
    Coach: coachesModule,
    Request: requestsModule,
  },
});
// export the store instance
export default store;
