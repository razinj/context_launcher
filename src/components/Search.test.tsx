import { fireEvent, screen } from '@testing-library/react-native'
import React from 'react'
import { getAppForTestsByName, initialStoreState } from '../../utils/test/data'
import { renderWithProvider, renderWithProviderAndContexts } from '../../utils/test/utils'
import { RootState } from '../store'
import Search from './Search'

describe('<Search /> Tests', () => {
  it('should render correctly and match snapshot', () => {
    renderWithProvider(<Search />)

    expect(screen.toJSON()).toMatchSnapshot()
    expect(screen.getByTestId('search-input')).toBeOnTheScreen()
    expect(screen.queryByTestId('search-input-clear-button')).toBeNull()
  })

  it('should render correctly and match snapshot with clear button', () => {
    const customInitialState: RootState = {
      ...initialStoreState,
      appState: {
        ...initialStoreState.appState,
        search: {
          query: 'a-search-query',
          result: [],
        },
      },
    }

    renderWithProvider(<Search />, { preloadedState: customInitialState })

    expect(screen.toJSON()).toMatchSnapshot()
    expect(screen.getByTestId('search-input')).toBeOnTheScreen()
    expect(screen.getByTestId('search-input-clear-button')).toBeOnTheScreen()
  })

  it('should update query when text changes and clear query when clear button is pressed', () => {
    const customInitialState: RootState = {
      ...initialStoreState,
      appState: {
        ...initialStoreState.appState,
        search: {
          query: undefined,
          result: [],
        },
      },
    }

    const { store } = renderWithProviderAndContexts(<Search />, { preloadedState: customInitialState })

    const searchInput = screen.getByTestId('search-input')

    expect(searchInput).toBeOnTheScreen()

    fireEvent.changeText(searchInput, 'A search token')

    expect(store.getState().appState.search.query).toBe('A search token')

    const searchInputClearButton = screen.getByTestId('search-input-clear-button')

    expect(searchInputClearButton).toBeOnTheScreen()

    fireEvent.press(searchInputClearButton)

    expect(store.getState().appState.search.query).toBeUndefined()
  })

  it('should set correct result list when using correct query and reset search values when clear button is pressed', () => {
    const chromeAppDetails = getAppForTestsByName('Chrome')!
    const customInitialState: RootState = {
      ...initialStoreState,
      appsList: {
        list: [chromeAppDetails, getAppForTestsByName('Maps')!],
      },
      appState: {
        ...initialStoreState.appState,
        search: {
          query: undefined,
          result: [],
        },
      },
    }

    const { store } = renderWithProviderAndContexts(<Search />, { preloadedState: customInitialState })

    const searchInput = screen.getByTestId('search-input')

    expect(searchInput).toBeOnTheScreen()

    fireEvent.changeText(searchInput, '  chr  ') // Whitespace to test trimming

    let currentState = store.getState()

    expect(currentState.appState.search.query).toBe('chr')
    expect(currentState.appState.search.result).toEqual([chromeAppDetails])

    const searchInputClearButton = screen.getByTestId('search-input-clear-button')

    expect(searchInputClearButton).toBeOnTheScreen()

    fireEvent.press(searchInputClearButton)

    currentState = { ...store.getState() }

    expect(currentState.appState.search.query).toBeUndefined()
    expect(currentState.appState.search.result).toEqual([])
  })

  it('should set correct result list when using wrong query and reset search values when clear button is pressed', () => {
    const customInitialState: RootState = {
      ...initialStoreState,
      appsList: {
        list: [getAppForTestsByName('Chrome')!],
      },
      appState: {
        ...initialStoreState.appState,
        search: {
          query: undefined,
          result: [],
        },
      },
    }

    const { store } = renderWithProviderAndContexts(<Search />, { preloadedState: customInitialState })

    const searchInput = screen.getByTestId('search-input')

    expect(searchInput).toBeOnTheScreen()

    fireEvent.changeText(searchInput, 'youtube')

    let currentState = store.getState()

    expect(currentState.appState.search.query).toBe('youtube')
    expect(currentState.appState.search.result).toEqual([])

    const searchInputClearButton = screen.getByTestId('search-input-clear-button')

    expect(searchInputClearButton).toBeOnTheScreen()

    fireEvent.press(searchInputClearButton)

    currentState = { ...store.getState() }

    expect(currentState.appState.search.query).toBeUndefined()
    expect(currentState.appState.search.result).toEqual([])
  })

  test.todo('cover all possible cases for the search functionality')
})
