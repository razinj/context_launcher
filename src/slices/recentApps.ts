// Redux
import { createSelector, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
// Models
import { RootState } from '../store'
import { RecentAppDetails } from '../models/recent-app'

export interface RecentAppsState {
  list: RecentAppDetails[]
}

const initialState: RecentAppsState = {
  list: [],
}

export const recentAppsSlice = createSlice({
  name: 'recentApps',
  initialState,
  reducers: {
    addRecentApp: (state: RecentAppsState, action: PayloadAction<RecentAppDetails>) => {
      const list = state.list.filter((recentApp: RecentAppDetails) => recentApp.name !== action.payload.name)

      // Put most recent app first
      list.unshift({ ...action.payload })

      // Keep only 5 elements
      if (list.length > 5) list.pop()

      state.list = list
    },
    removeRecentApp: (state: RecentAppsState, action: PayloadAction<string>) => {
      const foundAppIndex = state.list.findIndex((app: RecentAppDetails) => app.name === action.payload)

      if (foundAppIndex === -1) return

      state.list.splice(foundAppIndex, 1)
    },
  },
})

export const { addRecentApp, removeRecentApp } = recentAppsSlice.actions

const selectRecentApps = (state: RootState) => state.recentApps.list

export const selectRecentAppsMemoized = createSelector(selectRecentApps, (list: RecentAppDetails[]) => list)

export default recentAppsSlice.reducer
