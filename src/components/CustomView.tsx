// React
import React from 'react'
// Reanimated
import Animated from 'react-native-reanimated'
// Models
import { CustomViewProps as Props } from '../models/props'

const CustomView = ({ children, style, entryAnimation, exitAnimation }: Props) => {
  return (
    <Animated.View style={style ? style : {}} entering={entryAnimation} exiting={exitAnimation}>
      {children}
    </Animated.View>
  )
}

export default CustomView
