// React
import React, { useContext, useMemo } from 'react'
// React Native
import { StyleSheet, Switch, Text, View } from 'react-native'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import {
  displayFavoriteApps,
  displayRecentApps,
  selectDisplayFavoriteAppsMemoized,
  selectDisplayRecentAppsMemoized,
} from '../slices/preferences'
// Contexts
import GlobalContext from '../contexts/GlobalContext'
// BottomSheet
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'

const switchTrackColor = { false: '#ccc', true: '#ccc' }

const SettingsBottomSheet = () => {
  const dispatch = useDispatch()
  const { settingsBottomSheetRef, sortableFavoriteApps, toggleSortableFavoriteApps } = useContext(GlobalContext)
  const displayRecentAppsValue = useSelector(selectDisplayRecentAppsMemoized)
  const displayFavoriteAppsValue = useSelector(selectDisplayFavoriteAppsMemoized)

  const toggleDisplayRecentApps = () => {
    dispatch(displayRecentApps(!displayRecentAppsValue))
  }

  const toggleDisplayFavoriteApps = () => {
    dispatch(displayFavoriteApps(!displayFavoriteAppsValue))
  }

  const snapPoints = useMemo(() => ['25%', '50%'], [])

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal ref={settingsBottomSheetRef} snapPoints={snapPoints} style={{ marginHorizontal: 5 }}>
        <View style={styles.settingsWrapper}>
          <View style={{ marginBottom: 20 }}>
            <Text style={{ color: '#808080', fontSize: 20, fontWeight: '400' }}>Context Settings</Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.itemLabel}>Display recent apps</Text>
            <Switch
              value={displayRecentAppsValue}
              onValueChange={toggleDisplayRecentApps}
              trackColor={switchTrackColor}
              thumbColor={displayRecentAppsValue ? '#05445E' : '#f4f3f4'}
            />
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.itemLabel}>Display favorite apps</Text>
            <Switch
              value={displayFavoriteAppsValue}
              onValueChange={toggleDisplayFavoriteApps}
              trackColor={switchTrackColor}
              thumbColor={displayFavoriteAppsValue ? '#05445E' : '#f4f3f4'}
            />
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.itemLabel}>Sort favorite apps</Text>
            <Switch
              value={sortableFavoriteApps}
              onValueChange={toggleSortableFavoriteApps}
              trackColor={switchTrackColor}
              thumbColor={!sortableFavoriteApps ? '#05445E' : '#f4f3f4'}
            />
          </View>
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  )
}

const styles = StyleSheet.create({
  settingsWrapper: {
    paddingHorizontal: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemLabel: {
    color: '#808080',
  },
})

export default SettingsBottomSheet
