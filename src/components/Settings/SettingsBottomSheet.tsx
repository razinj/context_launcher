// React
import React, { useContext, useMemo } from 'react'
// React Native
import { Pressable, PressableAndroidRippleConfig, StyleSheet, Switch, Text, View } from 'react-native'
// Components
import AdvancedSettings from './AdvancedSettings'
import SettingsItemLabel from './SettingsItemLabel'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import {
  displayAppsIcons,
  displayFavoriteApps,
  displayRecentApps,
  selectDisplayAppsIconsMemoized,
  selectDisplayFavoriteAppsMemoized,
  selectDisplayRecentAppsMemoized,
} from '../../slices/preferences'
import { selectFavoriteAppsCountMemoized } from '../../slices/favoriteApps'
// Contexts
import GlobalContext from '../../contexts/GlobalContext'
// BottomSheet
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
// Icon
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
// Utils
import { showAppDetails } from '../../utils/appsModule'
// Constants
import { CONTEXT_LAUNCHER_APP_ID, PRIMARY_HEX_COLOR } from '../../constants'
// Analytics
import analytics from '@react-native-firebase/analytics'

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
  const favoriteAppsCount = useSelector(selectFavoriteAppsCountMemoized)
  const displayRecentAppsValue = useSelector(selectDisplayRecentAppsMemoized)
  const displayFavoriteAppsValue = useSelector(selectDisplayFavoriteAppsMemoized)
  const displayAppsIconsValue = useSelector(selectDisplayAppsIconsMemoized)
  const { dismissKeyboard, settingsBottomSheetRef, toggleSortableFavoriteApps } = useContext(GlobalContext)

  const toggleDisplayRecentApps = async () => {
    dispatch(displayRecentApps(!displayRecentAppsValue))

    await analytics().logEvent('toggle_display_recent_apps', { value: !displayRecentAppsValue })
  }

  const toggleDisplayFavoriteApps = async () => {
    dispatch(displayFavoriteApps(!displayFavoriteAppsValue))

    await analytics().logEvent('toggle_display_favorite_apps', { value: !displayFavoriteAppsValue })
  }

  const toggleDisplayAppsIcons = async () => {
    dispatch(displayAppsIcons(!displayAppsIconsValue))

    await analytics().logEvent('toggle_display_apps_icons', { value: !displayAppsIconsValue })
  }

  const onFavoriteAppsSortViewClick = async () => {
    dismissKeyboard()
    toggleSortableFavoriteApps()

    await analytics().logEvent('on_favorite_apps_sort_view_click')
  }

  const onAppInfoClick = async () => {
    showAppDetails(CONTEXT_LAUNCHER_APP_ID)

    await analytics().logEvent('on_app_info_click')
  }

  const favoriteAppsSortDisabled = useMemo(
    () => favoriteAppsCount <= 1 || !displayFavoriteAppsValue,
    [favoriteAppsCount, displayFavoriteAppsValue]
  )

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={settingsBottomSheetRef}
        snapPoints={['25%', '50%', '75%', '90%']}
        style={styles.bottomSheetModal}>
        {/* Settings wrapper */}
        <View style={styles.settingsWrapper}>
          {/* Header wrapper */}
          <View style={styles.headerWrapper}>
            <Text style={styles.headerTitle}>Context Settings</Text>
            <Pressable onPress={onAppInfoClick} android_disableSound={true} android_ripple={appInfoIconRippleConfig}>
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
          {/* Apps icons switch */}
          <View style={styles.itemContainer}>
            <SettingsItemLabel title='Display apps icons' />
            <Switch
              value={displayAppsIconsValue}
              onValueChange={toggleDisplayAppsIcons}
              trackColor={switchTrackColor}
              thumbColor={displayAppsIconsValue ? activeSwitch : inActiveSwitch}
            />
          </View>
          {/* Sort favorite apps */}
          <View style={styles.itemContainer}>
            <Pressable
              disabled={favoriteAppsSortDisabled}
              onPress={onFavoriteAppsSortViewClick}
              android_disableSound={true}
              android_ripple={settingItemButtonRippleConfig}
              style={[styles.buttonItemPressable, { opacity: favoriteAppsSortDisabled ? 0.5 : 1 }]}>
              <SettingsItemLabel
                title='Sort favorite apps'
                description={
                  favoriteAppsSortDisabled
                    ? displayFavoriteAppsValue
                      ? 'Add more favorite apps to be able to sort'
                      : 'Display favorite apps to be able to sort'
                    : 'Click to start sorting your favorite apps'
                }
              />
            </Pressable>
          </View>

          {/* Advanced settings */}
          <AdvancedSettings />
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
