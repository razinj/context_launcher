import { ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { configureStore, PreloadedState, Store } from '@reduxjs/toolkit'
import { render, RenderOptions } from '@testing-library/react-native'
import { rootReducer, RootState } from '../../src/store'
import { GlobalContextType, SearchContextType } from '../../src/models/context'
import GlobalContext from '../../src/contexts/GlobalContext'
import SearchContext from '../../src/contexts/SearchContext'

interface ExtendedRenderOptions extends RenderOptions {
  preloadedState?: PreloadedState<RootState>
  store?: Store
  globalContextValue?: GlobalContextType
  searchContextValue?: SearchContextType
}

export const initialState = {
  appsList: {
    list: [],
  },
  appsSearch: {
    query: undefined,
    result: [],
  },
  favoriteApps: {
    list: [],
  },
  preferences: {
    displayFavoriteApps: true,
    displayRecentApps: true,
  },
  recentApps: {
    list: [],
  },
}

export const renderWithProvider = (
  component: ReactElement,
  {
    preloadedState = initialState,
    store = configureStore({ reducer: rootReducer, preloadedState }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  const wrapper = ({ children }: { children: ReactNode }): JSX.Element => {
    return <Provider store={store}>{children}</Provider>
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(component, { wrapper, ...renderOptions }) }
}

export const defaultGlobalContextValue: GlobalContextType = {
  dismissKeyboard: jest.fn(),
  globalAppLaunchProcedure: jest.fn(),
  displayAllApps: false,
  hideAllApps: jest.fn(),
  toggleDisplayAllApps: jest.fn(),
  sortableFavoriteApps: false,
  toggleSortableFavoriteApps: jest.fn(),
  appItemMenuBottomSheetRef: null,
  displayAppItemMenuBottomSheet: jest.fn(),
  appItemMenuDetails: null,
  setAppItemMenuDetails: jest.fn(),
  settingsBottomSheetRef: null,
  displaySettingsBottomSheet: jest.fn(),
}

export const defaultSearchContextValue: SearchContextType = {
  searchInputRef: null,
  invalidCharacters: false,
  setInvalidCharacters: jest.fn(),
  searchAppLaunchProcedure: jest.fn(),
}

export const renderWithProviderAndContexts = (
  component: ReactElement,
  {
    preloadedState = initialState,
    globalContextValue = defaultGlobalContextValue,
    searchContextValue = defaultSearchContextValue,
    store = configureStore({ reducer: rootReducer, preloadedState }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  const wrapper = ({ children }: { children: ReactNode }): JSX.Element => {
    return (
      <Provider store={store}>
        <GlobalContext.Provider value={globalContextValue}>
          <SearchContext.Provider value={searchContextValue}>{children}</SearchContext.Provider>
        </GlobalContext.Provider>
      </Provider>
    )
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(component, { wrapper, ...renderOptions }) }
}
