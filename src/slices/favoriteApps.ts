import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FavoriteApp } from '../models/favorite-app'
import { RootState } from '../store'
import { getApp, getAppIndex } from '../utils/apps'

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
      if (!getApp(state.list, payload.packageName)) state.list.push({ ...payload })
    },
    removeFavoriteApp: (state: FavoriteAppsState, { payload }: PayloadAction<string>) => {
      const foundAppIndex = getAppIndex(state.list, payload)

      if (foundAppIndex === -1) return

      state.list.splice(foundAppIndex, 1)
    },
    setFavoriteApps: (state: FavoriteAppsState, { payload }: PayloadAction<FavoriteApp[]>) => {
      state.list = payload
    },
    clearFavoriteApps: (state: FavoriteAppsState) => {
      state.list = []
    },
  },
})

export const { addFavoriteApp, removeFavoriteApp, setFavoriteApps, clearFavoriteApps } = favoriteAppsSlice.actions

const selectFavoriteApps = (state: RootState) => state.favoriteApps.list

export const selectFavoriteAppsMemoized = createSelector(selectFavoriteApps, (list: FavoriteApp[]) => list)
export const selectFavoriteAppsCountMemoized = createSelector(selectFavoriteApps, (list: FavoriteApp[]) => list.length)

export default favoriteAppsSlice.reducer
