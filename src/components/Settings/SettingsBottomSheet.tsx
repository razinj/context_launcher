// React
import React, { useContext, useMemo, useState } from 'react'
// React Native
import { Pressable, PressableAndroidRippleConfig, StyleSheet, Switch, Text, View } from 'react-native'
// Components
import AdvancedSettings from './AdvancedSettings'
import SettingsItemLabel from './SettingsItemLabel'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import {
  displayFavoriteApps,
  displayRecentApps,
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
import { showAppDetails } from '../../utils/apps-module'
// Constants
import {
  PRIMARY_HEX_COLOR,
  CONTEXT_LAUNCHER_APP_ID,
  CONTEXT_LAUNCHER_APP_VERSION,
  CONTEXT_LAUNCHER_APP_BUILD_NUMBER,
} from '../../constants'

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
  const { dismissKeyboard, settingsBottomSheetRef, toggleSortableFavoriteApps } = useContext(GlobalContext)
  const [displayAdvancedSettings, setDisplayAdvancedSettings] = useState(false)

  const toggleDisplayRecentApps = () => {
    dispatch(displayRecentApps(!displayRecentAppsValue))
  }

  const toggleDisplayFavoriteApps = () => {
    dispatch(displayFavoriteApps(!displayFavoriteAppsValue))
  }

  const onFavoriteAppsSortViewClick = () => {
    dismissKeyboard()
    toggleSortableFavoriteApps()
  }

  const onAppInfoClick = () => {
    showAppDetails(CONTEXT_LAUNCHER_APP_ID)
    settingsBottomSheetRef?.current?.dismiss()
  }

  const favoriteAppsSortDisabled = useMemo(
    () => favoriteAppsCount <= 1 || !displayFavoriteAppsValue,
    [favoriteAppsCount, displayFavoriteAppsValue]
  )

  const toggleAdvancedSettings = (value: boolean = !displayAdvancedSettings) => {
    setDisplayAdvancedSettings(value)
  }

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        onDismiss={() => toggleAdvancedSettings(false)}
        ref={settingsBottomSheetRef}
        snapPoints={['25%', '50%', '75%', '90%']}
        style={styles.bottomSheetModal}>
        {/* Settings wrapper */}
        <View style={styles.settingsWrapper} testID='settings-bottom-sheet-wrapper'>
          {/* Header wrapper */}
          <View style={styles.headerWrapper} testID='settings-bottom-sheet-header-wrapper'>
            <Text style={styles.headerTitle}>
              Context Settings
              <Text style={styles.appInfoText}>
                &nbsp;&nbsp;v{CONTEXT_LAUNCHER_APP_VERSION} ({CONTEXT_LAUNCHER_APP_BUILD_NUMBER})
              </Text>
            </Text>
            <Pressable
              onPress={onAppInfoClick}
              android_disableSound={true}
              android_ripple={appInfoIconRippleConfig}
              testID='settings-bottom-sheet-header-app-info-button'>
              <Icon name='information-outline' size={34} color='#808080' />
            </Pressable>
          </View>

          {/* Settings */}
          {/* Recent apps switch */}
          <View style={styles.itemContainer}>
            <SettingsItemLabel title='Display recent apps' />
            <Switch
              testID='settings-bottom-display-recent-apps-switch'
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
              testID='settings-bottom-display-favorite-apps-switch'
              value={displayFavoriteAppsValue}
              onValueChange={toggleDisplayFavoriteApps}
              trackColor={switchTrackColor}
              thumbColor={displayFavoriteAppsValue ? activeSwitch : inActiveSwitch}
            />
          </View>
          {/* Sort favorite apps */}
          <View style={styles.itemContainer}>
            <Pressable
              testID='settings-bottom-sort-favorite-apps-button'
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
          {/* Advanced settings wrapper */}
          <>
            {/* Toggle advanced settings */}
            <View style={styles.itemContainer}>
              <Pressable
                testID='settings-bottom-toggle-advanced-settings-button'
                onPress={() => toggleAdvancedSettings()}
                android_disableSound={true}
                android_ripple={settingItemButtonRippleConfig}
                style={styles.buttonItemPressable}>
                <SettingsItemLabel title='Toggle advanced settings' />
                <Icon name={`chevron-${displayAdvancedSettings ? 'up' : 'down'}`} size={30} color='#808080' />
              </Pressable>
            </View>

            {/* Advanced settings */}
            {displayAdvancedSettings && <AdvancedSettings />}
          </>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  appInfoText: {
    color: '#ccc',
    fontSize: 12,
  },
})

export default SettingsBottomSheet
