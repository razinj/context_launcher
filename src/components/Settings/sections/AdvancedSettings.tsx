import React from 'react'
import { Pressable, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { getAppsListAction } from '../../../slices/appsList'
import { resetPreferences } from '../../../slices/preferences'
import { displayToast } from '../../../utils/toast'
import SettingsItemLabel from '../shared/SettingsItemLabel'
import { settingItemButtonRippleConfig, settingItemWrapperStyle, settingsPressableItemStyle } from '../shared/values'

const AdvancedSettings = () => {
  const dispatch = useDispatch()

  const reloadAllApps = () => {
    dispatch(getAppsListAction())
    displayToast('All apps reloaded successfully!')
  }

  const onResetPreferences = () => {
    dispatch(resetPreferences())
    displayToast('Settings reset successfully!')
  }

  return (
    <>
      <View style={settingItemWrapperStyle}>
        <Pressable
          testID='reload-all-apps-button'
          onPress={reloadAllApps}
          android_disableSound={true}
          android_ripple={settingItemButtonRippleConfig}
          style={settingsPressableItemStyle}>
          <SettingsItemLabel title='Reload all apps' />
        </Pressable>
      </View>

      <View style={settingItemWrapperStyle}>
        <Pressable
          testID='reset-preferences-button'
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
