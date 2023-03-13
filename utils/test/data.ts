// Models
import { GlobalContextType, SearchContextType } from '../../src/models/context'

export const CONTEXT_LAUNCHER_APP_ID = 'com.razinj.context_launcher'

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
    temporaryAppsConfig: {
      startDate: undefined,
      endDate: undefined,
    },
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
