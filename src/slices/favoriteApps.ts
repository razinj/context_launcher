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
      if (state.list.length >= 5) return

      const existingApp = state.list.find((app: FavoriteApp) => app.appDetails.name === action.payload.name)

      // Add to list only if it doesn't exists
      // TODO: Add order through the action payload
      if (!existingApp) state.list.push({ appDetails: action.payload, order: 1 })
    },
    removeFavoriteApp: (state: FavoriteAppsState, action: PayloadAction<string>) => {
      const list = state.list

      // Payload should be the package name
      const foundAppIndex = list.findIndex((app: FavoriteApp) => app.appDetails.name === action.payload)

      if (foundAppIndex === -1) console.error('App not found in favorite apps list')

      list.splice(foundAppIndex, 1)
    },
  },
})

export const { addFavoriteApp, removeFavoriteApp } = favoriteAppsSlice.actions

const selectFavoriteApps = (state: RootState) => state.favoriteApps.list

export const selectFavoriteAppsMemoized = createSelector(selectFavoriteApps, (list: FavoriteApp[]) => {
  return list.slice().sort((appOne: FavoriteApp, appTwo: FavoriteApp) => appOne.order - appTwo.order)
})

export default favoriteAppsSlice.reducer
