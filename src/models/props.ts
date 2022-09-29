// React
import { ReactNode } from 'react'
// React Native
import { StyleProp, ViewStyle } from 'react-native'
import { BaseAnimationBuilder } from 'react-native-reanimated'
// Models
import { AppDetails } from './app-details'
import { RenderedIn } from './rendered-in'

export type AppItemProps = {
  appDetails: AppDetails
  renderedIn: RenderedIn
  appIcon?: string
}

export type HighlightTextProps = {
  text: string
  highlightValue?: string
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
}

export type CustomViewProps = {
  children: ReactNode
  style?: StyleProp<ViewStyle>
  exitAnimation?: BaseAnimationBuilder | typeof BaseAnimationBuilder
  entryAnimation?: BaseAnimationBuilder | typeof BaseAnimationBuilder
}
