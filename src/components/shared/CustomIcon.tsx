import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

type Props = {
  name: string
  size: number
  color: string
  style?: Record<string, string | number>
}

const CustomIcon = ({ name, size, color, style }: Props) => {
  return <Icon name={name} size={size} color={color} style={style} />
}

export default CustomIcon
