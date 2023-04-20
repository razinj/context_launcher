import React from 'react'
import { Text, View } from 'react-native'
import { noAppsViewStyle, whiteTextColorStyle } from '../../shared/styles'

type Props = {
  text: string
}

const EmptyListComponent = ({ text }: Props) => {
  return (
    <View style={noAppsViewStyle}>
      <Text style={whiteTextColorStyle}>{text}</Text>
    </View>
  )
}

export default EmptyListComponent
