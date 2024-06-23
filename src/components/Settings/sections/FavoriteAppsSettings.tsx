import React, { useMemo } from 'react'
import { Switch, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { sortFavoriteApps } from '../../../slices/appState'
import { clearFavoriteApps, selectFavoriteAppsCount } from '../../../slices/favoriteApps'
import { displayFavoriteApps, selectDisplayFavoriteApps } from '../../../slices/preferences'
import { displayToast } from '../../../utils/toast'
import CustomPressable from '../../shared/CustomPressable'
import SettingsItemLabel from '../shared/SettingsItemLabel'
import {
  activeSwitch,
  inActiveSwitch,
  settingItemButtonRippleConfig,
  settingItemWrapperStyle,
  settingsPressableItemStyle,
  switchTrackColor,
} from '../shared/values'

const FavoriteAppsSettings = () => {
  const dispatch = useDispatch()
  const favoriteAppsCount = useSelector(selectFavoriteAppsCount)
  const displayFavoriteAppsValue = useSelector(selectDisplayFavoriteApps)

  const toggleDisplayFavoriteApps = () => {
    dispatch(displayFavoriteApps(!displayFavoriteAppsValue))
  }

  const onFavoriteAppsSortViewClick = () => {
    dispatch(sortFavoriteApps())
  }

  const onClearFavoriteApps = () => {
    dispatch(clearFavoriteApps())
    displayToast('Favorite apps cleared successfully!')
  }

  const favoriteAppsSortDisabled = useMemo(
    () => favoriteAppsCount <= 1 || !displayFavoriteAppsValue,
    [favoriteAppsCount, displayFavoriteAppsValue]
  )

  return (
    <>
      <View style={settingItemWrapperStyle}>
        <SettingsItemLabel title='Display' />
        <Switch
          testID='display-switch'
          value={displayFavoriteAppsValue}
          onValueChange={toggleDisplayFavoriteApps}
          trackColor={switchTrackColor}
          thumbColor={displayFavoriteAppsValue ? activeSwitch : inActiveSwitch}
        />
      </View>

      <View style={settingItemWrapperStyle}>
        <CustomPressable
          testID='sort-button'
          disabled={favoriteAppsSortDisabled}
          onPress={onFavoriteAppsSortViewClick}
          android_ripple={settingItemButtonRippleConfig}
          style={[settingsPressableItemStyle, { opacity: favoriteAppsSortDisabled ? 0.5 : 1 }]}>
          <SettingsItemLabel
            title='Sort'
            description={
              favoriteAppsSortDisabled
                ? displayFavoriteAppsValue
                  ? 'Add more apps to be able to sort'
                  : 'Display favorite apps to be able to sort'
                : 'Click to start sorting'
            }
          />
        </CustomPressable>
      </View>

      <View style={settingItemWrapperStyle}>
        <CustomPressable
          testID='clear-button'
          onPress={onClearFavoriteApps}
          android_ripple={settingItemButtonRippleConfig}
          style={settingsPressableItemStyle}>
          <SettingsItemLabel title='Clear' />
        </CustomPressable>
      </View>
    </>
  )
}

export default FavoriteAppsSettings
