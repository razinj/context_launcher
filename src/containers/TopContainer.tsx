// React
import React, { useContext } from 'react'
// React Native
import { StyleSheet, View } from 'react-native'
// Redux
import { useSelector } from 'react-redux'
import { selectAppsSearchQuery } from '../slices/appsSearch'
import { selectDisplayFavoriteAppsMemoized, selectDisplayRecentAppsMemoized } from '../slices/preferences'
// Components
import AllApps from '../components/BetaAlphabetList'
import RecentApps from '../components/RecentApps'
import FavoriteApps from '../components/FavoriteApps'
import FilteredApps from '../components/FilteredApps'
import SortableFavoriteApps from '../components/SortableFavoriteApps'
// Contexts
import GlobalContext from '../contexts/GlobalContext'

const TopContainer = () => {
  const { displayAllApps, sortableFavoriteApps } = useContext(GlobalContext)

  const searchQuery = useSelector(selectAppsSearchQuery)
  const displayRecentApps = useSelector(selectDisplayRecentAppsMemoized)
  const displayFavoriteApps = useSelector(selectDisplayFavoriteAppsMemoized)

  return (
    <View style={styles.wrapper}>
      {/* Display all apps */}
      {displayAllApps && <AllApps />}

      {/* Display filtered apps while searching */}
      {!displayAllApps && searchQuery && <FilteredApps />}

      {/* Hide recent & favourite apps while searching */}
      {!displayAllApps && !searchQuery && (displayRecentApps || displayFavoriteApps) && (
        <>
          {/* Recent apps */}
          {displayRecentApps && (
            <View style={styles.commonWrapper}>
              <RecentApps />
            </View>
          )}

          {/* Favorite apps */}
          {displayFavoriteApps && !sortableFavoriteApps && (
            <View style={styles.commonWrapper}>
              <FavoriteApps />
            </View>
          )}
          {displayFavoriteApps && sortableFavoriteApps && (
            <View style={styles.commonWrapper}>
              <SortableFavoriteApps />
            </View>
          )}
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginBottom: 5,
    justifyContent: 'flex-end',
  },
  commonWrapper: {
    marginTop: 5,
  },
})

export default TopContainer
