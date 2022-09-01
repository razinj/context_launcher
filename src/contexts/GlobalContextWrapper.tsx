// React
import React, { RefObject, useRef, useState } from 'react'
// Context
import GlobalContext from './GlobalContext'
// BottomSheet
import { BottomSheetModal } from '@gorhom/bottom-sheet'
// Models
import { GlobalContextWrapperProps as Props } from '../models/props'

const GlobalContextWrapper = ({ children }: Props) => {
  const [displayAllApps, setDisplayAllApps] = useState(false)
  const [sortableFavoriteApps, setSortableFavoriteApps] = useState(false)
  const settingsBottomSheetRef: RefObject<BottomSheetModal> | null = useRef(null)

  return (
    <GlobalContext.Provider
      value={{
        hideAllApps: () => setDisplayAllApps(false),
        displayAllApps,
        toggleDisplayAllApps: () => setDisplayAllApps(!displayAllApps),
        settingsBottomSheetRef,
        displaySettingsBottomSheet: () => settingsBottomSheetRef.current?.present(),
        sortableFavoriteApps,
        toggleSortableFavoriteApps: () => setSortableFavoriteApps(!sortableFavoriteApps),
      }}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContextWrapper
