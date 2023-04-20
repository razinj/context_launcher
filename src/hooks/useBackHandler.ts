import { useEffect } from 'react'
import { BackHandler } from 'react-native'
import { HARDWARE_BACK_PRESS_EVENT_NAME } from '../constants'

export const useBackHandler = (handler: () => boolean) => {
  useEffect(() => {
    BackHandler.addEventListener(HARDWARE_BACK_PRESS_EVENT_NAME, handler)

    return () => {
      BackHandler.removeEventListener(HARDWARE_BACK_PRESS_EVENT_NAME, handler)
    }
  }, [handler])
}
