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

  const onResetRecentApps = () => {
    dispatch(resetRecentApps())
    displayToast('Recent apps reset successfully!')
  }

  const onResetFavoriteApps = () => {
    dispatch(resetFavoriteApps())
    displayToast('Favorite apps reset successfully!')
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
