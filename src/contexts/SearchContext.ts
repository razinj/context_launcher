// React
import { createContext, RefObject } from 'react'
// React Native
import { TextInput } from 'react-native'

export type SearchContextType = {
  searchInputRef: RefObject<TextInput> | null
  triggerAppLaunchedProcedure: () => void
  invalidCharacters: boolean
  setInvalidCharacters: (isInvalid: boolean) => void
}

const SearchContext = createContext<SearchContextType>({} as SearchContextType)

export default SearchContext
