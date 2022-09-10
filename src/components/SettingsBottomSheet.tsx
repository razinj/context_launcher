// React
import React, { useContext, useMemo } from 'react'
// React Native
import { Pressable, PressableAndroidRippleConfig, StyleSheet, Switch, Text, View } from 'react-native'
// Components
import SettingsItemLabel from './SettingsItemLabel'
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
// Icon
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
// Utils
import { showAppDetails } from '../utils/appsModule'
// Constants
import { CONTEXT_LAUNCHER_APP_ID, PRIMARY_HEX_COLOR } from '../constants'

const activeSwitch = PRIMARY_HEX_COLOR
const inActiveSwitch = '#f4f3f4'
const switchTrackColor = { false: '#e5e5e5', true: '#e5e5e5' }

const appInfoIconRippleConfig: PressableAndroidRippleConfig = {
  borderless: true,
  foreground: true,
  color: '#e5e5e5',
  radius: 18,
}

const settingItemButtonRippleConfig: PressableAndroidRippleConfig = {
  borderless: false,
  foreground: true,
  color: '#e5e5e5',
}

const SettingsBottomSheet = () => {
  const dispatch = useDispatch()
  const { settingsBottomSheetRef, toggleSortableFavoriteApps } = useContext(GlobalContext)
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
      <BottomSheetModal ref={settingsBottomSheetRef} snapPoints={snapPoints} style={styles.bottomSheetModal}>
        {/* Settings wrapper */}
        <View style={styles.settingsWrapper}>
          {/* Header wrapper */}
          <View style={styles.headerWrapper}>
            <Text style={styles.headerTitle}>Context Settings</Text>
            <Pressable
              onPress={() => showAppDetails(CONTEXT_LAUNCHER_APP_ID)}
              android_disableSound={true}
              android_ripple={appInfoIconRippleConfig}>
              <Icon name='information-outline' size={34} color='#808080' />
            </Pressable>
          </View>

          {/* Settings */}
          {/* Recent apps switch */}
          <View style={styles.itemContainer}>
            <SettingsItemLabel title='Display recent apps' />
            <Switch
              value={displayRecentAppsValue}
              onValueChange={toggleDisplayRecentApps}
              trackColor={switchTrackColor}
              thumbColor={displayRecentAppsValue ? activeSwitch : inActiveSwitch}
            />
          </View>
          {/* Favorite apps switch */}
          <View style={styles.itemContainer}>
            <SettingsItemLabel title='Display favorite apps' />
            <Switch
              value={displayFavoriteAppsValue}
              onValueChange={toggleDisplayFavoriteApps}
              trackColor={switchTrackColor}
              thumbColor={displayFavoriteAppsValue ? activeSwitch : inActiveSwitch}
            />
          </View>
          {/* Sort favorite apps */}
          <View style={styles.itemContainer}>
            <Pressable
              style={styles.buttonItemPressable}
              onPress={toggleSortableFavoriteApps}
              android_disableSound={true}
              android_ripple={settingItemButtonRippleConfig}>
              <SettingsItemLabel title='Sort favorite apps' description='Click to activate sorting view' />
            </Pressable>
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
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  buttonItemPressable: {
    flex: 1,
  },
  headerWrapper: {
    paddingBottom: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 20,
    color: '#808080',
    fontWeight: '400',
  },
  bottomSheetModal: {
    marginHorizontal: 5,
  },
})

export default SettingsBottomSheet
