import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RecentApp } from '../models/recent-app'
import { RootState } from '../store'
import { getAppIndex } from '../utils/apps'

export interface RecentAppsState {
  list: RecentApp[]
}

const initialState: RecentAppsState = {
  list: [],
}

export const recentAppsSlice = createSlice({
  name: 'recentApps',
  initialState,
  reducers: {
    addRecentApp: (state: RecentAppsState, { payload }: PayloadAction<RecentApp>) => {
      const list = state.list.filter(({ packageName }: RecentApp) => packageName !== payload.packageName)

      // Put most recent app first
      list.unshift({ ...payload, icon: payload.icon })

      // Keep only 5 elements
      if (list.length > 5) list.pop()

      state.list = list
    },
    removeRecentApp: (state: RecentAppsState, { payload }: PayloadAction<string>) => {
      const foundAppIndex = getAppIndex(state.list, payload)

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

export const selectRecentAppsMemoized = createSelector(selectRecentApps, (list: RecentApp[]) => list)

export default recentAppsSlice.reducer
