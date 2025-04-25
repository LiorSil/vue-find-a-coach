// create vuex a store and import from store modules
import { createStore } from "vuex";
import coachesModule from "./modules/requestsModule";
// import requestModule from "./modules/requests";

import type { RootState } from "./types";

// create a store instance
 const store = createStore<RootState>({
  modules: {
    Coach: coachesModule,
    // Request: requestModule,
  },
});
// export the store instance
export default store;
