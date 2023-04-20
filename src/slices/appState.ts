import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDetails } from '../models/app-details'
import { RenderedIn } from '../models/rendered-in'
import { RootState } from '../store'

interface AppsSearchState {
  query?: string
  result: AppDetails[]
}

export interface AppState {
  displayAllApps: boolean
  displaySettings: boolean
  menuAppDetails?: AppDetails
  displayAppMenu: boolean
  displaySortableFavoriteApps: boolean
  displaySortablePinnedApps: boolean
  displaySortableTemporaryPinnedApps: boolean
  search: AppsSearchState
}

const initialState: AppState = {
  displayAllApps: false,
  displaySettings: false,
  menuAppDetails: undefined,
  displayAppMenu: false,
  displaySortableFavoriteApps: false,
  displaySortablePinnedApps: false,
  displaySortableTemporaryPinnedApps: false,
  search: {
    query: undefined,
    result: [],
  },
}

export const appStateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    // GlobalAppState
    setDisplayAllApps: (state: AppState, { payload }: PayloadAction<boolean>) => {
      state.displayAllApps = payload
    },
    setDisplaySettings: (state: AppState, { payload }: PayloadAction<boolean>) => {
      state.displaySettings = payload
    },
    setMenuAppDetails: (state: AppState, { payload }: PayloadAction<AppDetails | undefined>) => {
      state.menuAppDetails = payload
    },
    setDisplayAppMenu: (state: AppState, { payload }: PayloadAction<boolean>) => {
      state.displayAppMenu = payload
    },
    setDisplaySortableFavoriteApps: (state: AppState, { payload }: PayloadAction<boolean>) => {
      state.displaySortableFavoriteApps = payload
    },
    setDisplaySortablePinnedApps: (state: AppState, { payload }: PayloadAction<boolean>) => {
      state.displaySortablePinnedApps = payload
    },
    setDisplaySortableTemporaryPinnedApps: (state: AppState, { payload }: PayloadAction<boolean>) => {
      state.displaySortableTemporaryPinnedApps = payload
    },
    // AppsSearchState
    setAppsSearchQuery: (state: AppState, { payload }: PayloadAction<string | undefined>) => {
      state.search.query = payload
    },
    setAppsSearchResult: (state: AppState, { payload }: PayloadAction<AppDetails[]>) => {
      state.search.result = payload
    },
    resetAppsSearchState: (state: AppState) => {
      state.search.query = undefined
      state.search.result = []
    },
  },
})

export const {
  setDisplayAllApps,
  setDisplaySettings,
  setMenuAppDetails,
  setDisplayAppMenu,
  setDisplaySortableFavoriteApps,
  setDisplaySortablePinnedApps,
  setDisplaySortableTemporaryPinnedApps,
  setAppsSearchQuery,
  setAppsSearchResult,
  resetAppsSearchState,
} = appStateSlice.actions

export const toogleAllApps = createAction('appState/toogleAllApps')
export const appLaunch = createAction<{ renderedIn: RenderedIn; appDetails: AppDetails }>('appState/appLaunch')
export const appLaunchFromSearch = createAction('appState/appLaunchFromSearch')
export const sortFavoriteApps = createAction('appState/sortFavoriteApps')
export const sortPinnedApps = createAction('appState/sortPinnedApps')
export const sortTemporaryPinnedApps = createAction('appState/sortTemporaryPinnedApps')

export const selectAppState = (state: RootState) => state.appState
export const selectDisplayAllApps = (state: RootState) => state.appState.displayAllApps
export const selectDisplaySettings = (state: RootState) => state.appState.displaySettings
export const selectMenuAppDetails = (state: RootState) => state.appState.menuAppDetails
export const selectDisplayAppMenu = (state: RootState) => state.appState.displayAppMenu
export const selectDisplaySortableFavoriteApps = (state: RootState) => state.appState.displaySortableFavoriteApps
export const selectDisplaySortablePinnedApps = (state: RootState) => state.appState.displaySortablePinnedApps
export const selectDisplaySortableTemporaryPinnedApps = (state: RootState) => state.appState.displaySortableTemporaryPinnedApps
export const selectAppsSearchQuery = (state: RootState) => state.appState.search.query
export const selectAppsSearchResult = (state: RootState) => state.appState.search.result

export default appStateSlice.reducer
