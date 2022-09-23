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
// Analytics
import perf from '@react-native-firebase/perf'
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

  const hideAllApps = async () => {
    const trace = await perf().startTrace('global_context_hide_all_apps')

    if (displayAllApps) setDisplayAllApps(false)

    await trace.stop()
  }

  const appLaunchProcedure = async () => {
    const trace = await perf().startTrace('global_context_app_launch_procedure')

    // Hide all apps view
    hideAllApps()
    // Hide favorite apps sort view
    if (sortableFavoriteApps) setSortableFavoriteApps(false)
    // Close settings bottom sheet
    settingsBottomSheetRef.current?.close()
    // Close app item menu sheet
    appItemMenuBottomSheetRef.current?.close()
    // Reset app menu data
    if (!appItemMenuDetails) setAppItemMenuDetails(null)

    await trace.stop()
  }

  const closeKeyboard = async () => {
    const trace = await perf().startTrace('global_context_close_keyboard')

    if (keyboard.isShown) dismissKeyboard()

    await trace.stop()
  }

  const toggleSortableFavoriteApps = async () => {
    const trace = await perf().startTrace('global_context_toggle_sortable_favorite_apps')

    if (!sortableFavoriteApps) {
      // Hide all apps view
      hideAllApps()
      // Close settings bottom sheet
      settingsBottomSheetRef.current?.close()
    }

    setSortableFavoriteApps(!sortableFavoriteApps)

    await trace.stop()
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
