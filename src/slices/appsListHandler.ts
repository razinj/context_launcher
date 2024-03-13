import { PayloadAction } from '@reduxjs/toolkit'
import { Channel, channel } from 'redux-saga'
import { call, fork, put, select, take, takeLatest } from 'redux-saga/effects'
import { AppDetails } from '../models/app-details'
import LauncherAppsModule from '../native-modules/LauncherAppsModule'
import { appRemovedAction, getAppsListAction, revalidateAppsLists, setAppsList } from './appsList'
import { removeFavoriteApp, removeFavoriteApps, selectFavoriteAppsMemoized } from './favoriteApps'
import {
  removePinnedApp,
  removePinnedApps,
  selectPinnedAppsMemoized,
  selectTemporaryPinnedAppsMemoized,
} from './pinnedApps'
import { removeRecentApp, removeRecentApps, selectRecentAppsMemoized } from './recentApps'

const notAvailable = 'NOT_AVAILABLE'

function* getAppsListActionHandler() {
  try {
    const applications: string = yield call(LauncherAppsModule.getApplications)
    const apps = JSON.parse(applications) as AppDetails[]
    yield put(setAppsList(apps))
  } catch (error: unknown) {
    yield put(setAppsList([]))
    console.error('Error getting apps list:', error)
  }
}

function* appRemovedActionHandler(action: PayloadAction<string>) {
  yield put(removeRecentApp(action.payload))
  const pinnedApp = { id: notAvailable, packageName: action.payload, name: notAvailable, icon: notAvailable }
  yield put(removePinnedApp({ app: pinnedApp, isPermanent: true })) // TODO: Check why I send an "app" inseatd of "packageName" for removal
  yield put(removePinnedApp({ app: pinnedApp, isPermanent: false }))
  yield put(removeFavoriteApp(action.payload))
}

// Revalidate all apps' lists
function* x() {
  console.log('x called')

  const applications: string = yield call(LauncherAppsModule.getApplications)
  const apps = JSON.parse(applications) as AppDetails[]
  yield put(setAppsList(apps))

  const appsPackageNames = apps.map(({ packageName }: AppDetails) => packageName)

  // Revalidate recent apps
  const recentApps: AppDetails[] = yield select(selectRecentAppsMemoized)
  yield put(
    removeRecentApps(
      recentApps
        .map(({ packageName }: AppDetails) => packageName)
        .filter(
          (packageName: string) => !appsPackageNames.some((appsPackageName: string) => appsPackageName === packageName)
        )
    )
  )

  // Revalidate favorite apps
  const favoriteApps: AppDetails[] = yield select(selectFavoriteAppsMemoized)
  yield put(
    removeFavoriteApps(
      favoriteApps
        .map(({ packageName }: AppDetails) => packageName)
        .filter(
          (packageName: string) => !appsPackageNames.some((appsPackageName: string) => appsPackageName === packageName)
        )
    )
  )

  // Revalidate pinned apps
  const pinnedApps: AppDetails[] = yield select(selectPinnedAppsMemoized)
  yield put(
    removePinnedApps({
      isPermanent: true,
      packageNames: pinnedApps
        .map(({ packageName }: AppDetails) => packageName)
        .filter(
          (packageName: string) => !appsPackageNames.some((appsPackageName: string) => appsPackageName === packageName)
        ),
    })
  )

  // Revalidate temporary pinned apps
  const temporaryPinnedApps: AppDetails[] = yield select(selectTemporaryPinnedAppsMemoized)
  yield put(
    removePinnedApps({
      isPermanent: false,
      packageNames: temporaryPinnedApps
        .map(({ packageName }: AppDetails) => packageName)
        .filter(
          (packageName: string) => !appsPackageNames.some((appsPackageName: string) => appsPackageName === packageName)
        ),
    })
  )
}

// const upsertAppsListChannel = channel()

// function* watchAppsListUpsert() {
//   while (true) {
//     type x = typeof setAppsList
//     const action: x = yield take(upsertAppsListChannel)
//     yield put(action)
//   }
// }

function getApplicationsV2Async() {
  return new Promise((resolve, reject) => {
    LauncherAppsModule.getApplicationsV2((applications: string) => {
      resolve(applications)
    })
  })
}

