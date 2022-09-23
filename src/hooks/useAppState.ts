// React
import { useEffect } from 'react'
// React Native
import { AppState, AppStateStatus } from 'react-native'
// Constants
import { APP_STATE_CHANGE_EVENT } from '../constants'

export const useAppState = (handler: (newState: AppStateStatus) => void) => {
  useEffect(() => {
    const subscription = AppState.addEventListener(APP_STATE_CHANGE_EVENT, handler)

    return () => subscription.remove()
  }, [handler])
}
