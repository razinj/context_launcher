// React
import React, { useContext, useEffect, useState } from 'react'
// React Native
import { View, StyleSheet, Platform, PlatformAndroidStatic } from 'react-native'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { setAppsList } from './slices/appsList'
import { removeRecentApp } from './slices/recentApps'
import { removeFavoriteApp } from './slices/favoriteApps'
import { selectIdMemoized, selectIsFirebaseInfoSetMemoized, setIsFirebaseInfoSetValue } from './slices/global'
// Components
import TopContainer from './containers/TopContainer'
import BottomContainer from './containers/BottomContainer'
// Contexts
import GlobalContext from './contexts/GlobalContext'
import SearchContext from './contexts/SearchContext'
// Custom hooks
import { useBackHandler } from './hooks/useBackHandler'
import { usePackageChange } from './hooks/usePackageChange'
// Native modules
import AppsModule from './native-modules/AppsModule'
// Analytics
import perf from '@react-native-firebase/perf'
import analytics from '@react-native-firebase/analytics'
// Models
import { AppDetails } from './models/app-details'
import { PackageChange } from './models/event'
import { GlobalProperties } from './models/global-state'

const initialLoadValue = 'INITIAL_LOAD'
const packageChangedInitialValue = {
  packageName: initialLoadValue,
  isRemoved: false,
}

const Home = () => {
  const dispatch = useDispatch()
  const [packageChanged, setPackageChanged] = useState<PackageChange>(packageChangedInitialValue)
  const { hideAllApps } = useContext(GlobalContext)
  const { searchInputRef } = useContext(SearchContext)

  const id = useSelector(selectIdMemoized)
  const isFirebaseInfoSet = useSelector(selectIsFirebaseInfoSetMemoized)

  const loadApps = async () => {
    const trace = await perf().startTrace('apps_list_load')

    AppsModule.getApplications((applications: string) => {
      const apps = JSON.parse(applications) as AppDetails[]

      trace.putAttribute('apps_count', `${apps.length}`)

      dispatch(setAppsList(apps))
    })

    await trace.stop()
  }

  const removeAppFromLists = async () => {
    const trace = await perf().startTrace('app_removed')

    dispatch(removeRecentApp(packageChanged.packageName))
    dispatch(removeFavoriteApp(packageChanged.packageName))

    await trace.stop()
  }

  useEffect(() => {
    if (packageChanged.isRemoved && packageChanged.packageName !== initialLoadValue) {
      removeAppFromLists().catch(error => console.error(`Couldn't remove app from lists, error: `, error))
    }

    loadApps().catch(error => console.error(`Couldn't load apps list, error: `, error))
  }, [packageChanged])

  useBackHandler(() => {
    hideAllApps()
    if (searchInputRef?.current?.isFocused()) searchInputRef?.current?.blur()

    // TODO: Read more about the return here: https://github.com/react-native-community/hooks#usebackhandler
    return true
  })

  usePackageChange((packageChange: PackageChange) => setPackageChanged(packageChange))

  useEffect(() => {
    if (isFirebaseInfoSet) return

    const { reactNativeVersion, Version, Serial, Release, Fingerprint, Brand, Manufacturer, Model, uiMode } = (
      Platform as PlatformAndroidStatic
    ).constants
    const { major, minor, patch } = reactNativeVersion
    const properties: GlobalProperties = {
      os: Platform.OS,
      osVersion: Platform.Version.toString(),
      reactNativeVersion: `${major}.${minor}.${patch}`,
      isTesting: `${Platform.isTesting}`,
      uiMode,
      manufacturer: Manufacturer,
      brand: Brand,
      model: Model,
      serial: Serial,
      release: Release,
      fingerprint: Fingerprint,
      version: Version.toString(),
    }

    const setId = async () => analytics().setUserId(id)
    const setProperties = async () => analytics().setUserProperties(properties)

    setId().catch(error => console.error(`Couldn't set the user ID, error: `, error))
    setProperties().catch(error => console.error(`Couldn't set the user properties, error: `, error))

    dispatch(setIsFirebaseInfoSetValue())
  }, [])

  return (
    <View style={styles.wrapper}>
      <TopContainer />
      <BottomContainer />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 5,
    justifyContent: 'flex-end',
  },
})

export default Home
