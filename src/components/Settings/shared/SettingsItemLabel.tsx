import React from 'react'
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'

export type SettingsItemLabelProps = {
  title: string
  description?: string
  titleStyle?: StyleProp<TextStyle>
  wrapperStyle?: StyleProp<ViewStyle>
}

const SettingsItemLabel = ({ title, description, wrapperStyle, titleStyle }: SettingsItemLabelProps) => {
  return (
    <View style={[styles.wrapper, wrapperStyle]} testID='wrapper'>
      <Text style={[styles.label, titleStyle]} testID='title'>
        {title}
      </Text>
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
