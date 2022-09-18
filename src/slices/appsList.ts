// Redux
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
// Constants
import { CONTEXT_LAUNCHER_APP_ID } from '../constants'
// Utils
import { getAppsLetterIndex } from '../utils/alphabetList'
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
    setAppsList: (state: AppsListState, { payload }: PayloadAction<AppDetails[]>) => {
      // Filter out Context Launcher from the app's list and sort it
      state.list = payload
        .filter(({ name }: AppDetails) => name !== CONTEXT_LAUNCHER_APP_ID)
        .sort((appOne: AppDetails, appTwo: AppDetails) => appOne.label.localeCompare(appTwo.label))
    },
  },
})

export const { setAppsList } = appsListSlice.actions

const selectAppsList = (state: RootState) => state.appsList.list

export const selectAppsListMemoized = createSelector(selectAppsList, (list: AppDetails[]) => list)

export const selectAppsLetterListMemoized = createSelector(selectAppsList, (list: AppDetails[]) =>
  getAppsLetterIndex(list)
)

export default appsListSlice.reducer
