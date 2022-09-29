// Redux
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
// Models
import { RootState } from '../store'

export interface PreferencesState {
  displayRecentApps: boolean
  displayFavoriteApps: boolean
  displayAppsIcons: boolean
}

const initialState: PreferencesState = {
  displayRecentApps: true,
  displayFavoriteApps: true,
  displayAppsIcons: true,
}

export const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    displayRecentApps: (state: PreferencesState, { payload }: PayloadAction<boolean>) => {
      state.displayRecentApps = payload
    },
    displayFavoriteApps: (state: PreferencesState, { payload }: PayloadAction<boolean>) => {
      state.displayFavoriteApps = payload
    },
    displayAppsIcons: (state: PreferencesState, { payload }: PayloadAction<boolean>) => {
      state.displayAppsIcons = payload
    },
  },
})

export const { displayRecentApps, displayFavoriteApps, displayAppsIcons } = preferencesSlice.actions

const selectDisplayRecentApps = (state: RootState) => state.preferences.displayRecentApps
const selectDisplayFavoriteApps = (state: RootState) => state.preferences.displayFavoriteApps
const selectDisplayAppsIcons = (state: RootState) => state.preferences.displayAppsIcons

export const selectDisplayRecentAppsMemoized = createSelector(selectDisplayRecentApps, (value: boolean) => value)
export const selectDisplayFavoriteAppsMemoized = createSelector(selectDisplayFavoriteApps, (value: boolean) => value)
export const selectDisplayAppsIconsMemoized = createSelector(selectDisplayAppsIcons, (value: boolean) => value)

export default preferencesSlice.reducer
