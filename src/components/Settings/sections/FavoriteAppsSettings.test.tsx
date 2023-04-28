import { fireEvent, screen } from '@testing-library/react-native'
import React from 'react'
import { getAppsForTests, initialStoreState } from '../../../../utils/test/data'
import { renderWithProvider } from '../../../../utils/test/utils'
import { sortFavoriteApps } from '../../../slices/appState'
import { clearFavoriteApps } from '../../../slices/favoriteApps'
import { displayFavoriteApps } from '../../../slices/preferences'
import { RootState } from '../../../store'
import * as ToastModule from '../../../utils/toast'
import FavoriteAppsSettings from './FavoriteAppsSettings'

const useDispatchMock = jest.fn()

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => useDispatchMock,
}))

describe('<FavoriteAppsSettings /> Tests', () => {
  beforeAll(() => {
    jest.spyOn(ToastModule, 'displayToast')
  })

  it('should render correctly and match snapshot', () => {
    renderWithProvider(<FavoriteAppsSettings />)

    expect(screen.toJSON()).toMatchSnapshot()
    expect(screen.getByTestId('display-switch')).toBeOnTheScreen()
    expect(screen.getByTestId('sort-button')).toBeOnTheScreen()
    expect(screen.getByTestId('clear-button')).toBeOnTheScreen()
  })

  it('should dispatch action to clear favorite apps when button is pressed', () => {
    renderWithProvider(<FavoriteAppsSettings />)

    const clearFavoriteAppsButton = screen.getByTestId('clear-button')

    expect(clearFavoriteAppsButton).toBeOnTheScreen()

    fireEvent.press(clearFavoriteAppsButton)

    expect(useDispatchMock).toBeCalledWith(clearFavoriteApps())
    expect(ToastModule.displayToast).toBeCalledWith('Favorite apps cleared successfully!')
  })

  describe('Sort favorite apps button tests', () => {
    it('should render sort favorite apps button as disabled if favorite apps are <= 1', () => {
      const customInitialStoreState: RootState = {
        ...initialStoreState,
        favoriteApps: {
          list: getAppsForTests(1),
        },
        preferences: {
          ...initialStoreState.preferences,
          displayFavoriteApps: true,
        },
      }

      renderWithProvider(<FavoriteAppsSettings />, { preloadedState: customInitialStoreState })

      expect(screen.getByTestId('sort-button')).toBeDisabled()
      expect(screen.getByText(/Add more apps to be able to sort/)).toBeOnTheScreen()
    })

    it('should render sort favorite apps button as disabled if display favorite apps value is false', () => {
      const customInitialStoreState: RootState = {
        ...initialStoreState,
        favoriteApps: {
          list: getAppsForTests(2),
        },
        preferences: {
          ...initialStoreState.preferences,
          displayFavoriteApps: false,
        },
      }

      renderWithProvider(<FavoriteAppsSettings />, { preloadedState: customInitialStoreState })

      expect(screen.getByTestId('sort-button')).toBeDisabled()
      expect(screen.getByText(/Display favorite apps to be able to sort/)).toBeOnTheScreen()
    })

    it('should render sort favorite apps button as enabled if favorite apps are > 1 and display favorite apps value is true', () => {
      const customInitialStoreState: RootState = {
        ...initialStoreState,
        favoriteApps: {
          list: getAppsForTests(2),
        },
        preferences: {
          ...initialStoreState.preferences,
          displayFavoriteApps: true,
        },
      }

      renderWithProvider(<FavoriteAppsSettings />, { preloadedState: customInitialStoreState })

      expect(screen.getByTestId('sort-button')).not.toBeDisabled()
      expect(screen.getByText(/Click to start sorting/)).toBeOnTheScreen()
    })

    it('should dispatch action to sort favorite when button is pressed', () => {
      const customInitialStoreState: RootState = {
        ...initialStoreState,
        favoriteApps: {
          list: getAppsForTests(2),
        },
        preferences: {
          ...initialStoreState.preferences,
          displayFavoriteApps: true,
        },
      }

      renderWithProvider(<FavoriteAppsSettings />, { preloadedState: customInitialStoreState })

      const sortFavoriteAppsButton = screen.getByTestId('sort-button')

      expect(sortFavoriteAppsButton).toBeOnTheScreen()
      expect(sortFavoriteAppsButton).not.toBeDisabled()

      fireEvent.press(sortFavoriteAppsButton)

      expect(useDispatchMock).toBeCalledWith(sortFavoriteApps())
    })
  })

  it('should dispatch action to toggle favorite apps view when button is pressed', () => {
    const customInitialStoreState: RootState = {
      ...initialStoreState,
      preferences: {
        ...initialStoreState.preferences,
        displayFavoriteApps: false,
      },
    }

    renderWithProvider(<FavoriteAppsSettings />, { preloadedState: customInitialStoreState })

    const toggleFavoriteAppsSwitch = screen.getByTestId('display-switch')

    expect(toggleFavoriteAppsSwitch).toBeOnTheScreen()
    expect(toggleFavoriteAppsSwitch).not.toBeDisabled()

    fireEvent(toggleFavoriteAppsSwitch, 'valueChange')

    expect(useDispatchMock).toBeCalledWith(displayFavoriteApps(true))
  })
})
