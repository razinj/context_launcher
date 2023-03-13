// React
import React, { useContext } from 'react'
// React Native
import { Pressable, View } from 'react-native'
// Components
import CustomIcon from './shared/CustomIcon'
// Contexts
import GlobalContext from '../contexts/GlobalContext'
// Constants
import { PRIMARY_COLOR } from '../constants'
import { iconsStyle, iconsPressableConfig } from '../shared/bottom-container'

const AllAppsIcon = () => {
  const { toggleDisplayAllApps } = useContext(GlobalContext)

  return (
    <View style={iconsStyle.wrapper}>
      <Pressable testID='all-apps-toggle-button' onPress={toggleDisplayAllApps} {...iconsPressableConfig}>
        <CustomIcon name='hexagon-outline' size={34} style={iconsStyle.icon} color={PRIMARY_COLOR} />
      </Pressable>
    </View>
  )
}

export default AllAppsIcon
