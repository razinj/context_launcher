import AsyncStorage from '@react-native-async-storage/async-storage'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  createMigrate,
  FLUSH,
  MigrationManifest,
  PAUSE,
  PERSIST,
  PersistConfig,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './rootSaga'
import appsListReducer from './slices/appsList'
import appStateReducer from './slices/appState'
import FavoriteAppsReducer from './slices/favoriteApps'
import pinnedAppsReducer from './slices/pinnedApps'
import preferencesReducer from './slices/preferences'
import recentAppsReducer from './slices/recentApps'

export const rootReducer = combineReducers({
  appsList: appsListReducer,
  recentApps: recentAppsReducer,
  favoriteApps: FavoriteAppsReducer,
  preferences: preferencesReducer,
  pinnedApps: pinnedAppsReducer,
  appState: appStateReducer,
})

const migrations: MigrationManifest = {
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

const persistConfig: PersistConfig<any> = {
  key: 'root',
  debug: false,
  version: 4,
  storage: AsyncStorage,
  blacklist: ['appState'],
  migrate: createMigrate(migrations, { debug: false }),
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
