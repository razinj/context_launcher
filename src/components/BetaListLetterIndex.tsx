// React
import React from 'react'
// React Native
import { FlatList, ListRenderItem, ListRenderItemInfo, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// Redux
import { useSelector } from 'react-redux'
import { selectAppsListMemoized } from '../slices/appsList'
// Utils
import { getFirstLetter } from '../utils/alphabetList'
// Models
import { AppDetails } from '../models/app-details'

interface ListLetterIndexProps {
  onPressLetter: (sectionIndex: number) => void
}

type AppLetterIndex = {
  index: number
  letter: string
}

const BetaListLetterIndex = ({ onPressLetter }: ListLetterIndexProps) => {
  const apps = useSelector(selectAppsListMemoized)

  const getAppsLetterIndex = (data: AppDetails[]): AppLetterIndex[] => {
    const treatedLetters: string[] = []
    const appsLetterIndex: AppLetterIndex[] = []

    data.forEach((item: AppDetails, index: number) => {
      const letter = getFirstLetter(item.label)

      if (!treatedLetters.includes(letter)) {
        treatedLetters.push(letter)
        appsLetterIndex.push({ letter: letter.toUpperCase(), index })
      }
    })

    return appsLetterIndex
  }

  const onRenderCustomIndexLetter: ListRenderItem<AppLetterIndex> = ({ item }: ListRenderItemInfo<AppLetterIndex>) => {
    return (
      <TouchableOpacity onPress={() => onPressLetter(item.index)}>
        <View style={styles.letterIndexItem}>
          <Text style={styles.letterIndexLabel}>{item.letter}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.letterIndexContainer}>
      <FlatList
        contentContainerStyle={styles.letterIndexList}
        data={getAppsLetterIndex(apps)}
        keyExtractor={(item: AppLetterIndex) => item.letter}
        renderItem={onRenderCustomIndexLetter}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  letterIndexContainer: {
    width: 10,
    height: '100%',
    position: 'absolute',
    top: 0,
    right: 0,
  },
  letterIndexList: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  letterIndexItem: {
    width: 10,
    height: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  letterIndexLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'grey',
  },
})

export default BetaListLetterIndex
