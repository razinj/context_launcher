import { SearchContextType } from '../../src/contexts/SearchContext'
import { AppDetails } from '../../src/models/app-details'
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

export const apps: AppDetails[] = [
  {
    name: 'App 1',
    packageName: 'com.app_1',
    icon: 'ICON',
  },
  {
    name: 'App 2',
    packageName: 'com.app_2',
    icon: 'ICON',
  },
  {
    name: 'Brave',
    packageName: 'com.brave',
    icon: 'ICON',
  },
  {
    name: 'Chrome',
    packageName: 'com.chrome',
    icon: 'ICON',
  },
  {
    name: 'Clock',
    packageName: 'com.clock',
    icon: 'ICON',
  },
  {
    name: 'Google',
    packageName: 'com.google',
    icon: 'ICON',
  },
  {
    name: 'Maps',
    packageName: 'com.maps',
    icon: 'ICON',
  },
  {
    name: 'Youtube',
    packageName: 'com.youtube',
    icon: 'ICON',
  },
  {
    name: '_App',
    packageName: 'com._app',
    icon: 'ICON',
  },
]

export const getAppsForTests = (numberOfElements: number): AppDetails[] => {
  return apps.slice(0, numberOfElements)
}

export const getAppForTestsByName = (name: string): AppDetails | undefined => {
  return apps.find((app: AppDetails) => app.name === name)
}
