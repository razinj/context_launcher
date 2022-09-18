// React
import { RefObject } from 'react'
// React Native
import { TextInput } from 'react-native'
// BottomSheet
import { BottomSheetModal } from '@gorhom/bottom-sheet'
// Models
import { AppDetailsOptionalIcon } from '../models/app-details'

export type GlobalContextType = {
  // All apps
  hideAllApps: () => void
  displayAllApps: boolean
  toggleDisplayAllApps: () => void
  // Settings bottom sheet
  settingsBottomSheetRef: RefObject<BottomSheetModal> | null
  displaySettingsBottomSheet: () => void
  // App item menu
  appItemMenuDetails: AppDetailsOptionalIcon | null
  setAppItemMenuDetails: (appDetails: AppDetailsOptionalIcon) => void
  appItemMenuBottomSheetRef: RefObject<BottomSheetModal> | null
  displayAppItemMenuBottomSheet: () => void
  // Favorite apps sort
  sortableFavoriteApps: boolean
  toggleSortableFavoriteApps: () => void
  // Global app launch procedure
  globalAppLaunchProcedure: () => void
  // Misc
  dismissKeyboard: () => void
}

export type SearchContextType = {
  // Search input
  searchInputRef: RefObject<TextInput> | null
  searchAppLaunchProcedure: () => void
  // Search query validity
  invalidCharacters: boolean
  setInvalidCharacters: (isInvalid: boolean) => void
}
