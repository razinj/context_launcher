// Redux
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
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
    setAppsSearchQuery: (state: AppsSearchState, { payload }: PayloadAction<string | undefined>) => {
      state.query = payload
    },
    setAppsSearchResult: (state: AppsSearchState, { payload }: PayloadAction<AppDetails[]>) => {
      state.result = payload
    },
    resetAppsSearchState: (state: AppsSearchState) => {
      if (!state.query && state.result.length == 0) return

      state.query = undefined
      state.result = []
    },
  },
})

export const { setAppsSearchQuery, setAppsSearchResult, resetAppsSearchState } = appsSearchSlice.actions

export const selectAppsSearchQuery = (state: RootState) => state.appsSearch.query
export const selectAppsSearchResult = (state: RootState) => state.appsSearch.result

export default appsSearchSlice.reducer
