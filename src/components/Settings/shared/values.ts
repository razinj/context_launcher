import { PressableAndroidRippleConfig, StyleProp, ViewStyle } from 'react-native'
import { PRIMARY_COLOR } from '../../../constants'

export const activeSwitch = PRIMARY_COLOR
export const inActiveSwitch = '#f4f3f4'
export const switchTrackColor = { false: '#e5e5e5', true: '#e5e5e5' }

export const settingItemButtonRippleConfig: PressableAndroidRippleConfig = {
  borderless: false,
  foreground: true,
  color: '#e5e5e5',
}

export const settingsPressableItemStyle: StyleProp<ViewStyle> = {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
}

export const settingItemWrapperStyle: StyleProp<ViewStyle> = {
  flexDirection: 'row',
  justifyContent: 'space-between',
}
