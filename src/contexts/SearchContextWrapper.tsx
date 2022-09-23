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
// Analytics
import perf from '@react-native-firebase/perf'
// Models
import { SearchContextWrapperProps as Props } from '../models/props'

const SearchContextWrapper = ({ children }: Props) => {
  const keyboard = useKeyboard()
  const searchInputRef: RefObject<TextInput> | null = useRef(null)
  const [invalidCharacters, setInvalidCharacters] = useState(false)

  const dismissKeyboardAndBlurSearchInput = async () => {
    const trace = await perf().startTrace('search_context_dismiss_keyboard_blur_input')

    // Dismiss keyboard
    if (keyboard.isShown) dismissKeyboard()
    // Remove search input focus
    if (searchInputRef.current?.isFocused()) searchInputRef.current?.blur()

    await trace.stop()
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
