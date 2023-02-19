// React
import React, { useContext } from 'react'
// React Native
import { FlatList, ListRenderItem, ListRenderItemInfo, StyleSheet, Text, View } from 'react-native'
// Components
import AppItem from './AppItem'
// Redux
import { useSelector } from 'react-redux'
import { selectAppsSearchQuery, selectAppsSearchResult } from '../slices/appsSearch'
// Contexts
import SearchContext from '../contexts/SearchContext'
// Constants
import { APP_ITEM_HEIGHT_ICON_DISPLAYED, BACKGROUND_COLOR } from '../constants'
// Utils
import { truncateString } from '../utils/string'
// Models
import { RenderedIn } from '../models/rendered-in'
import { AppDetails } from '../models/app-details'

const keyExtractor = ({ name }: AppDetails) => name
const getItemLayout = (_data: unknown, index: number) => ({
  length: APP_ITEM_HEIGHT_ICON_DISPLAYED,
  offset: APP_ITEM_HEIGHT_ICON_DISPLAYED * index,
  index,
})

const FilteredApps = () => {
  const apps = useSelector(selectAppsSearchResult)
  const { invalidCharacters } = useContext(SearchContext)
  const searchQuery = useSelector(selectAppsSearchQuery)

  if (apps.length === 0 || invalidCharacters) {
    return (
      <View style={[styles.wrapper, styles.noAppsWrapper]}>
        <Text style={styles.noAppsWrapperText}>No application found for "{truncateString(searchQuery, 20)}"</Text>
      </View>
    )
  }

  const renderItem: ListRenderItem<AppDetails> = ({ item }: ListRenderItemInfo<AppDetails>) => (
    <AppItem appDetails={item} renderedIn={RenderedIn.FILTERED_APPS} />
  )

  return (
    <View style={styles.wrapper}>
      <FlatList
        inverted
        data={apps}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemLayout={getItemLayout}
        keyboardShouldPersistTaps={'handled'}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    minHeight: 70,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: BACKGROUND_COLOR,
  },
  noAppsWrapper: {
    paddingVertical: 0,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  noAppsWrapperText: {
    color: '#fff',
  },
})

export default FilteredApps
