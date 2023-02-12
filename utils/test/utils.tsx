import { ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { configureStore, PreloadedState, Store } from '@reduxjs/toolkit'
import { render, RenderOptions } from '@testing-library/react-native'
import { rootReducer, RootState } from '../../src/store'
import GlobalContextWrapper from '../../src/contexts/GlobalContextWrapper'
import SearchContextWrapper from '../../src/contexts/SearchContextWrapper'

interface ExtendedRenderOptions extends RenderOptions {
  preloadedState?: PreloadedState<RootState>
  store?: Store
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

export const renderWithProviderAndContexts = (
  component: ReactElement,
  {
    preloadedState = initialState,
    store = configureStore({ reducer: rootReducer, preloadedState }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  const wrapper = ({ children }: { children: ReactNode }): JSX.Element => {
    return (
      <Provider store={store}>
        <GlobalContextWrapper>
          <SearchContextWrapper>{children}</SearchContextWrapper>
        </GlobalContextWrapper>
      </Provider>
    )
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(component, { wrapper, ...renderOptions }) }
}
