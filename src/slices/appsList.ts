// Redux
import { createSelector, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
// Constants
import { CONTEXT_LAUNCHER_APP_ID } from '../constants'
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
      // Filter out Context Launcher from the app's list
      state.list = action.payload.filter(({ name }: AppDetails) => name !== CONTEXT_LAUNCHER_APP_ID)
    },
  },
})

export const { setAppsList } = appsListSlice.actions

const selectAppsList = (state: RootState) => state.appsList.list

export const selectAppsListMemoized = createSelector(selectAppsList, (list: AppDetails[]) => list)

export default appsListSlice.reducer
