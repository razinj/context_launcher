import React from 'react'
import { IconButton } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { PRIMARY_COLOR } from '../constants'
import { iconButtonStyle } from '../shared/bottom-container'
import { toogleAllApps } from '../slices/appState'

const AllAppsIcon = () => {
  const dispatch = useDispatch()

  const _toogleAllApps = () => {
    dispatch(toogleAllApps())
  }

  return (
    <IconButton
      size={30}
      icon='hexagon-outline'
      style={iconButtonStyle}
      iconColor={PRIMARY_COLOR}
      onPress={_toogleAllApps}
      testID='all-apps-toggle-button'
    />
  )
}

export default AllAppsIcon
