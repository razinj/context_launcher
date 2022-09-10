// React
import React, { useEffect } from 'react'
// React Native
import { StatusBar, useColorScheme } from 'react-native'
// Redux
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
// Contexts wrappers
import GlobalContextWrapper from './contexts/GlobalContextWrapper'
import SearchContextWrapper from './contexts/SearchContextWrapper'
// Components
import Home from './Home'
import AppItemMenu from './components/AppItemMenu'
import SettingsBottomSheet from './components/SettingsBottomSheet'
// State
import { persistor, store } from './store'
// Gesture Handler
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const App = () => {
  const colorScheme = useColorScheme()

  useEffect(() => {
    if (!colorScheme) StatusBar.setBarStyle('default', true)
    else StatusBar.setBarStyle(colorScheme === 'dark' ? 'light-content' : 'dark-content', true)
  }, [colorScheme])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GlobalContextWrapper>
          <SearchContextWrapper>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <Home />
              <AppItemMenu />
              <SettingsBottomSheet />
            </GestureHandlerRootView>
          </SearchContextWrapper>
        </GlobalContextWrapper>
      </PersistGate>
    </Provider>
  )
}

export default App
