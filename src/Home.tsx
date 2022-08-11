// React
import React, { useContext, useEffect, useState } from 'react'
// React Native
import { View, StyleSheet, NativeEventEmitter, NativeModules, StatusBar } from 'react-native'
// Redux
import { useDispatch, useSelector } from 'react-redux'
// Components
import AllApps from './components/AllApps'
import Search from './components/Search'
import FavoriteApps from './components/FavoriteApps'
import RecentApps from './components/RecentApps'
import FilteredApps from './components/FilteredApps'
import AllAppsIcon from './components/AllAppsIcon'
// Contexts
import GlobalContext from './contexts/GlobalContext'
import SearchContext, { SearchContextType } from './contexts/SearchContext'
// Custom hooks
import { useBackHandler } from './hooks/useBackHandler'
// Slices
import { setAppsList } from './slices/appsList'
import { selectAppsSearchQuery } from './slices/appsSearch'
import { selectDisplayFavoriteAppsMemoized, selectDisplayRecentAppsMemoized } from './slices/preferences'
// Native modules
import AppsModule from './native-modules/AppsModule'
// Icons
import Icon from 'react-native-vector-icons/MaterialIcons'
// Models
import { AppDetails } from './models/app-details'
import { PackageChange } from './models/props'

// TODO: Settings should be accessed also when someone search for "settings"

const Home = () => {
  const dispatch = useDispatch()
  const searchQuery = useSelector(selectAppsSearchQuery)
  const displayRecentApps = useSelector(selectDisplayRecentAppsMemoized)
  const displayFavoriteApps = useSelector(selectDisplayFavoriteAppsMemoized)
  const [reloadApps, setReloadApps] = useState<string | undefined>('INITIAL_LOAD')
  const { searchInputRef } = useContext<SearchContextType>(SearchContext)
  const { displayAllApps, toggleDisplayAllApps, toggleDisplaySettingsModal } = useContext(GlobalContext)

  useEffect(() => {
    setReloadApps(undefined)

    AppsModule.getApplications((applications: string) => {
      const localApps: AppDetails[] = JSON.parse(applications)

      dispatch(
        setAppsList(
          [...localApps].sort((appOne: AppDetails, appTwo: AppDetails) => appOne.label.localeCompare(appTwo.label))
        )
      )
    })
  }, [reloadApps])

  useEffect(() => {
    // TODO: Create a context to update the apps list
    // TODO: Remove this listener from this component (can it be a hook?)
    // TODO: After reloading the apps, check if the package is in recent or favorite apps and decide on it
    const eventEmitter = new NativeEventEmitter(NativeModules.AppsModule)
    const eventListener = eventEmitter.addListener('packageChange', ({ packageName }: PackageChange) => {
      setReloadApps(packageName)
    })

    return () => {
      eventListener.remove()
      eventEmitter.removeAllListeners('packageChange')
    }
  }, [])

  useBackHandler(() => {
    if (displayAllApps) toggleDisplayAllApps()
    if (searchInputRef?.current?.isFocused()) searchInputRef?.current?.blur()

    return true
  })

  return (
    <View style={styles.wrapper}>
      <View style={styles.topShitWrapper}>
        <Icon name='menu' size={25} color='#000' onPress={toggleDisplaySettingsModal} />
      </View>

      {/* Display filtered apps while searching */}
      {!displayAllApps && searchQuery && (
        <View style={styles.filteredAppsWrapper}>
          <FilteredApps />
        </View>
      )}

      {/* Hide recent and favourite apps while searching */}
      {!displayAllApps && !searchQuery && (displayRecentApps || displayFavoriteApps) && (
        <>
          {displayRecentApps && (
            <View style={styles.recentAppsWrapper}>
              <RecentApps />
            </View>
          )}

          {displayFavoriteApps && (
            <View style={styles.favoriteAppsWrapper}>
              <FavoriteApps />
            </View>
          )}
        </>
      )}

      {displayAllApps && (
        <View style={styles.allAppsWrapper}>
          <AllApps />
        </View>
      )}

      <View style={styles.searchWrapper}>
        <AllAppsIcon />
        <Search />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    marginTop: StatusBar.currentHeight,
    padding: 10,
    justifyContent: 'flex-end',
    position: 'relative',
  },
  searchWrapper: {
    marginVertical: 5,
    flexDirection: 'row',
  },
  favoriteAppsWrapper: {
    marginVertical: 5,
  },
  recentAppsWrapper: {
    marginVertical: 5,
  },
  filteredAppsWrapper: {
    marginBottom: 5,
    marginTop: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : undefined,
  },
  allAppsWrapper: {
    marginBottom: 5,
    marginTop: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : undefined,
  },
  topShitWrapper: {
    backgroundColor: '#fff',
    borderRadius: 50,
    position: 'absolute',
    top: StatusBar.currentHeight ? -StatusBar.currentHeight : 0,
    margin: 20,
    padding: 5,
    right: 0,
  },
})

export default Home
