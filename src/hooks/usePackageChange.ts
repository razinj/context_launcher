import { useEffect } from 'react'
import { NativeEventEmitter, NativeModules } from 'react-native'
import { PACKAGE_CHANGE_EVENT_NAME, PACKAGE_CHANGE_EVENT_NAME_X } from '../constants'
import { AppDetails } from '../models/app-details'
import { PackageChange } from '../models/event'
import { displayToast } from '../utils/toast'

export const usePackageChange = (callback: (packageChange: PackageChange) => void) => {
  useEffect(() => {
    // console.log('usePackageChange');

    const nativeEventEmitter = new NativeEventEmitter(NativeModules.AppsModule)
    const eventListener = nativeEventEmitter.addListener(PACKAGE_CHANGE_EVENT_NAME, (packageChange: PackageChange) => {
      callback(packageChange)
    })
    const eventListenerX = nativeEventEmitter.addListener(PACKAGE_CHANGE_EVENT_NAME_X, (applications: string) => {
      console.log('eventListenerX')
      const apps = JSON.parse(applications) as AppDetails[]
      displayToast('apps found from event: ' + apps.length)
    })

    return () => {
      eventListener.remove()
      eventListenerX.remove()
      nativeEventEmitter.removeAllListeners(PACKAGE_CHANGE_EVENT_NAME)
      nativeEventEmitter.removeAllListeners(PACKAGE_CHANGE_EVENT_NAME_X)
    }
  }, [callback])
}
//PACKAGE_CHANGE_EVENT_NAME_X
