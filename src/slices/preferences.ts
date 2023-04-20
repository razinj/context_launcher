import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface PreferencesState {
  displayRecentApps: boolean
  displayFavoriteApps: boolean
  displayPinnedApps: boolean
  displayTemporaryPinnedApps: boolean
}

const initialState: PreferencesState = {
  displayRecentApps: true,
  displayFavoriteApps: true,
  displayPinnedApps: true,
  displayTemporaryPinnedApps: false,
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
    displayPinnedApps: (state: PreferencesState, { payload }: PayloadAction<boolean>) => {
      state.displayPinnedApps = payload
    },
    displayTemporaryPinnedApps: (state: PreferencesState, { payload }: PayloadAction<boolean>) => {
      state.displayTemporaryPinnedApps = payload
    },
    resetPreferences: (state: PreferencesState) => {
      state.displayPinnedApps = initialState.displayPinnedApps
      state.displayRecentApps = initialState.displayRecentApps
      state.displayFavoriteApps = initialState.displayFavoriteApps
      state.displayTemporaryPinnedApps = initialState.displayTemporaryPinnedApps
    },
  },
})

export const {
  displayRecentApps,
  displayFavoriteApps,
  displayPinnedApps,
  displayTemporaryPinnedApps,
  resetPreferences,
} = preferencesSlice.actions

const selectDisplayRecentApps = (state: RootState) => state.preferences.displayRecentApps
const selectDisplayFavoriteApps = (state: RootState) => state.preferences.displayFavoriteApps
const selectDisplayPinnedApps = (state: RootState) => state.preferences.displayPinnedApps
const selectDisplayTemporaryPinnedApps = (state: RootState) => state.preferences.displayTemporaryPinnedApps

export const selectDisplayRecentAppsMemoized = createSelector(selectDisplayRecentApps, (value: boolean) => value)
export const selectDisplayFavoriteAppsMemoized = createSelector(selectDisplayFavoriteApps, (value: boolean) => value)
export const selectDisplayPinnedAppsMemoized = createSelector(selectDisplayPinnedApps, (value: boolean) => value)
export const selectDisplayTemporaryPinnedAppsMemoized = createSelector(
  selectDisplayTemporaryPinnedApps,
  (value: boolean) => value
)

export default preferencesSlice.reducer
