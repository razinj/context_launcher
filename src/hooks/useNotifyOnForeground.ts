import { useEffect, useRef } from 'react'
import { AppState } from 'react-native'

export const useNotifyOnForeground = (callback: () => void) => {
  const appState = useRef(AppState.currentState)

  useEffect(() => {
    const subscription = AppState.addEventListener('change', newAppState => {
      if (appState.current.match(/inactive|background/) && newAppState === 'active') {
        callback()
      }

      appState.current = newAppState
    })

    return () => {
      subscription.remove()
    }
  }, [callback])
}
