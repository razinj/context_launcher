import { useEffect } from 'react'
import { NativeEventEmitter, NativeModules } from 'react-native'
import { PACKAGE_CHANGE_EVENT_NAME } from '../constants'
import { PackageChange } from '../models/event'

export const usePackageChange = (callback: (packageChange: PackageChange) => void) => {
  useEffect(() => {
    const nativeEventEmitter = new NativeEventEmitter(NativeModules.AppsModule)
    const eventListener = nativeEventEmitter.addListener(PACKAGE_CHANGE_EVENT_NAME, (packageChange: PackageChange) => {
      callback(packageChange)
    })

    return () => {
      eventListener.remove()
      nativeEventEmitter.removeAllListeners(PACKAGE_CHANGE_EVENT_NAME)
    }
  }, [callback])
}
