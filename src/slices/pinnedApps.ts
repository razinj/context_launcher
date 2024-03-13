import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PinnedApp, PinnedAppsState, TemporaryPinnedAppsConfig } from '../models/pinned-app'
import { RootState } from '../store'
import { getAppIndexByPackageName, getAppIndexByPackageNameAndName } from '../utils/apps'

const initialState: PinnedAppsState = {
  list: [],
  temporarily: [], // Temporarily pinned apps
  temporaryAppsConfig: {
    startDate: undefined,
    endDate: undefined,
  },
}

export const pinnedAppsSlice = createSlice({
  name: 'pinnedApps',
  initialState,
  reducers: {
    addPinnedApp: (state: PinnedAppsState, { payload }: PayloadAction<{ app: PinnedApp; isPermanent: boolean }>) => {
      const { app, isPermanent } = payload

      if (isPermanent) {
        const foundAppIndex = getAppIndexByPackageNameAndName(state.list, app.packageName, app.name)

        if (foundAppIndex !== -1) return

        state.list.push({ ...app })
      } else {
        const foundAppIndex = getAppIndexByPackageNameAndName(state.temporarily, app.packageName, app.name)

        if (foundAppIndex !== -1) return

        state.temporarily.push({ ...app })
      }
    },
    removePinnedApp: (state: PinnedAppsState, { payload }: PayloadAction<{ app: PinnedApp; isPermanent: boolean }>) => {
      if (payload.isPermanent) {
        let foundAppIndex = getAppIndexByPackageName(state.list, payload.app.packageName)

        while (foundAppIndex !== -1) {
          state.list.splice(foundAppIndex, 1)
          foundAppIndex = getAppIndexByPackageName(state.list, payload.app.packageName)
        }
      } else {
        let foundAppIndex = getAppIndexByPackageName(state.temporarily, payload.app.packageName)

        while (foundAppIndex !== -1) {
          state.temporarily.splice(foundAppIndex, 1)
          foundAppIndex = getAppIndexByPackageName(state.temporarily, payload.app.packageName)
        }
      }
    },
    removePinnedApps: (
      state: PinnedAppsState,
      { payload: { packageNames, isPermanent } }: PayloadAction<{ packageNames: string[]; isPermanent: boolean }>
    ) => {
      if (isPermanent) {
        for (const packageName of packageNames) {
          let foundAppIndex = getAppIndexByPackageName(state.list, packageName)

          while (foundAppIndex !== -1) {
            state.list.splice(foundAppIndex, 1)
            foundAppIndex = getAppIndexByPackageName(state.list, packageName)
          }
        }
      } else {
        for (const packageName of packageNames) {
          let foundAppIndex = getAppIndexByPackageName(state.temporarily, packageName)

          while (foundAppIndex !== -1) {
            state.temporarily.splice(foundAppIndex, 1)
            foundAppIndex = getAppIndexByPackageName(state.temporarily, packageName)
          }
        }
      }
    },
    clearPinnedApps: (state: PinnedAppsState, { payload }: PayloadAction<{ temporarily: boolean }>) => {
      if (payload.temporarily) state.temporarily = []
      else state.list = []
    },
    setTemporaryAppsConfig: (state: PinnedAppsState, { payload }: PayloadAction<TemporaryPinnedAppsConfig>) => {
      state.temporaryAppsConfig = { ...payload }
    },
    setPinnedApps: (
      state: PinnedAppsState,
      { payload }: PayloadAction<{ apps: PinnedApp[]; isPermanent: boolean }>
    ) => {
      if (payload.isPermanent) state.list = payload.apps
      else state.temporarily = payload.apps
    },
  },
})

export const {
  addPinnedApp,
  removePinnedApp,
  removePinnedApps,
  setTemporaryAppsConfig,
  clearPinnedApps,
  setPinnedApps,
} = pinnedAppsSlice.actions

const selectPinnedApps = (state: RootState) => state.pinnedApps.list
const selecttTemporaryPinnedApps = (state: RootState) => state.pinnedApps.temporarily
const selectTemporaryPinnedAppsConfig = (state: RootState) => state.pinnedApps.temporaryAppsConfig

export const selectPinnedAppsMemoized = createSelector(selectPinnedApps, (list: PinnedApp[]) => list)
export const selectPinnedAppsCountMemoized = createSelector(selectPinnedApps, (list: PinnedApp[]) => list.length)
export const selectTemporaryPinnedAppsMemoized = createSelector(selecttTemporaryPinnedApps, (list: PinnedApp[]) => list)
export const selectTemporaryPinnedAppsCountMemoized = createSelector(
  selecttTemporaryPinnedApps,
  (list: PinnedApp[]) => list.length
)
export const selectTemporaryPinnedAppsConfigMemoized = createSelector(
  selectTemporaryPinnedAppsConfig,
  (config: TemporaryPinnedAppsConfig) => config
)

export default pinnedAppsSlice.reducer
