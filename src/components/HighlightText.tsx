// React
import React from 'react'
// React Native
import { StyleSheet, Text } from 'react-native'
// Redux
import { useSelector } from 'react-redux'
// Slices
import { selectAppsSearchQuery } from '../slices/appsSearch'
// Constants
import { PRIMARY_HEX_COLOR } from '../constants'
// Models
import { HighlightTextProps as Props } from '../models/props'

const HighlightText = ({ text }: Props) => {
  const searchQuery = useSelector(selectAppsSearchQuery)

  if (!searchQuery) {
    return <Text style={styles.normalText}>{text}</Text>
  }

  const regex = new RegExp(`(${searchQuery})`, 'gi')

  return (
    <Text style={styles.normalText}>
      {text.split(regex).map((substring: string, index: number) =>
        regex.test(substring) ? (
          <Text style={styles.highlightedText} key={index} testID='highlight-text-highlighted'>
            {substring}
          </Text>
        ) : (
          <Text key={index}>{substring}</Text>
        )
      )}
    </Text>
  )
}

const styles = StyleSheet.create({
  highlightedText: {
    color: PRIMARY_HEX_COLOR,
    fontWeight: '600',
    textShadowColor: 'rgba(255, 255, 255, 0.1)',
    textShadowRadius: 2.5,
  },
  normalText: {
    color: '#fff',
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowRadius: 2.5,
  },
})

export default HighlightText
