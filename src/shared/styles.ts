import { StyleProp, TextStyle, ViewStyle } from 'react-native'
import { BACKGROUND_COLOR, WHITE_COLOR } from '../constants'

export const whiteTextColorStyle: StyleProp<TextStyle> = {
  color: WHITE_COLOR,
}

export const noAppsViewStyle: StyleProp<ViewStyle> = {
  minHeight: 62,
  alignItems: 'center',
  justifyContent: 'center',
}

export const sectionWrapper: StyleProp<ViewStyle> = {
  borderRadius: 5,
  backgroundColor: BACKGROUND_COLOR,
}

export const sectionHeaderWrapperStyle: StyleProp<ViewStyle> = {
  paddingLeft: 10,
  paddingVertical: 2.5,
  borderBottomWidth: 1,
  borderBottomColor: 'rgba(255, 255, 255, .5)',
}

export const sectionHeaderLabelStyle: StyleProp<TextStyle> = {
  fontSize: 12,
  color: 'rgba(255, 255, 255, .75)',
}
