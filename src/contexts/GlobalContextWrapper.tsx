// React
import React, { RefObject, useRef, useState } from 'react'
// Context
import GlobalContext from './GlobalContext'
// Hooks
import { useKeyboard } from '../hooks/useKeyboard'
// Utils
import { dismissKeyboard } from '../utils/keyboard'
// BottomSheet
import { BottomSheetModal } from '@gorhom/bottom-sheet'
// Models
import { AppDetailsOptionalIcon } from '../models/app-details'
import { GlobalContextWrapperProps as Props } from '../models/props'

const GlobalContextWrapper = ({ children }: Props) => {
  const keyboard = useKeyboard()
  const [displayAllApps, setDisplayAllApps] = useState(false)
  const [sortableFavoriteApps, setSortableFavoriteApps] = useState(false)
  const settingsBottomSheetRef: RefObject<BottomSheetModal> | null = useRef(null)
  const appItemMenuBottomSheetRef: RefObject<BottomSheetModal> | null = useRef(null)
  const [appItemMenuDetails, setAppItemMenuDetails] = useState<AppDetailsOptionalIcon | null>(null)

  const hideAllApps = () => {
    if (displayAllApps) setDisplayAllApps(false)
  }

  const appLaunchProcedure = () => {
    // Hide all apps view
    hideAllApps()
    // Hide favorite apps sort view
    if (sortableFavoriteApps) setSortableFavoriteApps(false)
    // Close settings bottom sheet
    settingsBottomSheetRef.current?.dismiss()
    // Close app item menu sheet
    appItemMenuBottomSheetRef.current?.dismiss()
    // Reset app menu data
    if (!appItemMenuDetails) setAppItemMenuDetails(null)
  }

  const closeKeyboard = () => {
    if (keyboard.isShown) dismissKeyboard()
  }

  const toggleSortableFavoriteApps = () => {
    if (!sortableFavoriteApps) {
      // Hide all apps view
      hideAllApps()
      // Close settings bottom sheet
      settingsBottomSheetRef.current?.dismiss()
    }

    setSortableFavoriteApps(!sortableFavoriteApps)
  }

  return (
    <GlobalContext.Provider
      value={{
        globalAppLaunchProcedure: appLaunchProcedure,
        hideAllApps,
        displayAllApps,
        toggleDisplayAllApps: () => setDisplayAllApps(!displayAllApps),
        settingsBottomSheetRef,
        displaySettingsBottomSheet: () => settingsBottomSheetRef.current?.present(),
        appItemMenuDetails,
        setAppItemMenuDetails: (appDetails: AppDetailsOptionalIcon) => setAppItemMenuDetails(appDetails),
        appItemMenuBottomSheetRef,
        displayAppItemMenuBottomSheet: () => appItemMenuBottomSheetRef.current?.present(),
        sortableFavoriteApps,
        toggleSortableFavoriteApps,
        dismissKeyboard: closeKeyboard,
      }}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContextWrapper
