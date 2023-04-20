import React from 'react'
import { FlatList, ListRenderItem, ListRenderItemInfo, StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import { AppDetails } from '../models/app-details'
import { RenderedIn } from '../models/rendered-in'
import { sectionWrapper } from '../shared/styles'
import { selectAppsSearchQuery, selectAppsSearchResult } from '../slices/appState'
import { getListItemLayout, getListKey } from '../utils/apps'
import { truncateString } from '../utils/string'
import AppItem from './AppItem'
import EmptyListComponent from './shared/EmptyListComponent'

const FilteredApps = () => {
  const apps = useSelector(selectAppsSearchResult)
  const searchQuery = useSelector(selectAppsSearchQuery)

  const renderItem: ListRenderItem<AppDetails> = ({ item }: ListRenderItemInfo<AppDetails>) => (
    <AppItem appDetails={item} renderedIn={RenderedIn.FILTERED_APPS} />
  )

  return (
    <View style={[sectionWrapper, styles.wrapper]}>
      <FlatList
        inverted={apps.length !== 0}
        data={apps}
        renderItem={renderItem}
        keyExtractor={getListKey}
        getItemLayout={getListItemLayout}
        keyboardShouldPersistTaps={'handled'}
        ListEmptyComponent={
          <EmptyListComponent text={`No application found for "${truncateString(searchQuery, 20)}"`} />
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 5,
  },
})

export default FilteredApps
