// React
import { createContext } from 'react'

export type GlobalContextType = {
  toggleDisplayAllApps: () => void
  displayAllApps: boolean
  toggleDisplaySettingsModal: () => void
  displaySettingsModal: boolean
}

const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType)

export default GlobalContext
