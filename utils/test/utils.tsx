import { configureStore, PreloadedState, Store } from '@reduxjs/toolkit'
import { render, RenderOptions } from '@testing-library/react-native'
import React, { PropsWithChildren, ReactElement } from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import { Provider as StoreProvider } from 'react-redux'
import SearchContext, { SearchContextType } from '../../src/contexts/SearchContext'

import { rootReducer, RootState } from '../../src/store'
import { defaultSearchContextValue, initialStoreState } from './data'

interface ExtendedRenderOptions extends RenderOptions {
  preloadedState?: PreloadedState<RootState>
  store?: Store
  searchContextValue?: SearchContextType
}

export const renderWithProvider = (
  component: ReactElement,
  {
    preloadedState = initialStoreState,
    store = configureStore({ reducer: rootReducer, preloadedState }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  const wrapper = ({ children }: PropsWithChildren): JSX.Element => {
    return (
      <StoreProvider store={store}>
        <PaperProvider>{children}</PaperProvider>
      </StoreProvider>
    )
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(component, { wrapper, ...renderOptions }) }
}

export const renderWithProviderAndContexts = (
  component: ReactElement,
  {
    preloadedState = initialStoreState,
    searchContextValue = defaultSearchContextValue,
    store = configureStore({ reducer: rootReducer, preloadedState }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  const wrapper = ({ children }: PropsWithChildren): JSX.Element => {
    return (
      <StoreProvider store={store}>
        <SearchContext.Provider value={searchContextValue}>
          <PaperProvider>{children}</PaperProvider>
        </SearchContext.Provider>
      </StoreProvider>
    )
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(component, { wrapper, ...renderOptions }) }
}
