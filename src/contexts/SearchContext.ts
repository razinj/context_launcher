import { createContext, RefObject } from 'react'
import { TextInput } from 'react-native'

export type SearchContextType = {
  searchInputRef: RefObject<TextInput> | null
  clearSearchInput: () => void
  clearAndBlurSearchInput: () => void
}

const SearchContext = createContext<SearchContextType>({} as SearchContextType)

export default SearchContext
