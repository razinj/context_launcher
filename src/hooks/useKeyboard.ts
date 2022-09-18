// React
import { useEffect, useState } from 'react'
// React Native
import { EmitterSubscription, Keyboard, KeyboardEventListener } from 'react-native'
// Constants
import { KEYBOARD_DID_HIDE_EVENT_NAME, KEYBOARD_DID_SHOW_EVENT_NAME } from '../constants'

export const useKeyboard = () => {
  const [shown, setShown] = useState(false)

  const handleKeyboardDidShow: KeyboardEventListener = () => setShown(true)
  const handleKeyboardDidHide: KeyboardEventListener = () => setShown(false)

  useEffect(() => {
    const subscriptions: EmitterSubscription[] = [
      Keyboard.addListener(KEYBOARD_DID_SHOW_EVENT_NAME, handleKeyboardDidShow),
      Keyboard.addListener(KEYBOARD_DID_HIDE_EVENT_NAME, handleKeyboardDidHide),
    ]

    return () => subscriptions.forEach(subscription => subscription.remove())
  }, [])

  return { isShown: shown }
}
