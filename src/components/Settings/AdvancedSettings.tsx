// React
import React from 'react'
// React Native
import { Pressable, PressableAndroidRippleConfig, StyleSheet, ToastAndroid, View } from 'react-native'
// Components
import SettingsItemLabel from './SettingsItemLabel'
// Redux
import { useDispatch } from 'react-redux'
import { setAppsList } from '../../slices/appsList'
import { clearRecentApps } from '../../slices/recentApps'
import { resetPreferences } from '../../slices/preferences'
import { clearFavoriteApps } from '../../slices/favoriteApps'
// Native modules
import AppsModule from '../../native-modules/AppsModule'
// Models
import { AppDetails } from '../../models/app-details'

const settingItemButtonRippleConfig: PressableAndroidRippleConfig = {
  borderless: false,
  foreground: true,
  color: '#e5e5e5',
}

const AdvancedSettings = () => {
  const dispatch = useDispatch()

  const reloadAllApps = () => {
    AppsModule.getApplications((applications: string) => {
      const apps = JSON.parse(applications) as AppDetails[]

      dispatch(setAppsList(apps))
      displayToast('All apps reloaded successfully!')
    })
  }

  const onClearRecentApps = () => {
    dispatch(clearRecentApps())
    displayToast('Recent apps cleared successfully!')
  }

  const onClearFavoriteApps = () => {
    dispatch(clearFavoriteApps())
    displayToast('Favorite apps cleared successfully!')
  }

  const onResetPreferences = () => {
    dispatch(resetPreferences())
    displayToast('Settings reset successfully!')
  }

  const displayToast = (message: string, duration: number = ToastAndroid.LONG) => {
    ToastAndroid.show(message, duration)
  }

  return (
    <>
      {/* Reload all apps */}
      <View style={styles.itemContainer}>
        <Pressable
          testID='advanced-settings-reload-all-apps-button'
          onPress={reloadAllApps}
          android_disableSound={true}
          android_ripple={settingItemButtonRippleConfig}
          style={styles.buttonItemPressable}>
          <SettingsItemLabel title='Reload all apps' />
        </Pressable>
      </View>

      {/* Clear recent apps */}
      <View style={styles.itemContainer}>
        <Pressable
          testID='advanced-settings-clear-recent-apps-button'
          onPress={onClearRecentApps}
          android_disableSound={true}
          android_ripple={settingItemButtonRippleConfig}
          style={styles.buttonItemPressable}>
          <SettingsItemLabel title='Clear recent apps' />
        </Pressable>
      </View>

      {/* Clear favorite apps */}
      <View style={styles.itemContainer}>
        <Pressable
          testID='advanced-settings-clear-favorite-apps-button'
          onPress={onClearFavoriteApps}
          android_disableSound={true}
          android_ripple={settingItemButtonRippleConfig}
          style={styles.buttonItemPressable}>
          <SettingsItemLabel title='Clear favorite apps' />
        </Pressable>
      </View>

      {/* Reset preferences */}
      <View style={styles.itemContainer}>
        <Pressable
          testID='advanced-settings-reset-preferences-button'
          onPress={onResetPreferences}
          android_disableSound={true}
          android_ripple={settingItemButtonRippleConfig}
          style={styles.buttonItemPressable}>
          <SettingsItemLabel title='Reset settings' />
        </Pressable>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  buttonItemPressable: {
    flex: 1,
  },
})

export default AdvancedSettings
