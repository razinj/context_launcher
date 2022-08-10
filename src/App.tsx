// React
import React from 'react'
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
import SettingsModal from './components/SettingsModal'
// State
import { persistor, store } from './store'

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar barStyle={useColorScheme() === 'dark' ? 'light-content' : 'dark-content'} animated={true} />
        <GlobalContextWrapper>
          <SearchContextWrapper>
            <Home />
            <SettingsModal />
          </SearchContextWrapper>
        </GlobalContextWrapper>
      </PersistGate>
    </Provider>
  )
}

export default App
