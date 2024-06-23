import React from 'react'
import { View } from 'react-native'
import { useDispatch } from 'react-redux'
import { getAppsListAction } from '../../../slices/appsList'
import { resetPreferences } from '../../../slices/preferences'
import { displayToast } from '../../../utils/toast'
import CustomPressable from '../../shared/CustomPressable'
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
        <CustomPressable
          testID='reload-all-apps-button'
          onPress={reloadAllApps}
          android_ripple={settingItemButtonRippleConfig}
          style={settingsPressableItemStyle}>
          <SettingsItemLabel title='Reload all apps' />
        </CustomPressable>
      </View>

      <View style={settingItemWrapperStyle}>
        <CustomPressable
          testID='reset-preferences-button'
          onPress={onResetPreferences}
          android_ripple={settingItemButtonRippleConfig}
          style={settingsPressableItemStyle}>
          <SettingsItemLabel title='Reset settings' />
        </CustomPressable>
      </View>
    </>
  )
}

export default AdvancedSettings
