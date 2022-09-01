// React
import React from 'react'
// React Native
import { StyleSheet, Text } from 'react-native'
// Redux
import { useSelector } from 'react-redux'
// Slices
import { selectAppsSearchQuery } from '../slices/appsSearch'
// Models
import { HighlightTextProps as Props } from '../models/props'

const HighlightText = ({ text }: Props) => {
  const searchQuery = useSelector(selectAppsSearchQuery)

  if (!searchQuery || searchQuery.trim().length === 0) return <Text>{text}</Text>

  const regex = new RegExp(`(${searchQuery})`, 'gi')

  return (
    <Text>
      {text.split(regex).map((substring: string, index: number) => {
        return regex.test(substring) ? (
          <Text style={styles.highlightedText} key={index}>
            {substring}
          </Text>
        ) : (
          <Text key={index}>{substring}</Text>
        )
      })}
    </Text>
  )
}

const styles = StyleSheet.create({
  highlightedText: {
    color: 'green',
    fontWeight: '600',
  },
})

export default HighlightText
