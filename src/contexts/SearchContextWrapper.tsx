import React, { PropsWithChildren, RefObject, useMemo, useRef } from 'react'
import { TextInput } from 'react-native'
import SearchContext, { SearchContextType } from './SearchContext'

const SearchContextWrapper = ({ children }: PropsWithChildren) => {
  const searchInputRef: RefObject<TextInput> | null = useRef(null)

  const clearSearchInput = () => {
    searchInputRef.current?.clear()
  }

  const searchAppLaunchProcedure = () => {
    clearSearchInput()
    searchInputRef.current?.blur()
  }

  const value: SearchContextType = useMemo(
    () => ({ searchInputRef, clearSearchInput, searchAppLaunchProcedure } as SearchContextType),
    [searchInputRef]
  )

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
}

export default SearchContextWrapper
