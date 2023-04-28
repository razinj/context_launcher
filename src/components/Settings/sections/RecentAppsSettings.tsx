import React from 'react'
import { Pressable, Switch, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { displayRecentApps, selectDisplayRecentAppsMemoized } from '../../../slices/preferences'
import { clearRecentApps } from '../../../slices/recentApps'
import { displayToast } from '../../../utils/toast'
import SettingsItemLabel from '../shared/SettingsItemLabel'
import {
  activeSwitch,
  inActiveSwitch,
  settingItemButtonRippleConfig,
  settingItemWrapperStyle,
  settingsPressableItemStyle,
  switchTrackColor,
} from '../shared/values'

const RecentAppsSettings = () => {
  const dispatch = useDispatch()
  const displayRecentAppsValue = useSelector(selectDisplayRecentAppsMemoized)

  const toggleDisplayRecentApps = () => {
    dispatch(displayRecentApps(!displayRecentAppsValue))
  }

  const onClearRecentApps = () => {
    dispatch(clearRecentApps())
    displayToast('Recent apps cleared successfully!')
  }

  return (
    <>
      <View style={settingItemWrapperStyle}>
        <SettingsItemLabel title='Display' />
        <Switch
          testID='display-switch'
          value={displayRecentAppsValue}
          onValueChange={toggleDisplayRecentApps}
          trackColor={switchTrackColor}
          thumbColor={displayRecentAppsValue ? activeSwitch : inActiveSwitch}
        />
      </View>

      <View style={settingItemWrapperStyle}>
        <Pressable
          testID='clear-button'
          onPress={onClearRecentApps}
          android_disableSound={true}
          android_ripple={settingItemButtonRippleConfig}
          style={settingsPressableItemStyle}>
          <SettingsItemLabel title='Clear' />
        </Pressable>
      </View>
    </>
  )
}

export default RecentAppsSettings
