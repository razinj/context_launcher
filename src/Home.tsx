// React
import React, { useContext, useEffect, useState } from 'react'
// React Native
import { View, StyleSheet } from 'react-native'
// Redux
import { useDispatch } from 'react-redux'
import { setAppsList } from './slices/appsList'
import { removeRecentApp } from './slices/recentApps'
import { removeFavoriteApp } from './slices/favoriteApps'
// Components
import TopContainer from './containers/TopContainer'
import BottomContainer from './containers/BottomContainer'
// Contexts
import GlobalContext, { GlobalContextType } from './contexts/GlobalContext'
import SearchContext, { SearchContextType } from './contexts/SearchContext'
// Custom hooks
import { useBackHandler } from './hooks/useBackHandler'
import { usePackageChange } from './hooks/usePackageChange'
// Native modules
import AppsModule from './native-modules/AppsModule'
// Models
import { AppDetails } from './models/app-details'

const initialLoadValue = 'INITIAL_LOAD'

const Home = () => {
  const dispatch = useDispatch()
  const [packageChanged, setPackageChanged] = useState<string>(initialLoadValue)
  const { searchInputRef } = useContext<SearchContextType>(SearchContext)
  const { displayAllApps, toggleDisplayAllApps } = useContext<GlobalContextType>(GlobalContext)

  useEffect(() => {
    if (packageChanged !== initialLoadValue) {
      dispatch(removeRecentApp(packageChanged))
      dispatch(removeFavoriteApp(packageChanged))
    }

    AppsModule.getApplications((applications: string) => {
      const localApps: AppDetails[] = JSON.parse(applications)

      dispatch(
        setAppsList(
          [...localApps].sort((appOne: AppDetails, appTwo: AppDetails) => appOne.label.localeCompare(appTwo.label))
        )
      )
    })
  }, [packageChanged])

  useBackHandler(() => {
    if (displayAllApps) toggleDisplayAllApps()
    if (searchInputRef?.current?.isFocused()) searchInputRef?.current?.blur()

    return true
  })

  usePackageChange((packageName: string) => setPackageChanged(packageName))

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
