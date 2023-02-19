import React from 'react'
import { fireEvent, screen } from '@testing-library/react-native'
import { initialStoreState } from '../../utils/test/data'
import { renderWithProviderAndContexts, renderWithProvider } from '../../utils/test/utils'
import Search from './Search'

describe('<Search /> Tests', () => {
  it('should render correctly and match snapshot', () => {
    renderWithProvider(<Search />)

    expect(screen.toJSON()).toMatchSnapshot()
    expect(screen.getByTestId('search-input')).toBeOnTheScreen()
    expect(screen.queryByTestId('search-input-clear-button')).toBeNull()
  })

  it('should render correctly and match snapshot with clear button', () => {
    const customInitialState = {
      ...initialStoreState,
      appsSearch: {
        ...initialStoreState.appsSearch,
        query: 'a-search-query',
      },
    }

    renderWithProvider(<Search />, { preloadedState: customInitialState })

    expect(screen.toJSON()).toMatchSnapshot()
    expect(screen.getByTestId('search-input')).toBeOnTheScreen()
    expect(screen.getByTestId('search-input-clear-button')).toBeOnTheScreen()
  })

  it('should update query when text changes and clear query when clear button is pressed', () => {
    const customInitialState = {
      ...initialStoreState,
      appsSearch: {
        ...initialStoreState.appsSearch,
        query: undefined,
      },
    }

    const { store } = renderWithProviderAndContexts(<Search />, { preloadedState: customInitialState })

    const searchInput = screen.getByTestId('search-input')

    expect(searchInput).toBeOnTheScreen()

    fireEvent.changeText(searchInput, 'a-search-query')

    expect(store.getState().appsSearch.query).toBe('a-search-query')

    const searchInputClearButton = screen.getByTestId('search-input-clear-button')

    expect(searchInputClearButton).toBeOnTheScreen()

    fireEvent.press(searchInputClearButton)

    expect(store.getState().appsSearch.query).toBeUndefined()
  })

  it('should set correct result list when using correct query and reset search values when clear button is pressed', () => {
    const customInitialState = {
      ...initialStoreState,
      appsList: {
        list: [
          {
            name: 'com.google.chrome',
            label: 'Chrome',
          },
          {
            name: 'com.google.maps',
            label: 'Maps',
          },
        ],
      },
      appsSearch: {
        query: undefined,
        result: [],
      },
    }

    const { store } = renderWithProviderAndContexts(<Search />, { preloadedState: customInitialState })

    const searchInput = screen.getByTestId('search-input')

    expect(searchInput).toBeOnTheScreen()

    fireEvent.changeText(searchInput, '  chr  ') // Whitespace to test trimming

    let currentState = store.getState()

    expect(currentState.appsSearch.query).toBe('chr')
    expect(currentState.appsSearch.result).toEqual([
      {
        name: 'com.google.chrome',
        label: 'Chrome',
      },
    ])

    const searchInputClearButton = screen.getByTestId('search-input-clear-button')

    expect(searchInputClearButton).toBeOnTheScreen()

    fireEvent.press(searchInputClearButton)

    currentState = { ...store.getState() }

    expect(currentState.appsSearch.query).toBeUndefined()
    expect(currentState.appsSearch.result).toEqual([])
  })

  it('should set correct result list when using wrong query and reset search values when clear button is pressed', () => {
    const customInitialState = {
      ...initialStoreState,
      appsList: {
        list: [
          {
            name: 'com.google.chrome',
            label: 'Chrome',
          },
        ],
      },
      appsSearch: {
        query: undefined,
        result: [],
      },
    }

    const { store } = renderWithProviderAndContexts(<Search />, { preloadedState: customInitialState })

    const searchInput = screen.getByTestId('search-input')

    expect(searchInput).toBeOnTheScreen()

    fireEvent.changeText(searchInput, 'youtube')

    let currentState = store.getState()

    expect(currentState.appsSearch.query).toBe('youtube')
    expect(currentState.appsSearch.result).toEqual([])

    const searchInputClearButton = screen.getByTestId('search-input-clear-button')

    expect(searchInputClearButton).toBeOnTheScreen()

    fireEvent.press(searchInputClearButton)

    currentState = { ...store.getState() }

    expect(currentState.appsSearch.query).toBeUndefined()
    expect(currentState.appsSearch.result).toEqual([])
  })

  test.todo('cover all possible cases for the search functionality')
})
