// Redux
import { createSelector, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
// Models
import { RootState } from '../store'
import { AppDetails } from '../models/app-details'

export interface AppsListState {
  list: AppDetails[]
}

const initialState: AppsListState = {
  list: [],
}

export const appsListSlice = createSlice({
  name: 'appsList',
  initialState,
  reducers: {
    setAppsList: (state: AppsListState, action: PayloadAction<AppDetails[]>) => {
      state.list = action.payload
    },
  },
})

export const { setAppsList } = appsListSlice.actions

const selectAppsList = (state: RootState) => state.appsList.list

export const selectAppsListMemoized = createSelector(selectAppsList, (list: AppDetails[]) => list)

export default appsListSlice.reducer
