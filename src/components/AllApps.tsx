// React
import React, { MutableRefObject, useMemo, useRef } from 'react'
// React Native
import { FlatList, ListRenderItem, ListRenderItemInfo, StyleSheet } from 'react-native'
// Components
import AppItem from './AppItem'
import CustomView from './CustomView'
import AllAppsLetterIndex from './AllAppsLetterIndex'
// Redux
import { useSelector } from 'react-redux'
import { selectAppsListMemoized } from '../slices/appsList'
import { selectDisplayAppsIconsMemoized } from '../slices/preferences'
// Reanimated
import { SlideInDown } from 'react-native-reanimated'
// Constants
import { APP_ITEM_HEIGHT_ICON_DISPLAYED, APP_ITEM_HEIGHT_ICON_NOT_DISPLAYED, BACKGROUND_COLOR } from '../constants'
// Analytics
import perf from '@react-native-firebase/perf'
import analytics from '@react-native-firebase/analytics'
// Models
import { RenderedIn } from '../models/rendered-in'
import { AppDetails } from '../models/app-details'

const keyExtractor = ({ name }: AppDetails) => name

const AllApps = () => {
  const apps = useSelector(selectAppsListMemoized)
  const listRef: MutableRefObject<FlatList<AppDetails> | null> = useRef(null)
  const displayAppsIcons = useSelector(selectDisplayAppsIconsMemoized)

  const scrollToIndex = async (index: number) => {
    const trace = await perf().startTrace('scroll_to_app')

    const currentListRef = listRef.current as FlatList
    currentListRef.scrollToIndex({ index, animated: true })

    await trace.stop()
    await analytics().logEvent('on_app_letter_index_click')
  }

  const renderItem: ListRenderItem<AppDetails> = ({ item }: ListRenderItemInfo<AppDetails>) => (
    <AppItem appDetails={item} renderedIn={RenderedIn.ALL_APPS} />
  )

  const itemHeight = useMemo(
    () => (displayAppsIcons ? APP_ITEM_HEIGHT_ICON_DISPLAYED : APP_ITEM_HEIGHT_ICON_NOT_DISPLAYED),
    [displayAppsIcons]
  )

  const initialNumToRender = useMemo(() => (displayAppsIcons ? 15 : 25), [displayAppsIcons])

  const getItemLayout = (_data: unknown, index: number) => ({
    length: itemHeight,
    offset: itemHeight * index,
    index,
  })

  return (
    <CustomView style={styles.wrapper} entryAnimation={SlideInDown}>
      <FlatList
        data={apps}
        ref={listRef}
        renderItem={renderItem}
        initialNumToRender={initialNumToRender}
        keyExtractor={keyExtractor}
        getItemLayout={getItemLayout}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />

      <AllAppsLetterIndex onPress={scrollToIndex} />
    </CustomView>
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

export default AllApps
