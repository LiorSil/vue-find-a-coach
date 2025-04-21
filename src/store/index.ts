// create vuexa store and import from store modules
import { createStore } from 'vuex'
import { coaches } from './modules/coaches'
import { requests } from './modules/requests'


import { RootState } from './types'
import { CoachesState } from './modules/coaches/types'
import { RequestsState } from './modules/requests/types'

// create a store instance
const store = createStore<RootState>({
  modules: {
    coaches,
    requests
  },
})

