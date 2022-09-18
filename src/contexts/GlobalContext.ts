// React
import { createContext } from 'react'
// Models
import { GlobalContextType } from '../models/context'

const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType)

export default GlobalContext
