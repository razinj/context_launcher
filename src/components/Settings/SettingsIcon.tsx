// React
import React, { useContext } from 'react'
// React Native
import { Pressable, View } from 'react-native'
// Components
import CustomIcon from '../shared/CustomIcon'
// Contexts
import GlobalContext from '../../contexts/GlobalContext'
// Constants
import { PRIMARY_COLOR } from '../../constants'
import { iconsStyle, iconsPressableConfig } from '../../shared/bottom-container'

const SettingsIcon = () => {
  const { displaySettingsBottomSheet } = useContext(GlobalContext)

  return (
    <View style={iconsStyle.wrapper}>
      <Pressable testID='settings-button' onPress={displaySettingsBottomSheet} {...iconsPressableConfig}>
        <CustomIcon name='dots-vertical' size={34} style={iconsStyle.icon} color={PRIMARY_COLOR} />
      </Pressable>
    </View>
  )
}

export default SettingsIcon
