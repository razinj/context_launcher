// Redux
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
// Models
import { RootState } from '../store'
import { AppDetails } from '../models/app-details'

export interface AppsSearchState {
  query: string | undefined
  result: AppDetails[]
}

const initialState: AppsSearchState = {
  query: undefined,
  result: [],
}

export const appsSearchSlice = createSlice({
  name: 'appsSearch',
  initialState,
  reducers: {
    setAppsSearchQuery: (state: AppsSearchState, action: PayloadAction<string | undefined>) => {
      state.query = action.payload
    },
    setAppsSearchResult: (state: AppsSearchState, action: PayloadAction<AppDetails[]>) => {
      state.result = action.payload
    },
    resetAppsSearchState: (state: AppsSearchState) => {
      if (state.query || state.result.length > 0) {
        state.query = undefined
        state.result = []
      }
    },
  },
})

export const { setAppsSearchQuery, setAppsSearchResult, resetAppsSearchState } = appsSearchSlice.actions

export const selectAppsSearchQuery = (state: RootState) => state.appsSearch.query
export const selectAppsSearchResult = (state: RootState) => state.appsSearch.result

export default appsSearchSlice.reducer
