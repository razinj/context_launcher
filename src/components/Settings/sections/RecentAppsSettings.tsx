// React
import React from 'react'
// React Native
import { Pressable, Switch, View } from 'react-native'
// Components
import SettingsItemLabel from '../shared/SettingsItemLabel'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { clearRecentApps } from '../../../slices/recentApps'
import { selectDisplayRecentAppsMemoized, displayRecentApps } from '../../../slices/preferences'
// Utils
import { displayToast } from '../../../utils/toast'
// Constants
import {
  switchTrackColor,
  activeSwitch,
  inActiveSwitch,
  settingItemButtonRippleConfig,
  settingsPressableItemStyle,
  settingItemWrapperStyle,
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
          testID='settings-bottom-display-recent-apps-switch'
          value={displayRecentAppsValue}
          onValueChange={toggleDisplayRecentApps}
          trackColor={switchTrackColor}
          thumbColor={displayRecentAppsValue ? activeSwitch : inActiveSwitch}
        />
      </View>

      <View style={settingItemWrapperStyle}>
        <Pressable
          testID='advanced-settings-clear-recent-apps-button'
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
