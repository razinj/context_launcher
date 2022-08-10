// React
import { useEffect, useState } from 'react'
// React Native
import { EmitterSubscription, Keyboard, KeyboardEventListener } from 'react-native'

export const useKeyboard = () => {
  const [shown, setShown] = useState(false)

  const handleKeyboardDidShow: KeyboardEventListener = () => setShown(true)
  const handleKeyboardDidHide: KeyboardEventListener = () => setShown(false)

  useEffect(() => {
    const subscriptions: EmitterSubscription[] = [
      Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow),
      Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide),
    ]

    return () => subscriptions.forEach(subscription => subscription.remove())
  }, [])

  return { isShown: shown }
}
