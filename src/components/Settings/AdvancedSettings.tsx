// React
import React from 'react'
// React Native
import { Pressable, PressableAndroidRippleConfig, StyleSheet, ToastAndroid, View } from 'react-native'
// Components
import SettingsItemLabel from './SettingsItemLabel'
// Redux
import { useDispatch } from 'react-redux'
import { setAppsList } from '../../slices/appsList'
import { resetRecentApps } from '../../slices/recentApps'
import { resetPreferences } from '../../slices/preferences'
import { resetFavoriteApps } from '../../slices/favoriteApps'
// Native modules
import AppsModule from '../../native-modules/AppsModule'
// Analytics
import perf from '@react-native-firebase/perf'
import analytics from '@react-native-firebase/analytics'
// Models
import { AppDetails } from '../../models/app-details'

const settingItemButtonRippleConfig: PressableAndroidRippleConfig = {
  borderless: false,
  foreground: true,
  color: '#e5e5e5',
}

const AdvancedSettings = () => {
  const dispatch = useDispatch()

  const loadApps = async () => {
    const trace = await perf().startTrace('settings_apps_list_load')

    AppsModule.getApplications((applications: string) => {
      const apps = JSON.parse(applications) as AppDetails[]

      trace.putAttribute('apps_count', `${apps.length}`)

      dispatch(setAppsList(apps))
    })

    await trace.stop()
  }

  const reloadAllApps = async () => {
    await loadApps()
    displayToast('All apps reloaded successfully!')

    await analytics().logEvent('settings_reload_all_apps')
  }

  const onResetRecentApps = async () => {
    dispatch(resetRecentApps())
    displayToast('Recent apps reset successfully!')

    await analytics().logEvent('settings_reset_recent_apps')
  }

  const onResetFavoriteApps = async () => {
    dispatch(resetFavoriteApps())
    displayToast('Favorite apps reset successfully!')

    await analytics().logEvent('settings_reset_favorite_apps')
  }

  const onResetPreferences = async () => {
    dispatch(resetPreferences())
    displayToast('Settings reset successfully!')

    await analytics().logEvent('settings_reset_preferences')
  }

  const displayToast = (message: string, duration: number = ToastAndroid.LONG) => {
    ToastAndroid.show(message, duration)
  }

  return (
    <>
      {/* Reload all apps */}
      <View style={styles.itemContainer}>
        <Pressable
          onPress={reloadAllApps}
          android_disableSound={true}
          android_ripple={settingItemButtonRippleConfig}
          style={styles.buttonItemPressable}>
          <SettingsItemLabel title='Reload all apps' />
        </Pressable>
      </View>

      {/* Reset recent apps */}
      <View style={styles.itemContainer}>
        <Pressable
          onPress={onResetRecentApps}
          android_disableSound={true}
          android_ripple={settingItemButtonRippleConfig}
          style={styles.buttonItemPressable}>
          <SettingsItemLabel title='Reset recent apps' />
        </Pressable>
      </View>

      {/* Reset favorite apps */}
      <View style={styles.itemContainer}>
        <Pressable
          onPress={onResetFavoriteApps}
          android_disableSound={true}
          android_ripple={settingItemButtonRippleConfig}
          style={styles.buttonItemPressable}>
          <SettingsItemLabel title='Reset favorite apps' />
        </Pressable>
      </View>

      {/* Reset preferences */}
      <View style={styles.itemContainer}>
        <Pressable
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
