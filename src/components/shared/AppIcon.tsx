import React from 'react'
import { Image, ImageStyle, StyleProp } from 'react-native'

type Props = {
  icon: string
  style: StyleProp<ImageStyle>
}

const AppIcon = ({ icon, style }: Props) => {
  return <Image resizeMode={'contain'} style={style} source={{ uri: `data:image/png;base64,${icon}` }} />
}

export default AppIcon
