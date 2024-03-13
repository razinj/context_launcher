import { MigrationManifest } from 'redux-persist'

export const migrations: MigrationManifest = {
  2: (state: any) => {
    return {
      ...state,
      preferences: {
        displayRecentApps: true,
        displayFavoriteApps: true,
      },
    }
  },
  3: (state: any) => {
    return {
      ...state,
      pinnedApps: {
        list: [],
        temporaryAppsConfig: {
          startDate: undefined,
          endDate: undefined,
        },
      },
      preferences: {
        ...state.preferences,
        displayPinnedApps: true,
        displayTemporaryPinnedApps: false,
      },
    }
  },
  4: (state: any) => {
    const localState = { ...state }
    delete localState.appsSearch

    return {
      ...localState,
      appsList: {
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
        search: {
          query: undefined,
          result: [],
        },
      },
    }
  },
}
