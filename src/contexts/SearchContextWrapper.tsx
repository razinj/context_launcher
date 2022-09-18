// React
import React, { RefObject, useRef, useState } from 'react'
// React Native
import { TextInput } from 'react-native'
// Context
import SearchContext from './SearchContext'
// Utils
import { dismissKeyboard } from '../utils/keyboard'
// Custom Hooks
import { useKeyboard } from '../hooks/useKeyboard'
// Models
import { SearchContextWrapperProps as Props } from '../models/props'

const SearchContextWrapper = ({ children }: Props) => {
  const keyboard = useKeyboard()
  const searchInputRef: RefObject<TextInput> | null = useRef(null)
  const [invalidCharacters, setInvalidCharacters] = useState(false)

  const dismissKeyboardAndBlurSearchInput = () => {
    // Dismiss keyboard
    if (keyboard.isShown) dismissKeyboard()
    // Remove search input focus
    if (searchInputRef.current?.isFocused()) searchInputRef.current?.blur()
  }

  return (
    <SearchContext.Provider
      value={{
        searchInputRef,
        searchAppLaunchProcedure: dismissKeyboardAndBlurSearchInput,
        invalidCharacters,
        setInvalidCharacters: (isInvalid: boolean) => setInvalidCharacters(isInvalid),
      }}>
      {children}
    </SearchContext.Provider>
  )
}

export default SearchContextWrapper