function* y() {
  console.log('y called')

  const applications: string = yield call(getApplicationsV2Async)
  yield call(handleApplications, applications)

  const apps = JSON.parse(applications) as AppDetails[]

  const appsPackageNames = apps.map(({ packageName }: AppDetails) => packageName)
  // const appsPackageNames: string[] = []

  // Revalidate recent apps
  const recentApps: AppDetails[] = yield select(selectRecentAppsMemoized)
  yield put(
    removeRecentApps(
      recentApps
        .map(({ packageName }: AppDetails) => packageName)
        .filter(
          (packageName: string) => !appsPackageNames.some((appsPackageName: string) => appsPackageName === packageName)
        )
    )
  )

  // Revalidate favorite apps
  const favoriteApps: AppDetails[] = yield select(selectFavoriteAppsMemoized)
  yield put(
    removeFavoriteApps(
      favoriteApps
        .map(({ packageName }: AppDetails) => packageName)
        .filter(
          (packageName: string) => !appsPackageNames.some((appsPackageName: string) => appsPackageName === packageName)
        )
    )
  )

  // Revalidate pinned apps
  const pinnedApps: AppDetails[] = yield select(selectPinnedAppsMemoized)
  yield put(
    removePinnedApps({
      isPermanent: true,
      packageNames: pinnedApps
        .map(({ packageName }: AppDetails) => packageName)
        .filter(
          (packageName: string) => !appsPackageNames.some((appsPackageName: string) => appsPackageName === packageName)
        ),
    })
  )

  // Revalidate temporary pinned apps
  const temporaryPinnedApps: AppDetails[] = yield select(selectTemporaryPinnedAppsMemoized)
  yield put(
    removePinnedApps({
      isPermanent: false,
      packageNames: temporaryPinnedApps
        .map(({ packageName }: AppDetails) => packageName)
        .filter(
          (packageName: string) => !appsPackageNames.some((appsPackageName: string) => appsPackageName === packageName)
        ),
    })
  )
}

function* handleApplications(applications: string) {
  console.log('handleApplications called')

  const apps = JSON.parse(applications) as AppDetails[]
  // dispatch an action here
  yield put(setAppsList(apps))
}

function* childSaga(channel: Channel<any>) {
  const applications: string = yield call(LauncherAppsModule.getApplications)
  const apps = JSON.parse(applications) as AppDetails[]
  // yield put(setAppsList(apps))
  // const result = yield call(someAsyncFunction);
  yield put(channel, apps) // Emit the result through the channel
}

function* z() {
  console.log('z called')

  const communicationChannel: Channel<AppDetails[]> = yield call(channel)
  yield fork(childSaga, communicationChannel)

  while (true) {
    const result: AppDetails[] = yield take(communicationChannel)
    console.log(' result: ', result.length)

    const appsPackageNames = result.map(({ packageName }: AppDetails) => packageName)
    // const appsPackageNames: string[] = []

    // Revalidate recent apps
    const recentApps: AppDetails[] = yield select(selectRecentAppsMemoized)
    yield put(
      removeRecentApps(
        recentApps
          .map(({ packageName }: AppDetails) => packageName)
          .filter(
            (packageName: string) =>
              !appsPackageNames.some((appsPackageName: string) => appsPackageName === packageName)
          )
      )
    )

    // Revalidate favorite apps
    const favoriteApps: AppDetails[] = yield select(selectFavoriteAppsMemoized)
    yield put(
      removeFavoriteApps(
        favoriteApps
          .map(({ packageName }: AppDetails) => packageName)
          .filter(
            (packageName: string) =>
              !appsPackageNames.some((appsPackageName: string) => appsPackageName === packageName)
          )
      )
    )

    // Revalidate pinned apps
    const pinnedApps: AppDetails[] = yield select(selectPinnedAppsMemoized)
    yield put(
      removePinnedApps({
        isPermanent: true,
        packageNames: pinnedApps
          .map(({ packageName }: AppDetails) => packageName)
          .filter(
            (packageName: string) =>
              !appsPackageNames.some((appsPackageName: string) => appsPackageName === packageName)
          ),
      })
    )

    // Revalidate temporary pinned apps
    const temporaryPinnedApps: AppDetails[] = yield select(selectTemporaryPinnedAppsMemoized)
    yield put(
      removePinnedApps({
        isPermanent: false,
        packageNames: temporaryPinnedApps
          .map(({ packageName }: AppDetails) => packageName)
          .filter(
            (packageName: string) =>
              !appsPackageNames.some((appsPackageName: string) => appsPackageName === packageName)
          ),
      })
    )

    // Use the result returned by the child saga
    // Non-blocking logic here

    // ...
  }

  console.log('done')
}

export function* appsListSagas() {
  yield takeLatest(getAppsListAction.type, getAppsListActionHandler)
  yield takeLatest(appRemovedAction.type, appRemovedActionHandler)
  // yield takeLatest(revalidateAppsLists.type, x)
  // yield takeLatest(revalidateAppsLists.type, z)
  yield takeLatest(revalidateAppsLists.type, z)
}
