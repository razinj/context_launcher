// React
import { createContext } from 'react'
// Models
import { SearchContextType } from '../models/context'

const SearchContext = createContext<SearchContextType>({} as SearchContextType)

export default SearchContext
