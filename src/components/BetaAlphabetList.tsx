// React
import React, { MutableRefObject, useRef } from 'react'
// React Native
import { FlatList, ListRenderItem, ListRenderItemInfo, StyleSheet, View } from 'react-native'
// Components
import AppItem from './AppItem'
import BetaListLetterIndex from './BetaListLetterIndex'
// Redux
import { useSelector } from 'react-redux'
import { selectAppsListMemoized } from '../slices/appsList'
// Models
import { AppDetails } from '../models/app-details'
import { RenderedIn } from '../models/rendered-in'
import { BACKGROUND_COLOR } from '../constants'

const BetaAlphabetList = () => {
  const apps = useSelector(selectAppsListMemoized)
  const listRef: MutableRefObject<FlatList<AppDetails> | null> = useRef(null)

  const scrollToIndex = (index: number) => {
    ;(listRef.current as FlatList).scrollToIndex({ index, animated: true })
  }

  const renderItem: ListRenderItem<AppDetails> = ({ item }: ListRenderItemInfo<AppDetails>) => (
    <AppItem appDetails={item} renderedIn={RenderedIn.ALL_APPS} />
  )

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={apps}
        ref={listRef}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}
        keyExtractor={(item: AppDetails) => item.name}
        getItemLayout={(_data: unknown, index: number) => ({ length: 60, offset: 60 * index, index })}
      />

      <BetaListLetterIndex onLetterPress={scrollToIndex} />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 10,
    paddingVertical: 5,
    position: 'relative',
    backgroundColor: BACKGROUND_COLOR,
  },
})

export default BetaAlphabetList
