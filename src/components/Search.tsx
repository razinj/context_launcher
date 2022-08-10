// React
import React, { FC, useContext, useEffect } from 'react'
// React Native
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
// Redux
import { useDispatch, useSelector } from 'react-redux'
// Slices
import {
  resetAppsSearchState,
  selectAppsSearchQuery,
  setAppsSearchQuery,
  setAppsSearchResult,
} from '../slices/appsSearch'
import { selectAppsListMemoized } from '../slices/appsList'
// Icon
import Icon from 'react-native-vector-icons/MaterialIcons'
// Utils
import { dismissKeyboard } from '../utils/keyboard'
// Contexts
import SearchContext, { SearchContextType } from '../contexts/SearchContext'
// Models
import { AppDetails } from '../models/app-details'

const clearIcon = <Icon name='clear' size={25} color='#808080' />

const Search: FC = () => {
  const dispatch = useDispatch()
  const allApps = useSelector(selectAppsListMemoized)
  const searchQuery = useSelector(selectAppsSearchQuery)
  const { searchInputRef, invalidCharacters, setInvalidCharacters } = useContext<SearchContextType>(SearchContext)

  const onQueryChange = (query: string) => {
    const trimmedQuery = query.trim().replace(/\./gi, '\\.')

    // Accept only ASCII based characters
    if (!trimmedQuery.match(/[A-z\s\d]/gi)) {
      setInvalidCharacters(true)
      dispatch(setAppsSearchQuery(trimmedQuery))
      return
    } else if (trimmedQuery.length === 0) {
      dispatch(resetAppsSearchState())
      return
    }

    // Reset invalid characters when it's valid (passes the above check)
    if (invalidCharacters) setInvalidCharacters(false)

    dispatch(setAppsSearchResult(allApps.filter((app: AppDetails) => app.label.match(new RegExp(trimmedQuery, 'gi')))))
    dispatch(setAppsSearchQuery(trimmedQuery))
  }

  const clearInputAndSearchState = () => {
    searchInputRef?.current?.clear()
    dispatch(resetAppsSearchState())
  }

  useEffect(() => {
    if (!searchQuery) searchInputRef?.current?.clear()
  }, [searchQuery])

  return (
    <View style={styles.wrapper}>
      <TextInput
        ref={searchInputRef}
        style={styles.searchInput}
        placeholder='Search'
        placeholderTextColor='#808080'
        returnKeyType='search'
        autoCapitalize='words'
        onChangeText={onQueryChange}
        onSubmitEditing={dismissKeyboard}
      />
      {searchQuery && searchQuery?.length > 0 && (
        <TouchableOpacity onPress={clearInputAndSearchState}>{clearIcon}</TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 50,
    paddingHorizontal: 10,
    flex: 1,
  },
  searchInput: {
    flex: 1,
    color: '#000',
    fontSize: 16,
  },
})

export default Search
