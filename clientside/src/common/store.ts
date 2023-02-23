import { configureStore } from '@reduxjs/toolkit'

import { gridReducer } from './components/Grid/redux/gridSlice'
import { dictReducer } from './dictSlice'

export const store = configureStore({
  reducer: {
    dictionaries: dictReducer,
    grid: gridReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
