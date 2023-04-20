import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Provider as PaperProvider } from 'react-native-paper'
import { Provider as StoreProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import AppItemMenu from './components/AppItemMenu'
import Settings from './components/Settings/Settings'
import SearchContextWrapper from './contexts/SearchContextWrapper'
import Home from './Home'
import { persistor, store } from './store'

const App = () => {
  useEffect(() => {
    StatusBar.setTranslucent(true)
    StatusBar.setBackgroundColor('transparent', true)
  }, [])

  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SearchContextWrapper>
          <PaperProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <Home />
              <AppItemMenu />
              <Settings />
            </GestureHandlerRootView>
          </PaperProvider>
        </SearchContextWrapper>
      </PersistGate>
    </StoreProvider>
  )
}

export default App
