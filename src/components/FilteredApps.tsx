// React
import React, { useContext, useMemo } from 'react'
// React Native
import { FlatList, ListRenderItem, ListRenderItemInfo, StyleSheet, Text, View } from 'react-native'
// Components
import AppItem from './AppItem'
// Redux
import { useSelector } from 'react-redux'
import { selectDisplayAppsIconsMemoized } from '../slices/preferences'
import { selectAppsSearchQuery, selectAppsSearchResult } from '../slices/appsSearch'
// Contexts
import SearchContext from '../contexts/SearchContext'
// Constants
import { APP_ITEM_HEIGHT_ICON_DISPLAYED, APP_ITEM_HEIGHT_ICON_NOT_DISPLAYED, BACKGROUND_COLOR } from '../constants'
// Models
import { RenderedIn } from '../models/rendered-in'
import { AppDetails } from '../models/app-details'

const keyExtractor = ({ name }: AppDetails) => name

const FilteredApps = () => {
  const apps = useSelector(selectAppsSearchResult)
  const { invalidCharacters } = useContext(SearchContext)
  const searchQuery = useSelector(selectAppsSearchQuery)
  const displayAppsIcons = useSelector(selectDisplayAppsIconsMemoized)

  const itemHeight = useMemo(
    () => (displayAppsIcons ? APP_ITEM_HEIGHT_ICON_DISPLAYED : APP_ITEM_HEIGHT_ICON_NOT_DISPLAYED),
    [displayAppsIcons]
  )

  if (apps.length === 0 || invalidCharacters) {
    return (
      <View style={[styles.wrapper, styles.noAppsWrapper]}>
        <Text style={styles.noAppsWrapperText}>No applications found for "{searchQuery}"</Text>
      </View>
    )
  }

  const renderItem: ListRenderItem<AppDetails> = ({ item }: ListRenderItemInfo<AppDetails>) => (
    <AppItem appDetails={item} renderedIn={RenderedIn.FILTERED_APPS} />
  )

  const getItemLayout = (_data: unknown, index: number) => ({
    length: itemHeight,
    offset: itemHeight * index,
    index,
  })

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
