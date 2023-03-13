// React Native
import { StyleSheet, PressableProps } from 'react-native'
// Constants
import { SECONDARY_COLOR } from '../../constants'

export const iconsStyle = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    margin: 5,
  },
})

export const iconsPressableConfig: PressableProps = {
  android_disableSound: true,
  android_ripple: {
    color: SECONDARY_COLOR,
    borderless: false,
    foreground: true,
    radius: 20,
  },
}
