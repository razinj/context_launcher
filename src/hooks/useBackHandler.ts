// React
import { useEffect } from 'react'
// React Native
import { BackHandler } from 'react-native'

export const useBackHandler = (handler: () => boolean) => {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handler)

    return () => BackHandler.removeEventListener('hardwareBackPress', handler)
  }, [handler])
}
