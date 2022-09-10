// React
import React from 'react'
// React Native
import {
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
  Pressable,
  PressableAndroidRippleConfig,
  StyleSheet,
  Text,
  View,
} from 'react-native'
// Redux
import { useSelector } from 'react-redux'
import { selectAppsListMemoized } from '../slices/appsList'
// Utils
import { getFirstLetter } from '../utils/alphabetList'
// Models
import { AppDetails } from '../models/app-details'
import { AppLetterIndex } from '../models/list-letter-index'
import { ListLetterIndexProps as Props } from '../models/props'

const rippleConfig: PressableAndroidRippleConfig = {
  borderless: false,
  foreground: true,
  color: '#e5e5e5',
  radius: 12,
}

const BetaListLetterIndex = ({ onLetterPress }: Props) => {
  const apps = useSelector(selectAppsListMemoized)

  // TODO: Needs refactoring -- use selector to cache the data
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

  const renderItem: ListRenderItem<AppLetterIndex> = ({ item }: ListRenderItemInfo<AppLetterIndex>) => {
    return (
      <Pressable
        style={styles.letterIndexLabelWrapper}
        onPress={() => onLetterPress(item.index)}
        android_disableSound={true}
        android_ripple={rippleConfig}>
        <Text style={styles.letterIndexLabel}>{item.letter}</Text>
      </Pressable>
    )
  }

  return (
    <View style={styles.letterIndexContainer}>
      <FlatList
        data={getAppsLetterIndex(apps)}
        renderItem={renderItem}
        keyExtractor={(item: AppLetterIndex) => item.letter}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  letterIndexContainer: {
    top: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  letterIndexLabelWrapper: {
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  letterIndexLabel: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowRadius: 2.5,
  },
})

export default BetaListLetterIndex
