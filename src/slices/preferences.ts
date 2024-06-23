import { createSlice, PayloadAction } from '@reduxjs/toolkit'
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

export const selectDisplayRecentApps = (state: RootState) => state.preferences.displayRecentApps
export const selectDisplayFavoriteApps = (state: RootState) => state.preferences.displayFavoriteApps
export const selectDisplayPinnedApps = (state: RootState) => state.preferences.displayPinnedApps
export const selectDisplayTemporaryPinnedApps = (state: RootState) => state.preferences.displayTemporaryPinnedApps

export default preferencesSlice.reducer
