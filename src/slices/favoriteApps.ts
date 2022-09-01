// Redux
import { createSelector, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
// Models
import { RootState } from '../store'
import { FavoriteApp, FavoriteAppDetails } from '../models/favorite-app'

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
    addFavoriteApp: (state: FavoriteAppsState, action: PayloadAction<FavoriteAppDetails>) => {
      if (state.list.length == 5) return

      const existingApp = state.list.find((app: FavoriteApp) => app.appDetails.name === action.payload.name)

      // Add to list only if it doesn't exists
      // TODO: Add order through the action payload
      if (!existingApp) state.list.push({ appDetails: action.payload, order: 1 })
    },
    removeFavoriteApp: (state: FavoriteAppsState, action: PayloadAction<string>) => {
      const foundAppIndex = state.list.findIndex((app: FavoriteApp) => app.appDetails.name === action.payload)

      if (foundAppIndex === -1) return

      state.list.splice(foundAppIndex, 1)
    },
    setFavoriteApps: (state: FavoriteAppsState, action: PayloadAction<FavoriteApp[]>) => {
      state.list = action.payload
    },
  },
})

export const { addFavoriteApp, removeFavoriteApp, setFavoriteApps } = favoriteAppsSlice.actions

const selectFavoriteApps = (state: RootState) => state.favoriteApps.list

export const selectFavoriteAppsMemoized = createSelector(selectFavoriteApps, (list: FavoriteApp[]) => {
  return [...list].sort((appOne: FavoriteApp, appTwo: FavoriteApp) => appOne.order - appTwo.order)
})

export default favoriteAppsSlice.reducer
