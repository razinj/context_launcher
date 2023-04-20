import React from 'react'
import { FlatList, ListRenderItem, ListRenderItemInfo, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { RecentApp } from '../models/recent-app'
import { RenderedIn } from '../models/rendered-in'
import { sectionHeaderLabelStyle, sectionHeaderWrapperStyle, sectionWrapper } from '../shared/styles'
import { selectRecentAppsMemoized } from '../slices/recentApps'
import { getListItemLayout, getListKey } from '../utils/apps'
import AppItem from './AppItem'
import EmptyListComponent from './shared/EmptyListComponent'

const RecentApps = () => {
  const apps = useSelector(selectRecentAppsMemoized)

  const renderItem: ListRenderItem<RecentApp> = ({ item }: ListRenderItemInfo<RecentApp>) => (
    <AppItem appDetails={item} renderedIn={RenderedIn.RECENT_APPS} />
  )

  return (
    <View style={sectionWrapper}>
      <View style={sectionHeaderWrapperStyle}>
        <Text style={sectionHeaderLabelStyle}>Recent</Text>
      </View>
      <View style={styles.appsWrapper}>
        <FlatList
          data={apps}
          renderItem={renderItem}
          initialNumToRender={5}
          keyExtractor={getListKey}
          inverted={apps.length !== 0}
          getItemLayout={getListItemLayout}
          keyboardShouldPersistTaps={'handled'}
          ListEmptyComponent={<EmptyListComponent text={'No recent apps yet'} />}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  appsWrapper: {
    paddingVertical: 5,
  },
})

export default RecentApps
