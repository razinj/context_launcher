// React
import React from 'react'
// React Native
import {
  Text,
  View,
  FlatList,
  Pressable,
  StyleSheet,
  ListRenderItem,
  ListRenderItemInfo,
  PressableAndroidRippleConfig,
} from 'react-native'
// Redux
import { useSelector } from 'react-redux'
import { selectAppsLetterListMemoized } from '../slices/appsList'
// Models
import { AppLetterIndex } from '../models/list-letter-index'
import { AllAppsLetterIndexProps as Props } from '../models/props'

const rippleConfig: PressableAndroidRippleConfig = {
  borderless: false,
  foreground: true,
  color: '#e5e5e5',
  radius: 12,
}

const keyExtractor = ({ letter }: AppLetterIndex) => letter

const AllAppsLetterIndex = ({ onPress }: Props) => {
  const appsLetterList = useSelector(selectAppsLetterListMemoized)

  const renderItem: ListRenderItem<AppLetterIndex> = ({ item }: ListRenderItemInfo<AppLetterIndex>) => {
    return (
      <Pressable
        android_disableSound={true}
        android_ripple={rippleConfig}
        style={styles.letterIndexLabelWrapper}
        onPress={() => onPress(item.index)}>
        <Text style={styles.letterIndexLabel}>{item.letter}</Text>
      </Pressable>
    )
  }

  return (
    <View style={styles.letterIndexContainer}>
      <FlatList
        data={appsLetterList}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        initialNumToRender={appsLetterList.length}
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

export default AllAppsLetterIndex
