// React
import React, { FC } from 'react'
// React Native
import { Text } from 'react-native'
// Redux
import { useSelector } from 'react-redux'
// Slices
import { selectAppsSearchQuery } from '../slices/appsSearch'
// Models
import { HighlightTextProps as Props } from '../models/props'

const HighlightText: FC<Props> = ({ text }) => {
  const searchQuery = useSelector(selectAppsSearchQuery)

  if (!searchQuery || searchQuery.trim().length === 0) return <Text>{text}</Text>

  const regex = new RegExp(`(${searchQuery})`, 'gi')

  return (
    <Text>
      {text.split(regex).map((substring: string, index: number) => {
        return regex.test(substring) ? (
          <Text style={{ color: 'green', fontWeight: '600' }} key={index}>
            {substring}
          </Text>
        ) : (
          <Text key={index}>{substring}</Text>
        )
      })}
    </Text>
  )
}

export default HighlightText
