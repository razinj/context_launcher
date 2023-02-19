import React from 'react'
import { fireEvent, screen } from '@testing-library/react-native'
import { renderWithProvider, renderWithProviderAndContexts } from '../../../utils/test/utils'
import { CONTEXT_LAUNCHER_APP_ID, defaultGlobalContextValue, initialStoreState } from '../../../utils/test/data'
import { FavoriteApp } from '../../models/favorite-app'
import { GlobalContextType } from '../../models/context'
import SettingsBottomSheet from './SettingsBottomSheet'
import * as AppsModuleUtils from '../../utils/apps-module'

describe('<SettingsBottomSheet /> Tests', () => {
  beforeAll(() => {
    jest.spyOn(AppsModuleUtils, 'showAppDetails')
  })

  it('should render correctly and match snapshot', () => {
    renderWithProvider(<SettingsBottomSheet />)

    expect(screen.toJSON()).toMatchSnapshot()
    // Wrappers
    expect(screen.getByTestId('settings-bottom-sheet-wrapper')).toBeOnTheScreen()
    expect(screen.getByTestId('settings-bottom-sheet-header-wrapper')).toBeOnTheScreen()
    // Elements
    expect(screen.getByTestId('settings-bottom-sheet-header-app-info-button')).toBeOnTheScreen()
    expect(screen.getByTestId('settings-bottom-display-recent-apps-switch')).toBeOnTheScreen()
    expect(screen.getByTestId('settings-bottom-display-favorite-apps-switch')).toBeOnTheScreen()
    expect(screen.getByTestId('settings-bottom-sort-favorite-apps-button')).toBeOnTheScreen()
    expect(screen.getByTestId('settings-bottom-toggle-advanced-settings-button')).toBeOnTheScreen()
  })

  it('should call native module function to open app info when pressed', () => {
    renderWithProvider(<SettingsBottomSheet />)

    const appInfoButton = screen.getByTestId('settings-bottom-sheet-header-app-info-button')

    expect(appInfoButton).toBeOnTheScreen()

    fireEvent.press(appInfoButton)

    expect(AppsModuleUtils.showAppDetails).toBeCalledWith(CONTEXT_LAUNCHER_APP_ID)
    // TODO: Make sure 'settingsBottomSheetRef?.current?.dismiss()' is called
  })

  it('should toggle display recent apps value in the store when pressed', () => {
    const customInitialStoreState = {
      ...initialStoreState,
      preferences: {
        ...initialStoreState.preferences,
        displayRecentApps: false,
      },
    }

    const { store } = renderWithProvider(<SettingsBottomSheet />, { preloadedState: customInitialStoreState })

    const toggleRecentAppsSwitch = screen.getByTestId('settings-bottom-display-recent-apps-switch')

    expect(toggleRecentAppsSwitch).toBeOnTheScreen()

    fireEvent(toggleRecentAppsSwitch, 'valueChange')

    expect(store.getState().preferences.displayRecentApps).toEqual(true)
  })

  it('should toggle display favorite apps value in the store when pressed', () => {
    const customInitialStoreState = {
      ...initialStoreState,
      preferences: {
        ...initialStoreState.preferences,
        displayFavoriteApps: false,
      },
    }

    const { store } = renderWithProvider(<SettingsBottomSheet />, { preloadedState: customInitialStoreState })

    const toggleFavoriteAppsSwitch = screen.getByTestId('settings-bottom-display-favorite-apps-switch')

    expect(toggleFavoriteAppsSwitch).toBeOnTheScreen()

    fireEvent(toggleFavoriteAppsSwitch, 'valueChange')

    expect(store.getState().preferences.displayFavoriteApps).toEqual(true)
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
          displayFavoriteApps: true,
          displayRecentApps: false,
        },
      }

      renderWithProvider(<SettingsBottomSheet />, { preloadedState: customInitialStoreState })

      expect(screen.getByTestId('settings-bottom-sort-favorite-apps-button')).toBeDisabled()
      expect(screen.getByText(/Sort favorite apps/)).toBeOnTheScreen()
      expect(screen.getByText(/Add more favorite apps to be able to sort/)).toBeOnTheScreen()
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
        },
      }

      renderWithProvider(<SettingsBottomSheet />, { preloadedState: customInitialStoreState })

      expect(screen.getByTestId('settings-bottom-sort-favorite-apps-button')).toBeDisabled()
      expect(screen.getByText(/Sort favorite apps/)).toBeOnTheScreen()
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
        },
      }

      renderWithProvider(<SettingsBottomSheet />, { preloadedState: customInitialStoreState })

      expect(screen.getByTestId('settings-bottom-sort-favorite-apps-button')).not.toBeDisabled()
      expect(screen.getByText(/Sort favorite apps/)).toBeOnTheScreen()
      expect(screen.getByText(/Click to start sorting your favorite apps/)).toBeOnTheScreen()
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
        },
      }

      const dismissKeyboardFn = jest.fn()
      const toggleSortableFavoriteAppsFn = jest.fn()

      const customGlobalContextValue: GlobalContextType = {
        ...defaultGlobalContextValue,
        dismissKeyboard: dismissKeyboardFn,
        toggleSortableFavoriteApps: toggleSortableFavoriteAppsFn,
      }

      renderWithProviderAndContexts(<SettingsBottomSheet />, {
        preloadedState: customInitialStoreState,
        globalContextValue: customGlobalContextValue,
      })

      const sortFavoriteAppsButton = screen.getByTestId('settings-bottom-sort-favorite-apps-button')

      expect(sortFavoriteAppsButton).not.toBeDisabled()
      expect(screen.getByText(/Sort favorite apps/)).toBeOnTheScreen()
      expect(screen.getByText(/Click to start sorting your favorite apps/)).toBeOnTheScreen()

      fireEvent.press(sortFavoriteAppsButton)

      expect(dismissKeyboardFn).toBeCalled()
      expect(toggleSortableFavoriteAppsFn).toBeCalled()
    })
  })

  describe('Advanced settings wrapper tests', () => {
    it('should not display advanced settings when not toggled - default view', () => {
      renderWithProvider(<SettingsBottomSheet />)

      expect(screen.getByTestId('settings-bottom-toggle-advanced-settings-button')).toBeOnTheScreen()
      expect(screen.queryAllByTestId(/^advanced-settings/)).toHaveLength(0)
    })

    it('should display advanced settings when pressed', () => {
      renderWithProvider(<SettingsBottomSheet />)

      const toggleAdvancedSettingsButton = screen.getByTestId('settings-bottom-toggle-advanced-settings-button')

      expect(toggleAdvancedSettingsButton).toBeOnTheScreen()

      fireEvent.press(toggleAdvancedSettingsButton)

      expect(screen.queryAllByTestId(/^advanced-settings/)).toHaveLength(4)
    })
  })
})
