// React
import { useEffect } from 'react'
// React Native
import { NativeEventEmitter, NativeModules } from 'react-native'
// Models
import { PackageChange } from '../models/props'

export const usePackageChange = (callback: (packageName: string) => void) => {
  useEffect(() => {
    const nativeEventEmitter = new NativeEventEmitter(NativeModules.AppsModule)
    const eventListener = nativeEventEmitter.addListener('packageChange', ({ packageName }: PackageChange) => {
      callback(packageName)
    })

    return () => {
      eventListener.remove()
      nativeEventEmitter.removeAllListeners('packageChange')
    }
  }, [callback])
}
