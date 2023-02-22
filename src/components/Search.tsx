// React
import React, { useContext, useEffect } from 'react'
// React Native
import { Pressable, PressableAndroidRippleConfig, StyleSheet, TextInput, View } from 'react-native'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import {
  resetAppsSearchState,
  selectAppsSearchQuery,
  setAppsSearchQuery,
  setAppsSearchResult,
} from '../slices/appsSearch'
import { selectAppsListMemoized } from '../slices/appsList'
// Contexts
import SearchContext from '../contexts/SearchContext'
import GlobalContext from '../contexts/GlobalContext'
// Icon
import Icon from 'react-native-vector-icons/MaterialIcons'
// Utils
import { dismissKeyboard } from '../utils/keyboard'
// Constants
import { PRIMARY_HEX_COLOR, SECONDARY_HEX_COLOR } from '../constants'
// Models
import { AppDetails } from '../models/app-details'

const clearIconRippleConfig: PressableAndroidRippleConfig = {
  borderless: true,
  foreground: true,
  color: '#ccc',
  radius: 15,
}

const Search = () => {
  const dispatch = useDispatch()
  const apps = useSelector(selectAppsListMemoized)
  const searchQuery = useSelector(selectAppsSearchQuery)
  const { searchInputRef, invalidCharacters, setInvalidCharacters } = useContext(SearchContext)
  const { hideAllApps, displayAllApps } = useContext(GlobalContext)

  const onQueryChange = (query: string) => {
    const trimmedQuery = query.trim().replace(/\./g, '\\.')

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

    hideAllApps()

    dispatch(setAppsSearchResult(apps.filter((app: AppDetails) => app.label.match(new RegExp(trimmedQuery, 'gi')))))
    dispatch(setAppsSearchQuery(trimmedQuery))
  }

  const clearInputAndSearchState = () => {
    searchInputRef?.current?.clear()
    dispatch(resetAppsSearchState())
  }

  const onSubmitEditing = () => {
    dismissKeyboard()
  }

  useEffect(() => {
    if (!searchQuery) searchInputRef?.current?.clear()
  }, [searchQuery])

  return (
    <View style={styles.wrapper}>
      <TextInput
        testID='search-input'
        ref={searchInputRef}
        style={styles.searchInput}
        placeholder='Search'
        placeholderTextColor={displayAllApps ? PRIMARY_HEX_COLOR : SECONDARY_HEX_COLOR}
        returnKeyType='search'
        autoCapitalize='words'
        onChangeText={onQueryChange}
        onSubmitEditing={onSubmitEditing}
      />
      {searchQuery && searchQuery?.length > 0 && (
        <Pressable
          testID='search-input-clear-button'
          style={styles.clearIconWrapper}
          onPress={clearInputAndSearchState}
          android_disableSound={true}
          android_ripple={clearIconRippleConfig}>
          <Icon name='clear' size={25} color='#808080' />
        </Pressable>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 5,
    flex: 1,
  },
  searchInput: {
    flex: 1,
    color: '#000',
    fontSize: 16,
  },
  clearIconWrapper: {
    padding: 5,
  },
})

export default Search
