import { GlobalContextType, SearchContextType } from '../../src/models/context'

export const initialStoreState = {
  appsList: {
    list: [],
  },
  appsSearch: {
    query: undefined,
    result: [],
  },
  favoriteApps: {
    list: [],
  },
  preferences: {
    displayFavoriteApps: false,
    displayRecentApps: false,
  },
  recentApps: {
    list: [],
  },
}

export const defaultGlobalContextValue: GlobalContextType = {
  dismissKeyboard: jest.fn(),
  globalAppLaunchProcedure: jest.fn(),
  displayAllApps: false,
  hideAllApps: jest.fn(),
  toggleDisplayAllApps: jest.fn(),
  sortableFavoriteApps: false,
  toggleSortableFavoriteApps: jest.fn(),
  appItemMenuBottomSheetRef: null,
  displayAppItemMenuBottomSheet: jest.fn(),
  appItemMenuDetails: null,
  setAppItemMenuDetails: jest.fn(),
  settingsBottomSheetRef: null,
  displaySettingsBottomSheet: jest.fn(),
}

export const defaultSearchContextValue: SearchContextType = {
  searchInputRef: null,
  invalidCharacters: false,
  setInvalidCharacters: jest.fn(),
  searchAppLaunchProcedure: jest.fn(),
}
