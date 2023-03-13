// React
import { ReactNode } from 'react'
// React Native
import { StyleProp, TextStyle, ViewStyle } from 'react-native'
import { BaseAnimationBuilder } from 'react-native-reanimated'
// Models
import { AppDetails } from './app-details'
import { RenderedIn } from './rendered-in'

export type AppItemProps = {
  appDetails: AppDetails
  renderedIn: RenderedIn
  appIcon?: string
  wrapperStyle?: StyleProp<ViewStyle>
  pressableStyle?: StyleProp<ViewStyle>
}

export type HighlightTextProps = {
  text: string
}

export type SearchContextWrapperProps = {
  children: ReactNode
}

export type GlobalContextWrapperProps = {
  children: ReactNode
}

export type AllAppsLetterIndexProps = {
  onPress: (letterIndex: number) => void
}

export type SettingsItemLabelProps = {
  title: string
  description?: string
  titleStyle?: StyleProp<TextStyle>
  wrapperStyle?: StyleProp<ViewStyle>
}

export type ToggleSettingsProps = SettingsItemLabelProps & {
  children: ReactNode
}

export type CustomViewProps = {
  children: ReactNode
  style?: StyleProp<ViewStyle>
  exitAnimation?: BaseAnimationBuilder | typeof BaseAnimationBuilder
  entryAnimation?: BaseAnimationBuilder | typeof BaseAnimationBuilder
}

export type CustomIconProps = {
  name: string
  size: number
  color: string
  style?: Record<string, string | number>
}
