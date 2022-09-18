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
import { BACKGROUND_COLOR } from '../constants'
// Models
import { RenderedIn } from '../models/rendered-in'
import { AppDetails } from '../models/app-details'
import CustomView from './CustomView'

const keyExtractor = ({ name }: AppDetails) => name

const FilteredApps = () => {
  const apps = useSelector(selectAppsSearchResult)
  const { invalidCharacters } = useContext(SearchContext)
  const searchQuery = useSelector(selectAppsSearchQuery)

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

  return (
    <View style={styles.wrapper}>
      <FlatList
        inverted
        data={apps}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
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
