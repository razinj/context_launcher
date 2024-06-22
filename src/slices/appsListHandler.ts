import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeLatest } from 'redux-saga/effects'
import { AppDetails } from '../models/app-details'
import AppsModule from '../native-modules/AppsModule'
import { appRemovedAction, getAppsListAction, setAppsList, setAppsLoading } from './appsList'
import { removeFavoriteApp } from './favoriteApps'
import { removePinnedApp } from './pinnedApps'
import { removeRecentApp } from './recentApps'
import { displayToast } from '../utils/toast'

function* getAppsListActionHandler() {
  try {
    yield put(setAppsLoading(true))
    displayToast('Getting apps list')
    const applications: string = yield call(AppsModule.getApplications)
    const apps = JSON.parse(applications) as AppDetails[]
    displayToast('Done getting apps list')
    yield put(setAppsList(apps))
    yield put(setAppsLoading(false))
  } catch (error: unknown) {
    yield put(setAppsList([]))
    console.error('Error getting apps list:', error)
  }
}

function* appRemovedActionHandler(action: PayloadAction<string>) {
  yield put(removeRecentApp(action.payload))
  yield put(
    removePinnedApp({ app: { packageName: action.payload, icon: 'NO_ICON', name: 'NO_NAME' }, isPermanent: true })
  )
  yield put(
    removePinnedApp({ app: { packageName: action.payload, icon: 'NO_ICON', name: 'NO_NAME' }, isPermanent: false })
  )
  yield put(removeFavoriteApp(action.payload))
}

export function* appsListSagas() {
  yield takeLatest(getAppsListAction.type, getAppsListActionHandler)
  yield takeLatest(appRemovedAction.type, appRemovedActionHandler)
}
