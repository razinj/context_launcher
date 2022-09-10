// React
import { createContext, RefObject } from 'react'
// BottomSheet
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { AppDetailsWithIcon } from '../models/app-details'

export type GlobalContextType = {
  hideAllApps: () => void
  toggleDisplayAllApps: () => void
  displayAllApps: boolean
  settingsBottomSheetRef: RefObject<BottomSheetModal> | null
  displaySettingsBottomSheet: () => void
  appItemMenuDetails: AppDetailsWithIcon | undefined
  setAppItemMenuDetails: (appDetails: AppDetailsWithIcon) => void
  appItemMenuBottomSheetRef: RefObject<BottomSheetModal> | null
  displayAppItemMenuBottomSheet: () => void
  sortableFavoriteApps: boolean
  toggleSortableFavoriteApps: () => void
}

const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType)

export default GlobalContext
