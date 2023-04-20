import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PinnedApp, PinnedAppsState, TemporaryPinnedAppsConfig } from '../models/pinned-app'
import { RootState } from '../store'
import { getAppIndex } from '../utils/apps'

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
      if (payload.isPermanent) {
        const foundAppIndex = getAppIndex(state.list, payload.app.packageName)

        if (foundAppIndex !== -1) return

        state.list.push({ ...payload.app })
      } else {
        const foundAppIndex = getAppIndex(state.temporarily, payload.app.packageName)

        if (foundAppIndex !== -1) return

        state.temporarily.push({ ...payload.app })
      }
    },
    removePinnedApp: (state: PinnedAppsState, { payload }: PayloadAction<{ app: PinnedApp; isPermanent: boolean }>) => {
      if (payload.isPermanent) {
        const foundAppIndex = getAppIndex(state.list, payload.app.packageName)

        if (foundAppIndex === -1) return

        state.list.splice(foundAppIndex, 1)
      } else {
        const foundAppIndex = getAppIndex(state.temporarily, payload.app.packageName)

        if (foundAppIndex === -1) return

        state.temporarily.splice(foundAppIndex, 1)
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

export const { addPinnedApp, removePinnedApp, setTemporaryAppsConfig, clearPinnedApps, setPinnedApps } =
  pinnedAppsSlice.actions

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
