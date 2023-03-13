// React
import React from 'react'
// React Native
import { StyleSheet, Text, View } from 'react-native'
// Models
import { SettingsItemLabelProps as Props } from '../../../models/props'

const SettingsItemLabel = ({ title, description, titleStyle, wrapperStyle }: Props) => {
  return (
    <View style={[styles.wrapper, wrapperStyle]}>
      <Text style={[styles.label, titleStyle]}>{title}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
  label: {
    color: '#808080',
  },
  description: {
    color: '#ccc',
  },
})

export default SettingsItemLabel
