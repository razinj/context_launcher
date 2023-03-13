// React
import React from 'react'
// React Native
import { Pressable, View } from 'react-native'
// Components
import SettingsItemLabel from '../shared/SettingsItemLabel'
// Redux
import { useDispatch } from 'react-redux'
import { setAppsList } from '../../../slices/appsList'
import { resetPreferences } from '../../../slices/preferences'
// Native modules
import AppsModule from '../../../native-modules/AppsModule'
// Utils
import { displayToast } from '../../../utils/toast'
// Models
import { AppDetails } from '../../../models/app-details'
// Constants
import { settingItemButtonRippleConfig, settingItemWrapperStyle, settingsPressableItemStyle } from '../shared/values'

const AdvancedSettings = () => {
  const dispatch = useDispatch()

  const reloadAllApps = () => {
    AppsModule.getApplications((applications: string) => {
      const apps = JSON.parse(applications) as AppDetails[]

      dispatch(setAppsList(apps))
      displayToast('All apps reloaded successfully!')
    })
  }

  const onResetPreferences = () => {
    dispatch(resetPreferences())
    displayToast('Settings reset successfully!')
  }

  return (
    <>
      <View style={settingItemWrapperStyle}>
        <Pressable
          testID='advanced-settings-reload-all-apps-button'
          onPress={reloadAllApps}
          android_disableSound={true}
          android_ripple={settingItemButtonRippleConfig}
          style={settingsPressableItemStyle}>
          <SettingsItemLabel title='Reload all apps' />
        </Pressable>
      </View>

      <View style={settingItemWrapperStyle}>
        <Pressable
          testID='advanced-settings-reset-preferences-button'
          onPress={onResetPreferences}
          android_disableSound={true}
          android_ripple={settingItemButtonRippleConfig}
          style={settingsPressableItemStyle}>
          <SettingsItemLabel title='Reset settings' />
        </Pressable>
      </View>
    </>
  )
}

export default AdvancedSettings
