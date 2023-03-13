// React
import React, { useCallback, useContext, useMemo } from 'react'
// React Native
import { Pressable, PressableAndroidRippleConfig, StyleSheet, TextInput, View } from 'react-native'
// Components
import CustomIcon from './shared/CustomIcon'
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
// Constants
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../constants'
// Utils
import { getAppsByLabel } from '../utils/apps'

const clearButtonRippleConfig: PressableAndroidRippleConfig = {
  borderless: true,
}

const Search = () => {
  const dispatch = useDispatch()
  const apps = useSelector(selectAppsListMemoized)
  const searchQuery = useSelector(selectAppsSearchQuery)
  const { displayAllApps, hideAllApps } = useContext(GlobalContext)
  const { searchInputRef, invalidCharacters, setInvalidCharacters } = useContext(SearchContext)

  const onQueryChange = (query: string) => {
    hideAllApps()

    const trimmedQuery = query.trim().replace(/\./g, '\\.')

    if (trimmedQuery.length === 0) {
      dispatch(resetAppsSearchState())
      return
    }

    // Check for only ASCII based characters
    if (!trimmedQuery.match(/[A-z\s\d]/gi)) {
      setInvalidCharacters(true)
      dispatch(setAppsSearchQuery(trimmedQuery))
      return
    }

    // Reset invalid characters when it's valid (passes the above check)
    if (invalidCharacters) setInvalidCharacters(false)

    dispatch(setAppsSearchResult(getAppsByLabel(apps, trimmedQuery)))
    dispatch(setAppsSearchQuery(trimmedQuery))
  }

  const clearInputAndSearchState = useCallback(() => {
    searchInputRef?.current?.clear()
    dispatch(resetAppsSearchState())
  }, [searchInputRef])

  const clearButton = (): JSX.Element | null => {
    if (!searchQuery) return null

    return (
      <Pressable
        testID='search-input-clear-button'
        onPress={clearInputAndSearchState}
        android_disableSound={true}
        android_ripple={clearButtonRippleConfig}>
        <CustomIcon name='close' size={30} color='#808080' />
      </Pressable>
    )
  }

  const placeholderTextColor: string = useMemo(
    () => (displayAllApps ? PRIMARY_COLOR : SECONDARY_COLOR),
    [displayAllApps]
  )

  return (
    <View style={styles.wrapper}>
      <TextInput
        testID='search-input'
        ref={searchInputRef}
        style={styles.searchInput}
        placeholder='Search'
        placeholderTextColor={placeholderTextColor}
        returnKeyType='search'
        autoCapitalize='words'
        onChangeText={onQueryChange}
      />
      {clearButton()}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchInput: {
    flex: 1,
    color: '#000',
  },
})

export default Search
