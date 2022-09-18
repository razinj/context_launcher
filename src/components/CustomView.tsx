// React
import React from 'react'
// Reanimated
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
// Models
import { CustomViewProps as Props } from '../models/props'

const CustomView = ({ children, style, entryAnimation = FadeIn, exitAnimation = FadeOut }: Props) => {
  return (
    <Animated.View style={style ? style : {}} entering={entryAnimation} exiting={exitAnimation}>
      {children}
    </Animated.View>
  )
}

export default CustomView
