// Redux
import { createSelector, createSlice } from '@reduxjs/toolkit'
// Models
import { RootState } from '../store'
// Utils
import uuid from 'react-native-uuid'

export interface GlobalState {
  id: string
  isFirebaseInfoSet: boolean
}

const initialState: GlobalState = {
  id: uuid.v4().toString(),
  isFirebaseInfoSet: false,
}

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setIsFirebaseInfoSetValue: (state: GlobalState) => {
      state.isFirebaseInfoSet = true
    },
  },
})

export const { setIsFirebaseInfoSetValue } = globalSlice.actions

const selectId = (state: RootState) => state.global.id
const selectIsFirebaseInfoSet = (state: RootState) => state.global.isFirebaseInfoSet

export const selectIdMemoized = createSelector(selectId, (value: string) => value)
export const selectIsFirebaseInfoSetMemoized = createSelector(selectIsFirebaseInfoSet, (value: boolean) => value)

export default globalSlice.reducer
