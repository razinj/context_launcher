// Redux
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
// Models
import { RootState } from '../store'
import { RecentAppDetails, RecentAppDetailsOptionalIcon } from '../models/recent-app'

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
    addRecentApp: (state: RecentAppsState, { payload }: PayloadAction<RecentAppDetailsOptionalIcon>) => {
      // Don't add app without icon
      if (!payload.icon) return

      const list = state.list.filter(({ name }: RecentAppDetails) => name !== payload.name)

      // Put most recent app first
      list.unshift({ ...payload, icon: payload.icon })

      // Keep only 5 elements
      if (list.length > 5) list.pop()

      state.list = list
    },
    removeRecentApp: (state: RecentAppsState, { payload }: PayloadAction<string>) => {
      const foundAppIndex = state.list.findIndex(({ name }: RecentAppDetails) => name === payload)

      if (foundAppIndex === -1) return

      state.list.splice(foundAppIndex, 1)
    },
    clearRecentApps: (state: RecentAppsState) => {
      state.list = []
    },
  },
})

export const { addRecentApp, removeRecentApp, clearRecentApps } = recentAppsSlice.actions

const selectRecentApps = (state: RootState) => state.recentApps.list

export const selectRecentAppsMemoized = createSelector(selectRecentApps, (list: RecentAppDetails[]) => list)

export default recentAppsSlice.reducer
