// React
import React, { useContext } from 'react'
// React Native
import { Pressable, PressableAndroidRippleConfig, StyleSheet, Text, View } from 'react-native'
// Contexts
import GlobalContext from '../contexts/GlobalContext'
// Icons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
// Constants
import { PRIMARY_HEX_COLOR, SECONDARY_HEX_COLOR } from '../constants'
// Analytics
import analytics from '@react-native-firebase/analytics'

const rippleConfig: PressableAndroidRippleConfig = {
  color: SECONDARY_HEX_COLOR,
  borderless: true,
  foreground: true,
  radius: 20,
}

const SettingsIcon = () => {
  const { displaySettingsBottomSheet } = useContext(GlobalContext)

  const onPress = async () => {
    displaySettingsBottomSheet()

    await analytics().logEvent('settings_click')
  }

  return (
    <View style={styles.wrapper}>
      <Pressable onPress={onPress} android_disableSound={true} android_ripple={rippleConfig}>
        <Icon name='dots-vertical' size={34} style={styles.icon} color={PRIMARY_HEX_COLOR} />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    margin: 5,
  },
})

export default SettingsIcon
