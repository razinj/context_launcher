// React
import React from 'react'
// React Native
import { StyleSheet, Text, View } from 'react-native'
// Models
import { SettingsItemLabelProps as Props } from '../../models/props'

const SettingsItemLabel = ({ title, description }: Props) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{title}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  label: {
    color: '#808080',
  },
  description: {
    color: '#ccc',
  },
})

export default SettingsItemLabel
