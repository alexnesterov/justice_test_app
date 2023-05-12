import { configureStore } from '@reduxjs/toolkit'

import { api } from './slices/apiSlice'
import filterSlice from './slices/filterSlice'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    filter: filterSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
