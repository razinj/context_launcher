import { createAction, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { APP_ID } from '../constants'
import { AppDetails } from '../models/app-details'
import { RootState } from '../store'
import { getAppsLetterIndex } from '../utils/alphabet-list'

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
        .filter(({ packageName }: AppDetails) => packageName !== APP_ID)
        .sort((appOne: AppDetails, appTwo: AppDetails) => appOne.name.localeCompare(appTwo.name))
    },
  },
})

export const { setAppsList } = appsListSlice.actions

export const getAppsListAction = createAction('appsList/getAppsListAction')
export const appRemovedAction = createAction<string>('appsList/appRemovedAction')

const selectAppsList = (state: RootState) => state.appsList.list

export const selectAppsListMemoized = createSelector(selectAppsList, (list: AppDetails[]) => list)
export const selectAppsLetterListMemoized = createSelector(selectAppsList, (list: AppDetails[]) =>
  getAppsLetterIndex(list)
)

export default appsListSlice.reducer
