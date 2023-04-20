import React from 'react'
import { IconButton } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { PRIMARY_COLOR } from '../../constants'
import { iconButtonStyle } from '../../shared/bottom-container'
import { setDisplaySettings } from '../../slices/appState'

const SettingsIcon = () => {
  const dispatch = useDispatch()

  const displaySettings = () => {
    dispatch(setDisplaySettings(true))
  }

  return (
    <IconButton
      size={30}
      icon='dots-vertical'
      style={iconButtonStyle}
      iconColor={PRIMARY_COLOR}
      onPress={displaySettings}
      testID='settings-button'
    />
  )
}

export default SettingsIcon
