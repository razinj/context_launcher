// Redux
import { createSelector, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
// Models
import { RootState } from '../store'

export interface PreferencesState {
  displayRecentApps: boolean
  displayFavoriteApps: boolean
}

const initialState: PreferencesState = {
  displayRecentApps: true,
  displayFavoriteApps: false,
}

export const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    displayRecentApps: (state: PreferencesState, action: PayloadAction<boolean>) => {
      state.displayRecentApps = action.payload
    },
    displayFavoriteApps: (state: PreferencesState, action: PayloadAction<boolean>) => {
      state.displayFavoriteApps = action.payload
    },
  },
})

export const { displayRecentApps, displayFavoriteApps } = preferencesSlice.actions

const selectDisplayRecentApps = (state: RootState) => state.preferences.displayRecentApps
const selectDisplayFavoriteApps = (state: RootState) => state.preferences.displayFavoriteApps

export const selectDisplayRecentAppsMemoized = createSelector(selectDisplayRecentApps, (value: boolean) => value)
export const selectDisplayFavoriteAppsMemoized = createSelector(selectDisplayFavoriteApps, (value: boolean) => value)

export default preferencesSlice.reducer
