// Redux
import { configureStore, combineReducers } from '@reduxjs/toolkit'
// Reducers
import appsListReducer from './slices/appsList'
import appsSearchReducer from './slices/appsSearch'
import recentAppsReducer from './slices/recentApps'
import FavoriteAppsReducer from './slices/favoriteApps'
import preferencesReducer from './slices/preferences'
// Storage
import AsyncStorage from '@react-native-async-storage/async-storage'
// Redux Persist
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  createMigrate,
} from 'redux-persist'

export const rootReducer = combineReducers({
  appsList: appsListReducer,
  appsSearch: appsSearchReducer,
  recentApps: recentAppsReducer,
  favoriteApps: FavoriteAppsReducer,
  preferences: preferencesReducer,
})

const migrations = {
  2: (state: any) => {
    return {
      ...state,
      preferences: {
        displayRecentApps: true,
        displayFavoriteApps: true,
      },
    }
  },
}

const persistConfig = {
  key: 'root',
  version: 2,
  storage: AsyncStorage,
  migrate: createMigrate(migrations, { debug: false }),
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
