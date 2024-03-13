import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FavoriteApp } from '../models/favorite-app'
import { RootState } from '../store'
import { getAppByPackageNameAndName, getAppIndexByPackageName } from '../utils/apps'

export interface FavoriteAppsState {
  list: FavoriteApp[]
}

const initialState: FavoriteAppsState = {
  list: [],
}

export const favoriteAppsSlice = createSlice({
  name: 'favoriteApps',
  initialState,
  reducers: {
    addFavoriteApp: (state: FavoriteAppsState, { payload }: PayloadAction<FavoriteApp>) => {
      if (state.list.length === 5) return

      // Add to list only if it doesn't exists
      if (!getAppByPackageNameAndName(state.list, payload.packageName, payload.name)) {
        state.list.push({ ...payload })
      }
    },
    removeFavoriteApp: (state: FavoriteAppsState, { payload: packageName }: PayloadAction<string>) => {
      let foundAppIndex = getAppIndexByPackageName(state.list, packageName)

      while (foundAppIndex !== -1) {
        state.list.splice(foundAppIndex, 1)
        foundAppIndex = getAppIndexByPackageName(state.list, packageName)
      }
    },
    removeFavoriteApps: (state: FavoriteAppsState, { payload: packageNames }: PayloadAction<string[]>) => {
      for (const packageName of packageNames) {
        let foundAppIndex = getAppIndexByPackageName(state.list, packageName)

        while (foundAppIndex !== -1) {
          state.list.splice(foundAppIndex, 1)
          foundAppIndex = getAppIndexByPackageName(state.list, packageName)
        }
      }
    },
    setFavoriteApps: (state: FavoriteAppsState, { payload }: PayloadAction<FavoriteApp[]>) => {
      state.list = payload
    },
    clearFavoriteApps: (state: FavoriteAppsState) => {
      state.list = []
    },
  },
})

export const { addFavoriteApp, removeFavoriteApp, removeFavoriteApps, setFavoriteApps, clearFavoriteApps } =
  favoriteAppsSlice.actions

const selectFavoriteApps = (state: RootState) => state.favoriteApps.list

export const selectFavoriteAppsMemoized = createSelector(selectFavoriteApps, (list: FavoriteApp[]) => list)
export const selectFavoriteAppsCountMemoized = createSelector(selectFavoriteApps, (list: FavoriteApp[]) => list.length)

export default favoriteAppsSlice.reducer
