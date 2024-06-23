import { createSlice, PayloadAction } from '@reduxjs/toolkit'
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

export const selectPinnedApps = (state: RootState) => state.pinnedApps.list
export const selectPinnedAppsCount = (state: RootState) => state.pinnedApps.list.length
export const selectTemporaryPinnedApps = (state: RootState) => state.pinnedApps.temporarily
export const selectTemporaryPinnedAppsCount = (state: RootState) => state.pinnedApps.temporarily.length
export const selectTemporaryPinnedAppsConfig = (state: RootState) => state.pinnedApps.temporaryAppsConfig

export default pinnedAppsSlice.reducer
