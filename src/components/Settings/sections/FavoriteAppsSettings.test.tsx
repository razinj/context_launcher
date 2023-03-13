import React from 'react'
import { fireEvent, screen } from '@testing-library/react-native'
import { defaultGlobalContextValue, initialStoreState } from '../../../../utils/test/data'
import { renderWithProvider, renderWithProviderAndContexts } from '../../../../utils/test/utils'
import { ToastAndroid } from 'react-native'
import { FavoriteApp } from '../../../models/favorite-app'
import FavoriteAppsSettings from './FavoriteAppsSettings'
import { GlobalContextType } from '../../../models/context'
import { PreferencesState } from '../../../slices/preferences'

describe('<FavoriteAppsSettings /> Tests', () => {
  beforeEach(() => {
    jest.spyOn(ToastAndroid, 'show')
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should render correctly and match snapshot', () => {
    renderWithProvider(<FavoriteAppsSettings />)

    expect(screen.toJSON()).toMatchSnapshot()
    expect(screen.getByTestId('settings-bottom-display-favorite-apps-switch')).toBeOnTheScreen()
    expect(screen.getByTestId('settings-bottom-sort-favorite-apps-button')).toBeOnTheScreen()
    expect(screen.getByTestId('advanced-settings-clear-favorite-apps-button')).toBeOnTheScreen()
  })

  it('should clear favorite apps when button is pressed', () => {
    const customInitialState = {
      ...initialStoreState,
      favoriteApps: {
        list: [
          {
            name: 'com.google.chrome',
            label: 'Chrome',
            icon: 'icon-base64-string-chrome',
          },
          {
            name: 'com.google.maps',
            label: 'Maps',
            icon: 'icon-base64-string-maps',
          },
        ] as FavoriteApp[],
      },
    }

    const { store } = renderWithProvider(<FavoriteAppsSettings />, { preloadedState: customInitialState })

    const clearFavoriteAppsButton = screen.getByTestId('advanced-settings-clear-favorite-apps-button')

    expect(clearFavoriteAppsButton).toBeOnTheScreen()

    fireEvent.press(clearFavoriteAppsButton)

    expect(store.getState().favoriteApps.list).toEqual([])
    expect(ToastAndroid.show).toBeCalledWith('Favorite apps cleared successfully!', ToastAndroid.LONG)
  })

  describe('Sort favorite apps button tests', () => {
    it('should render sort favorite apps button as disabled if favorite apps are <= 1', () => {
      const customInitialStoreState = {
        ...initialStoreState,
        favoriteApps: {
          list: [
            {
              name: 'com.google.chrome',
              label: 'Chrome',
              icon: 'icon-base64-string-chrome',
            },
          ] as FavoriteApp[],
        },
        preferences: {
          displayRecentApps: false,
          displayFavoriteApps: true,
          displayPinnedApps: false,
          displayTemporaryPinnedApps: true,
        } as PreferencesState,
      }

      renderWithProvider(<FavoriteAppsSettings />, { preloadedState: customInitialStoreState })

      expect(screen.getByTestId('settings-bottom-sort-favorite-apps-button')).toBeDisabled()
      expect(screen.getByText(/Sort/)).toBeOnTheScreen()
      expect(screen.getByText(/Add more apps to be able to sort/)).toBeOnTheScreen()
    })

    it('should render sort favorite apps button as disabled if display favorite apps value is false', () => {
      const customInitialStoreState = {
        ...initialStoreState,
        favoriteApps: {
          list: [
            {
              name: 'com.google.chrome',
              label: 'Chrome',
              icon: 'icon-base64-string-chrome',
            },
            {
              name: 'com.google.maps',
              label: 'Maps',
              icon: 'icon-base64-string-maps',
            },
          ] as FavoriteApp[],
        },
        preferences: {
          displayFavoriteApps: false,
          displayRecentApps: false,
          displayPinnedApps: false,
          displayTemporaryPinnedApps: true,
        } as PreferencesState,
      }

      renderWithProvider(<FavoriteAppsSettings />, { preloadedState: customInitialStoreState })

      expect(screen.getByTestId('settings-bottom-sort-favorite-apps-button')).toBeDisabled()
      expect(screen.getByText(/Sort/)).toBeOnTheScreen()
      expect(screen.getByText(/Display favorite apps to be able to sort/)).toBeOnTheScreen()
    })

    it('should not render sort favorite apps button as disabled if favorite apps are > 1 and display favorite apps value is true', () => {
      const customInitialStoreState = {
        ...initialStoreState,
        favoriteApps: {
          list: [
            {
              name: 'com.google.chrome',
              label: 'Chrome',
              icon: 'icon-base64-string-chrome',
            },
            {
              name: 'com.google.maps',
              label: 'Maps',
              icon: 'icon-base64-string-maps',
            },
          ] as FavoriteApp[],
        },
        preferences: {
          displayFavoriteApps: true,
          displayRecentApps: false,
          displayPinnedApps: false,
          displayTemporaryPinnedApps: true,
        } as PreferencesState,
      }

      renderWithProvider(<FavoriteAppsSettings />, { preloadedState: customInitialStoreState })

      expect(screen.getByTestId('settings-bottom-sort-favorite-apps-button')).not.toBeDisabled()
      expect(screen.getByText(/Sort/)).toBeOnTheScreen()
      expect(screen.getByText(/Click to start sorting/)).toBeOnTheScreen()
    })

    it('should dismiss keyboard when pressed and toggle sortable favorite apps view', () => {
      const customInitialStoreState = {
        ...initialStoreState,
        favoriteApps: {
          list: [
            {
              name: 'com.google.chrome',
              label: 'Chrome',
              icon: 'icon-base64-string-chrome',
            },
            {
              name: 'com.google.maps',
              label: 'Maps',
              icon: 'icon-base64-string-maps',
            },
          ] as FavoriteApp[],
        },
        preferences: {
          displayFavoriteApps: true,
          displayRecentApps: false,
          displayPinnedApps: false,
          displayTemporaryPinnedApps: true,
        } as PreferencesState,
      }

      const dismissKeyboardFn = jest.fn()
      const toggleSortableFavoriteAppsFn = jest.fn()

      const customGlobalContextValue: GlobalContextType = {
        ...defaultGlobalContextValue,
        dismissKeyboard: dismissKeyboardFn,
        toggleSortableFavoriteApps: toggleSortableFavoriteAppsFn,
      }

      renderWithProviderAndContexts(<FavoriteAppsSettings />, {
        preloadedState: customInitialStoreState,
        globalContextValue: customGlobalContextValue,
      })

      const sortFavoriteAppsButton = screen.getByTestId('settings-bottom-sort-favorite-apps-button')

      expect(sortFavoriteAppsButton).not.toBeDisabled()
      expect(screen.getByText(/Sort/)).toBeOnTheScreen()
      expect(screen.getByText(/Click to start sorting/)).toBeOnTheScreen()

      fireEvent.press(sortFavoriteAppsButton)

      expect(dismissKeyboardFn).toBeCalled()
      expect(toggleSortableFavoriteAppsFn).toBeCalled()
    })
  })

  it('should toggle display favorite apps value in the store when pressed', () => {
    const customInitialStoreState = {
      ...initialStoreState,
      preferences: {
        ...initialStoreState.preferences,
        displayFavoriteApps: false,
      },
    }

    const { store } = renderWithProvider(<FavoriteAppsSettings />, { preloadedState: customInitialStoreState })

    const toggleFavoriteAppsSwitch = screen.getByTestId('settings-bottom-display-favorite-apps-switch')

    expect(toggleFavoriteAppsSwitch).toBeOnTheScreen()

    fireEvent(toggleFavoriteAppsSwitch, 'valueChange')

    expect(store.getState().preferences.displayFavoriteApps).toEqual(true)
  })
})
