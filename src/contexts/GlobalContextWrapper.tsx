import React, { FC, useState } from 'react'
import { GlobalContextWrapperProps as Props } from '../models/props'
import GlobalContext from './GlobalContext'

const GlobalContextWrapper: FC<Props> = ({ children }) => {
  const [displayAllApps, setDisplayAllApps] = useState(false)
  const [displaySettingsModal, setDisplaySettingsModal] = useState(false)

  return (
    <GlobalContext.Provider
      value={{
        displayAllApps,
        toggleDisplayAllApps: () => setDisplayAllApps(!displayAllApps),
        displaySettingsModal,
        toggleDisplaySettingsModal: () => setDisplaySettingsModal(!displaySettingsModal),
      }}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContextWrapper
