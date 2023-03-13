// React
import React, { useContext, useMemo } from 'react'
// React Native
import { Pressable, Switch, View } from 'react-native'
// Components
import SettingsItemLabel from '../shared/SettingsItemLabel'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { clearFavoriteApps, selectFavoriteAppsCountMemoized } from '../../../slices/favoriteApps'
import { selectDisplayFavoriteAppsMemoized, displayFavoriteApps } from '../../../slices/preferences'
// Contexts
import GlobalContext from '../../../contexts/GlobalContext'
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

const FavoriteAppsSettings = () => {
  const dispatch = useDispatch()
  const favoriteAppsCount = useSelector(selectFavoriteAppsCountMemoized)
  const displayFavoriteAppsValue = useSelector(selectDisplayFavoriteAppsMemoized)
  const { dismissKeyboard, toggleSortableFavoriteApps } = useContext(GlobalContext)

  const toggleDisplayFavoriteApps = () => {
    dispatch(displayFavoriteApps(!displayFavoriteAppsValue))
  }

  const onFavoriteAppsSortViewClick = () => {
    dismissKeyboard()
    toggleSortableFavoriteApps()
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
          testID='settings-bottom-display-favorite-apps-switch'
          value={displayFavoriteAppsValue}
          onValueChange={toggleDisplayFavoriteApps}
          trackColor={switchTrackColor}
          thumbColor={displayFavoriteAppsValue ? activeSwitch : inActiveSwitch}
        />
      </View>

      <View style={settingItemWrapperStyle}>
        <Pressable
          testID='settings-bottom-sort-favorite-apps-button'
          disabled={favoriteAppsSortDisabled}
          onPress={onFavoriteAppsSortViewClick}
          android_disableSound={true}
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
        </Pressable>
      </View>

      <View style={settingItemWrapperStyle}>
        <Pressable
          testID='advanced-settings-clear-favorite-apps-button'
          onPress={onClearFavoriteApps}
          android_disableSound={true}
          android_ripple={settingItemButtonRippleConfig}
          style={settingsPressableItemStyle}>
          <SettingsItemLabel title='Clear' />
        </Pressable>
      </View>
    </>
  )
}

export default FavoriteAppsSettings
