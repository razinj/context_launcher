import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RecentApp } from '../models/recent-app'
import { RootState } from '../store'
import { getAppIndexByPackageName } from '../utils/apps'

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
      // Get the list without the payload's app (to eliminate duplicates)
      const list = state.list.filter(
        ({ packageName, name }: RecentApp) => packageName !== payload.packageName && name !== payload.name
      )

      // Put most recent app first
      list.unshift({ ...payload })

      // Keep only 5 apps in the list
      if (list.length > 5) list.pop()

      state.list = list
    },
    removeRecentApp: (state: RecentAppsState, { payload: packageName }: PayloadAction<string>) => {
      let foundAppIndex = getAppIndexByPackageName(state.list, packageName)

      while (foundAppIndex !== -1) {
        state.list.splice(foundAppIndex, 1)
        foundAppIndex = getAppIndexByPackageName(state.list, packageName)
      }
    },
    removeRecentApps: (state: RecentAppsState, { payload: packageNames }: PayloadAction<string[]>) => {
      for (const packageName of packageNames) {
        let foundAppIndex = getAppIndexByPackageName(state.list, packageName)

        while (foundAppIndex !== -1) {
          state.list.splice(foundAppIndex, 1)
          foundAppIndex = getAppIndexByPackageName(state.list, packageName)
        }
      }
    },
    clearRecentApps: (state: RecentAppsState) => {
      state.list = []
    },
  },
})

export const { addRecentApp, removeRecentApp, removeRecentApps, clearRecentApps } = recentAppsSlice.actions

const selectRecentApps = (state: RootState) => state.recentApps.list

export const selectRecentAppsMemoized = createSelector(selectRecentApps, (list: RecentApp[]) => list)

export default recentAppsSlice.reducer
