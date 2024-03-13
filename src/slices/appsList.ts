import { createAction, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDetails } from '../models/app-details'
import { RootState } from '../store'
import { getAppsLetterIndex } from '../utils/alphabet-list'
import { displayToast } from '../utils/toast'

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
      // console.log('setAppsList called');
      displayToast(`apps found : ${payload.length}`)

      state.list = payload.sort((appOne: AppDetails, appTwo: AppDetails) => appOne.name.localeCompare(appTwo.name))
    },
  },
})

export const { setAppsList } = appsListSlice.actions

export const getAppsListAction = createAction('appsList/getAppsListAction')
export const appRemovedAction = createAction<string>('appsList/appRemovedAction')
export const revalidateAppsLists = createAction('appsList/revalidateAppsLists')

const selectAppsList = (state: RootState) => state.appsList.list

export const selectAppsListMemoized = createSelector(selectAppsList, (list: AppDetails[]) => list)
export const selectAppsLetterListMemoized = createSelector(selectAppsList, (list: AppDetails[]) =>
  getAppsLetterIndex(list)
)

export default appsListSlice.reducer
