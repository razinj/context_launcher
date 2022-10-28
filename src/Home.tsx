// React
import React, { useContext, useEffect, useState } from 'react'
// React Native
import { View, StyleSheet, StatusBar } from 'react-native'
// Redux
import { useDispatch } from 'react-redux'
import { setAppsList } from './slices/appsList'
import { removeRecentApp } from './slices/recentApps'
import { removeFavoriteApp } from './slices/favoriteApps'
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
// Models
import { AppDetails } from './models/app-details'
import { PackageChange } from './models/event'

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

  useEffect(() => {
    if (packageChanged.isRemoved && packageChanged.packageName !== initialLoadValue) {
      dispatch(removeRecentApp(packageChanged.packageName))
      dispatch(removeFavoriteApp(packageChanged.packageName))
    }

    AppsModule.getApplications((applications: string) => {
      dispatch(setAppsList(JSON.parse(applications) as AppDetails[]))
    })
  }, [packageChanged])

  useBackHandler(() => {
    hideAllApps()
    if (searchInputRef?.current?.isFocused()) searchInputRef?.current?.blur()

    // TODO: Read more about the return here: https://github.com/react-native-community/hooks#usebackhandler
    return true
  })

  usePackageChange((packageChange: PackageChange) => setPackageChanged(packageChange))

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
    marginTop: StatusBar.currentHeight,
    justifyContent: 'flex-end',
  },
})

export default Home
