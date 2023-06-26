import { configureStore } from '@reduxjs/toolkit'

import totalReducer from './slices/total';
import regionsReducer from './slices/regions';
import countryReducer from './slices/country';


const reducer = {
  total: totalReducer,
  regions: regionsReducer,
  country: countryReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;