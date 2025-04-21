// create vuexa store and import from store modules
import { createStore } from "vuex";
import coachesModule from "./modules/coaches";
import requestModule from "./modules/requests";

import type { RootState } from "./types";

// create a store instance
 const store = createStore<RootState>({
  modules: {
    Coach: coachesModule,
    Request: requestModule,
  },
});
// export the store instance
export default store;
