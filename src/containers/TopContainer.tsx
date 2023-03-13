// React
import { useContext } from 'react'
// React Native
import { StyleSheet, View } from 'react-native'
// Redux
import { useSelector } from 'react-redux'
import { selectAppsSearchQuery } from '../slices/appsSearch'
import {
  selectDisplayFavoriteAppsMemoized,
  selectDisplayPinnedAppsMemoized,
  selectDisplayRecentAppsMemoized,
  selectDisplayTemporaryPinnedAppsMemoized,
} from '../slices/preferences'
// Components
import AllApps from '../components/AllApps'
import RecentApps from '../components/RecentApps'
import FavoriteApps from '../components/FavoriteApps'
import FilteredApps from '../components/FilteredApps'
import SortableFavoriteApps from '../components/SortableFavoriteApps'
import PinnedApps from '../components/PinnedApps'
import TemporarliyPinnedApps from '../components/TemporaryPinnedApps'
// Hooks
import { useTimeBasedRendering } from '../hooks/useTimeBasedRendering'
// Contexts
import GlobalContext from '../contexts/GlobalContext'

const TopContainer = () => {
  const searchQuery = useSelector(selectAppsSearchQuery)
  const displayRecentApps = useSelector(selectDisplayRecentAppsMemoized)
  const displayPinnedApps = useSelector(selectDisplayPinnedAppsMemoized)
  const displayTemporaryPinnedApps = useSelector(selectDisplayTemporaryPinnedAppsMemoized)
  const displayFavoriteApps = useSelector(selectDisplayFavoriteAppsMemoized)
  const { displayAllApps, sortableFavoriteApps } = useContext(GlobalContext)
  const canRender = useTimeBasedRendering()

  return (
    <View style={styles.wrapper}>
      {/* Display all apps */}
      {displayAllApps && <AllApps />}

      {/* Display filtered apps while searching */}
      {!displayAllApps && searchQuery && <FilteredApps />}

      {/* Hide recent & favourite apps while searching */}
      {!displayAllApps &&
        !searchQuery &&
        (displayRecentApps || displayFavoriteApps || displayPinnedApps || displayTemporaryPinnedApps) && (
          <>
            {/* Recent apps */}
            {displayRecentApps && (
              <View style={styles.commonWrapper}>
                <RecentApps />
              </View>
            )}

            {/* Pinned apps */}
            {displayTemporaryPinnedApps && canRender && (
              <View style={styles.commonWrapper}>
                <TemporarliyPinnedApps />
              </View>
            )}
            {displayPinnedApps && (
              <View style={styles.commonWrapper}>
                <PinnedApps />
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
    marginBottom: 5,
    justifyContent: 'flex-end',
  },
  commonWrapper: {
    marginTop: 5,
  },
})

export default TopContainer
