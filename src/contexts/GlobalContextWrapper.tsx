// React
import React, { RefObject, useRef, useState } from 'react'
// Context
import GlobalContext from './GlobalContext'
// BottomSheet
import { BottomSheetModal } from '@gorhom/bottom-sheet'
// Models
import { GlobalContextWrapperProps as Props } from '../models/props'
import { AppDetailsWithIcon } from '../models/app-details'

const GlobalContextWrapper = ({ children }: Props) => {
  const [displayAllApps, setDisplayAllApps] = useState(false)
  const [sortableFavoriteApps, setSortableFavoriteApps] = useState(false)
  const settingsBottomSheetRef: RefObject<BottomSheetModal> | null = useRef(null)
  const appItemMenuBottomSheetRef: RefObject<BottomSheetModal> | null = useRef(null)
  const [appItemMenuDetails, setAppItemMenuDetails] = useState<AppDetailsWithIcon | undefined>(undefined)

  return (
    <GlobalContext.Provider
      value={{
        hideAllApps: () => setDisplayAllApps(false),
        displayAllApps,
        toggleDisplayAllApps: () => setDisplayAllApps(!displayAllApps),
        settingsBottomSheetRef,
        displaySettingsBottomSheet: () => settingsBottomSheetRef.current?.present(),
        appItemMenuDetails,
        setAppItemMenuDetails: (appDetails: AppDetailsWithIcon) => setAppItemMenuDetails(appDetails),
        appItemMenuBottomSheetRef,
        displayAppItemMenuBottomSheet: () => appItemMenuBottomSheetRef.current?.present(),
        sortableFavoriteApps,
        toggleSortableFavoriteApps: () => setSortableFavoriteApps(!sortableFavoriteApps),
      }}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContextWrapper
