// Redux
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
// Models
import { RootState } from '../store'
import { PinnedApp, PinnedAppsState, TemporaryPinnedAppsConfig } from '../models/pinned-app'

const initialState: PinnedAppsState = {
  list: [],
  temporaryAppsConfig: {
    startDate: undefined,
    endDate: undefined,
  },
}

export const pinnedAppsSlice = createSlice({
  name: 'pinnedApps',
  initialState,
  reducers: {
    updateOrRemovePinnedApp: (state: PinnedAppsState, { payload }: PayloadAction<PinnedApp>) => {
      const foundAppIndex = state.list.findIndex(({ name }: PinnedApp) => name === payload.name)

      // Add if no entry is found
      if (foundAppIndex === -1) {
        state.list.push({ ...payload })
        return
      }

      // Get pinned app object
      const foundApp = state.list.find(({ name }: PinnedApp) => name === payload.name)

      // Remove if entry is not pinned permanently and temporarily
      if (!foundApp?.isPermanent && !foundApp?.isTemporary) {
        state.list.splice(foundAppIndex, 1)
        return
      }

      // Update changed values
      state.list.splice(foundAppIndex, 1, { ...foundApp, ...payload })
    },
    clearPinnedApps: (state: PinnedAppsState) => {
      state.list = []
    },
    setTemporaryAppsConfig: (state: PinnedAppsState, { payload }: PayloadAction<TemporaryPinnedAppsConfig>) => {
      state.temporaryAppsConfig = { ...payload }
    },
  },
})

export const { updateOrRemovePinnedApp, setTemporaryAppsConfig, clearPinnedApps } = pinnedAppsSlice.actions

const selectPinnedApps = (state: RootState) => state.pinnedApps.list
const selectTemporaryPinnedAppsConfig = (state: RootState) => state.pinnedApps.temporaryAppsConfig

export const selectAllPinnedAppsMemoized = createSelector(selectPinnedApps, (list: PinnedApp[]) => list)
export const selectPinnedAppsMemoized = createSelector(selectPinnedApps, (list: PinnedApp[]) =>
  list.filter((pinnedApp: PinnedApp) => pinnedApp.isPermanent)
)
export const selectTemporaryPinnedAppsMemoized = createSelector(selectPinnedApps, (list: PinnedApp[]) =>
  list.filter((pinnedApp: PinnedApp) => pinnedApp.isTemporary)
)
export const selectTemporaryPinnedAppsConfigMemoized = createSelector(
  selectTemporaryPinnedAppsConfig,
  (config: TemporaryPinnedAppsConfig) => config
)

export default pinnedAppsSlice.reducer
