import { SearchContextType } from '../../src/contexts/SearchContext'
import { RootState } from '../../src/store'

export const APP_ID = 'com.razinj.context_launcher'

export const initialStoreState: RootState = {
  appsList: {
    list: [],
  },
  favoriteApps: {
    list: [],
  },
  preferences: {
    displayRecentApps: true,
    displayFavoriteApps: true,
    displayPinnedApps: false,
    displayTemporaryPinnedApps: false,
  },
  recentApps: {
    list: [],
  },
  pinnedApps: {
    list: [],
    temporarily: [],
    temporaryAppsConfig: {
      startDate: undefined,
      endDate: undefined,
    },
  },
  appState: {
    displayAllApps: false,
    displaySettings: false,
    menuAppDetails: undefined,
    displayAppMenu: false,
    displaySortableFavoriteApps: false,
    displaySortablePinnedApps: false,
    displaySortableTemporaryPinnedApps: false,
    search: {
      query: undefined,
      result: [],
    },
  },
}

export const defaultSearchContextValue: SearchContextType = {
  searchInputRef: null,
  clearSearchInput: jest.fn(),
  searchAppLaunchProcedure: jest.fn(),
}
