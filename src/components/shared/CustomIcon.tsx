// React
import React from 'react'
// Icon
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
// Models
import { CustomIconProps as Props } from '../../models/props'

const CustomIcon = ({ name, size, color, style }: Props) => {
  return <Icon name={name} size={size} color={color} style={style} />
}

export default CustomIcon
