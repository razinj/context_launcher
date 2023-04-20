import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import AllApps from '../components/AllApps'
import FavoriteApps from '../components/FavoriteApps'
import FilteredApps from '../components/FilteredApps'
import PinnedApps from '../components/PinnedApps'
import RecentApps from '../components/RecentApps'
import SortableFavoriteApps from '../components/SortableFavoriteApps'
import SortablePinnedApps from '../components/SortablePinnedApps'
import SortableTemporaryPinnedApps from '../components/SortableTemporaryPinnedApps'
import TemporarliyPinnedApps from '../components/TemporaryPinnedApps'
import { useTimeBasedRendering } from '../hooks/useTimeBasedRendering'
import {
  selectAppsSearchQuery,
  selectDisplayAllApps,
  selectDisplaySortableFavoriteApps,
  selectDisplaySortablePinnedApps,
  selectDisplaySortableTemporaryPinnedApps,
} from '../slices/appState'
import {
  selectDisplayFavoriteAppsMemoized,
  selectDisplayPinnedAppsMemoized,
  selectDisplayRecentAppsMemoized,
  selectDisplayTemporaryPinnedAppsMemoized,
} from '../slices/preferences'

const TopContainer = () => {
  const searchQuery = useSelector(selectAppsSearchQuery)
  const displayRecentApps = useSelector(selectDisplayRecentAppsMemoized)
  const displayPinnedApps = useSelector(selectDisplayPinnedAppsMemoized)
  const displayTemporaryPinnedApps = useSelector(selectDisplayTemporaryPinnedAppsMemoized)
  const displayFavoriteApps = useSelector(selectDisplayFavoriteAppsMemoized)
  const sortableFavoriteApps = useSelector(selectDisplaySortableFavoriteApps)
  const sortablePinnedApps = useSelector(selectDisplaySortablePinnedApps)
  const sortableTemporaryPinnedApps = useSelector(selectDisplaySortableTemporaryPinnedApps)
  const displayAllApps = useSelector(selectDisplayAllApps)
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
            {displayTemporaryPinnedApps && canRender && !sortableTemporaryPinnedApps && (
              <View style={styles.commonWrapper}>
                <TemporarliyPinnedApps />
              </View>
            )}
            {displayTemporaryPinnedApps && canRender && sortableTemporaryPinnedApps && (
              <View style={styles.commonWrapper}>
                <SortableTemporaryPinnedApps />
              </View>
            )}
            {displayPinnedApps && !sortablePinnedApps && (
              <View style={styles.commonWrapper}>
                <PinnedApps />
              </View>
            )}
            {displayPinnedApps && sortablePinnedApps && (
              <View style={styles.commonWrapper}>
                <SortablePinnedApps />
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
