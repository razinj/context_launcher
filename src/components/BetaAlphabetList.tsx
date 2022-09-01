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

const BetaAlphabetList = () => {
  const apps = useSelector(selectAppsListMemoized)
  const flatListRef: MutableRefObject<FlatList<AppDetails> | null> = useRef(null)

  const onScrollToSection = (index: number) => {
    if (!flatListRef.current) return

    const sectionList = flatListRef.current as FlatList
    sectionList.scrollToIndex({ index, animated: false })
  }

  const renderAppItem: ListRenderItem<AppDetails> = ({ item }: ListRenderItemInfo<AppDetails>) => (
    <AppItem appDetails={item} renderedIn={RenderedIn.FILTERED_APPS} />
  )

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={apps}
        ref={flatListRef}
        renderItem={renderAppItem}
        keyboardShouldPersistTaps={'handled'}
        keyExtractor={appDetails => appDetails.name}
        getItemLayout={(_data: unknown, index: number) => ({ length: 60, offset: 60 * index, index })}
      />

      <BetaListLetterIndex onPressLetter={onScrollToSection} />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
})

export default BetaAlphabetList
