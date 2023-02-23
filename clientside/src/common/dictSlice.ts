import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { DictionariesResponse } from 'sdk'

const initialState: DictionariesResponse = {}

export const dictSlice = createSlice({
  initialState,
  name: 'dictionaries',
  reducers: {
    setDicts: (state, action: PayloadAction<DictionariesResponse>) => {
      return { ...action.payload }
    },
  },
})

export const { setDicts } = dictSlice.actions

const dictReducer = dictSlice.reducer

export { dictReducer }
