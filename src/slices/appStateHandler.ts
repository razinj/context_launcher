import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, select, takeLatest } from 'redux-saga/effects'
import { AppDetails } from '../models/app-details'
import { FavoriteApp } from '../models/favorite-app'
import { PinnedApp } from '../models/pinned-app'
import { RenderedIn } from '../models/rendered-in'
import { launchApp } from '../utils/apps-module'
import { dismissKeyboard } from '../utils/keyboard'
import {
  appLaunch,
  appLaunchFromSearch,
  resetAppsSearchState,
  selectAppsSearchResult,
  selectDisplayAllApps,
  setDisplayAllApps,
  setDisplaySettings,
  setDisplaySortableFavoriteApps,
  setDisplaySortablePinnedApps,
  setDisplaySortableTemporaryPinnedApps,
  setMenuAppDetails,
  sortFavoriteApps,
  sortPinnedApps,
  sortTemporaryPinnedApps,
  toogleAllApps,
} from './appState'
import { selectFavoriteApps } from './favoriteApps'
import { selectPinnedApps } from './pinnedApps'
import { addRecentApp } from './recentApps'

// We should only add a launched app if it was clicked (rendered) in one of the following places;
const ADD_TO_RECENT_APPS_RENDERED_IN_VALUES = [RenderedIn.ALL_APPS, RenderedIn.FILTERED_APPS]

function* toggleAllAppsHandler() {
  const allAppsDisplayed: boolean = yield select(selectDisplayAllApps)
  yield put(setDisplayAllApps(!allAppsDisplayed))
}

function* appLaunchHandler(action: PayloadAction<{ renderedIn: RenderedIn; appDetails: AppDetails }>) {
  yield call(dismissKeyboard)
  yield put(resetAppsSearchState())
  yield put(setDisplayAllApps(false))
  yield put(setMenuAppDetails(undefined))
  yield put(setDisplaySettings(false))
  yield put(setDisplaySortableFavoriteApps(false))

  const { appDetails, renderedIn } = action.payload

  if (!ADD_TO_RECENT_APPS_RENDERED_IN_VALUES.includes(renderedIn)) {
    return
  }

  // Skip adding to recent apps if permanently pinned/favourited but launched from different lists/views
  const pinnedApps: PinnedApp[] = yield select(selectPinnedApps)
  const favoriteApps: FavoriteApp[] = yield select(selectFavoriteApps)
  // TODO: Include the temporarily pinned apps but only when they're rendered/displayed.

  const pinnedAppsPackages: string[] = pinnedApps.map(({ packageName }: PinnedApp) => packageName)
  const favoriteAppsPackages: string[] = favoriteApps.map(({ packageName }: FavoriteApp) => packageName)
  const allApps = new Set([...pinnedAppsPackages, ...favoriteAppsPackages])

  if (allApps.has(appDetails.packageName)) {
    return
  }

  // Otherwise add to recent apps
  yield put(addRecentApp(appDetails))
}

function* sortFavoriteAppsHandler() {
  yield put(setDisplaySettings(false))
  yield put(setDisplaySortableFavoriteApps(true))
}

function* sortPinnedAppsHandler() {
  yield put(setDisplaySettings(false))
  yield put(setDisplaySortablePinnedApps(true))
}

function* sortTemporaryPinnedAppsHandler() {
  yield put(setDisplaySettings(false))
  yield put(setDisplaySortableTemporaryPinnedApps(true))
}

function* appLaunchFromSearchHandler() {
  const searchResult: AppDetails[] = yield select(selectAppsSearchResult)
  if (searchResult.length === 0) {
    return
  }

  const appDetails = searchResult[0]

  yield call(launchApp, appDetails.packageName)
  yield put(appLaunch({ renderedIn: RenderedIn.FILTERED_APPS, appDetails }))
}

export function* appStateSaga() {
  yield takeLatest(toogleAllApps.type, toggleAllAppsHandler)
  yield takeLatest(appLaunch.type, appLaunchHandler)
  yield takeLatest(sortFavoriteApps.type, sortFavoriteAppsHandler)
  yield takeLatest(sortPinnedApps.type, sortPinnedAppsHandler)
  yield takeLatest(sortTemporaryPinnedApps.type, sortTemporaryPinnedAppsHandler)
  yield takeLatest(appLaunchFromSearch.type, appLaunchFromSearchHandler)
}
