import React from 'react'
import { FlatList, ListRenderItem, ListRenderItemInfo, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { PinnedApp } from '../models/pinned-app'
import { RenderedIn } from '../models/rendered-in'
import { sectionHeaderLabelStyle, sectionHeaderWrapperStyle, sectionWrapper } from '../shared/styles'
import { selectPinnedAppsMemoized } from '../slices/pinnedApps'
import { getListItemLayout, getListKey } from '../utils/apps'
import AppItem from './AppItem'
import EmptyListComponent from './shared/EmptyListComponent'

const PinnedApps = () => {
  const apps = useSelector(selectPinnedAppsMemoized)

  const renderItem: ListRenderItem<PinnedApp> = ({ item }: ListRenderItemInfo<PinnedApp>) => (
    <AppItem appDetails={item} renderedIn={RenderedIn.PINNED_APPS} />
  )

  return (
    <View style={sectionWrapper}>
      <View style={sectionHeaderWrapperStyle}>
        <Text style={sectionHeaderLabelStyle}>Pinned</Text>
      </View>
      <View style={styles.appsWrapper}>
        <FlatList
          data={apps}
          horizontal={apps.length !== 0}
          renderItem={renderItem}
          initialNumToRender={7}
          keyExtractor={getListKey}
          getItemLayout={getListItemLayout}
          keyboardShouldPersistTaps={'handled'}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={<EmptyListComponent text={'No pinned apps yet'} />}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  appsWrapper: {
    padding: 5,
  },
})

export default PinnedApps
