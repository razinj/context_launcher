import { ToastAndroid } from 'react-native'

export const displayToast = (message: string, duration: number = ToastAndroid.SHORT) => {
  ToastAndroid.show(message, duration)
}
