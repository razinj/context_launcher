// React
import React, { useContext } from 'react'
// React Native
import { FlatList, ListRenderItem, ListRenderItemInfo, StyleSheet, Text, View } from 'react-native'
// Components
import AppItem from './AppItem'
// Redux
import { useSelector } from 'react-redux'
import { selectAppsSearchResult } from '../slices/appsSearch'
// Contexts
import SearchContext, { SearchContextType } from '../contexts/SearchContext'
// Models
import { AppDetails } from '../models/app-details'
import { RenderedIn } from '../models/rendered-in'
import { BACKGROUND_COLOR } from '../constants'

const FilteredApps = () => {
  const apps = useSelector(selectAppsSearchResult)
  const { invalidCharacters } = useContext<SearchContextType>(SearchContext)

  const renderAppItem: ListRenderItem<AppDetails> = ({ item }: ListRenderItemInfo<AppDetails>) => (
    <AppItem appDetails={item} renderedIn={RenderedIn.FILTERED_APPS} />
  )

  if (apps.length === 0 || invalidCharacters) {
    return (
      <View style={[styles.wrapper, styles.noAppsWrapper]}>
        <Text style={styles.noAppsWrapperText}>No applications found</Text>
      </View>
    )
  }

  return (
    <View style={styles.wrapper}>
      <FlatList
        inverted
        data={apps}
        renderItem={renderAppItem}
        keyboardShouldPersistTaps={'handled'}
        keyExtractor={appDetails => appDetails.name}
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
