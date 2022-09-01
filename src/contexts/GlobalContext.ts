// React
import { createContext, RefObject } from 'react'
// BottomSheet
import { BottomSheetModal } from '@gorhom/bottom-sheet'

export type GlobalContextType = {
  hideAllApps: () => void
  toggleDisplayAllApps: () => void
  displayAllApps: boolean
  settingsBottomSheetRef: RefObject<BottomSheetModal> | null
  displaySettingsBottomSheet: () => void
  sortableFavoriteApps: boolean
  toggleSortableFavoriteApps: () => void
}

const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType)

export default GlobalContext
