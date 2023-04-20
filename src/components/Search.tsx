import React, { useCallback, useContext, useMemo } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { IconButton } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { NEUTRAL_COLOR, PRIMARY_COLOR, SECONDARY_COLOR } from '../constants'
import SearchContext from '../contexts/SearchContext'
import { iconButtonStyle } from '../shared/bottom-container'
import { selectAppsListMemoized } from '../slices/appsList'
import {
  appLaunchFromSearch,
  resetAppsSearchState,
  selectAppsSearchQuery,
  selectDisplayAllApps,
  setAppsSearchQuery,
  setAppsSearchResult,
  setDisplayAllApps,
} from '../slices/appState'
import { getAppsByLabel } from '../utils/apps'

const Search = () => {
  const dispatch = useDispatch()
  const apps = useSelector(selectAppsListMemoized)
  const searchQuery = useSelector(selectAppsSearchQuery)
  const displayAllApps = useSelector(selectDisplayAllApps)
  const { searchInputRef, clearSearchInput, searchAppLaunchProcedure } = useContext(SearchContext)

  const onQueryChange = (query: string) => {
    dispatch(setDisplayAllApps(false))

    const trimmedQuery = query.trim().replace(/\./g, '\\.')

    if (trimmedQuery.length === 0) {
      dispatch(resetAppsSearchState())
      return
    }

    // Check for only ASCII based characters
    if (!trimmedQuery.match(/[A-z\s\d]/gi)) {
      dispatch(setAppsSearchResult([]))
      dispatch(setAppsSearchQuery(trimmedQuery))
      return
    }

    dispatch(setAppsSearchResult(getAppsByLabel(apps, trimmedQuery)))
    dispatch(setAppsSearchQuery(trimmedQuery))
  }

  const clearInputAndSearchState = useCallback(() => {
    clearSearchInput()
    dispatch(resetAppsSearchState())
  }, [searchInputRef])

  const clearButton = (): JSX.Element | null => {
    if (!searchQuery) return null

    return (
      <IconButton
        icon='close'
        size={30}
        style={iconButtonStyle}
        iconColor={NEUTRAL_COLOR}
        onPress={clearInputAndSearchState}
        testID='search-input-clear-button'
      />
    )
  }

  const placeholderTextColor: string = useMemo(
    () => (displayAllApps ? PRIMARY_COLOR : SECONDARY_COLOR),
    [displayAllApps]
  )

  const onSubmit = () => {
    // Reset app state
    searchAppLaunchProcedure()
    // Clean up state and launch app
    dispatch(appLaunchFromSearch())
  }

  return (
    <View style={styles.wrapper}>
      <TextInput
        testID='search-input'
        ref={searchInputRef}
        style={styles.searchInput}
        placeholder='Search'
        placeholderTextColor={placeholderTextColor}
        returnKeyType='go'
        autoCapitalize='words'
        onChangeText={onQueryChange}
        onSubmitEditing={onSubmit}
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
    color: NEUTRAL_COLOR,
  },
})

export default Search
