import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { useSelector } from 'react-redux'
import { PRIMARY_COLOR, WHITE_COLOR } from '../constants'
import { selectAppsSearchQuery } from '../slices/appState'
import { createKeyForHighlightTextElement } from '../utils/string'

type Props = {
  text: string
}

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
          <Text
            style={styles.highlightedText}
            key={createKeyForHighlightTextElement(index, substring)}
            testID='highlight-text-highlighted'>
            {substring}
          </Text>
        ) : (
          <Text key={createKeyForHighlightTextElement(index, substring)}>{substring}</Text>
        )
      )}
    </Text>
  )
}

const styles = StyleSheet.create({
  highlightedText: {
    color: PRIMARY_COLOR,
    fontWeight: '600',
    textShadowColor: 'rgba(255, 255, 255, 0.1)',
    textShadowRadius: 2.5,
  },
  normalText: {
    color: WHITE_COLOR,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowRadius: 2.5,
  },
})

export default HighlightText
