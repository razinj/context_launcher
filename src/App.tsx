// React
import React, { useEffect } from 'react'
// React Native
import { StatusBar } from 'react-native'
// Redux
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
// Contexts wrappers
import GlobalContextWrapper from './contexts/GlobalContextWrapper'
import SearchContextWrapper from './contexts/SearchContextWrapper'
// Components
import Home from './Home'
import AppItemMenu from './components/AppItemMenu'
import Settings from './components/Settings/SettingsBottomSheet'
// State
import { persistor, store } from './store'
// Gesture Handler
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const App = () => {
  useEffect(() => {
    StatusBar.setTranslucent(true)
    StatusBar.setBackgroundColor('transparent', true)
  }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GlobalContextWrapper>
          <SearchContextWrapper>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <Home />
              <AppItemMenu />
              <Settings />
            </GestureHandlerRootView>
          </SearchContextWrapper>
        </GlobalContextWrapper>
      </PersistGate>
    </Provider>
  )
}

export default App
