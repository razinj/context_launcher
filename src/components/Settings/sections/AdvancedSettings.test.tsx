import React from 'react'
import { fireEvent, screen } from '@testing-library/react-native'
import { initialStoreState } from '../../../../utils/test/data'
import { renderWithProvider } from '../../../../utils/test/utils'
import { ToastAndroid } from 'react-native'
import AppsModule from '../../../native-modules/AppsModule'
import AdvancedSettings from './AdvancedSettings'
import { PreferencesState } from '../../../slices/preferences'

describe('<AdvancedSettings /> Tests', () => {
  beforeEach(() => {
    jest.spyOn(ToastAndroid, 'show')
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should render correctly and match snapshot', () => {
    renderWithProvider(<AdvancedSettings />)

    expect(screen.toJSON()).toMatchSnapshot()
    expect(screen.getByTestId('advanced-settings-reload-all-apps-button')).toBeOnTheScreen()
    expect(screen.getByTestId('advanced-settings-reset-preferences-button')).toBeOnTheScreen()
  })

  // TODO: Find a way to mock internal dispatched action
  it.todo('should call AppsModule method to get all applications and set apps list')

  it('should call AppsModule method to get all applications', () => {
    renderWithProvider(<AdvancedSettings />)

    const reloadAllAppsButton = screen.getByTestId('advanced-settings-reload-all-apps-button')

    expect(reloadAllAppsButton).toBeOnTheScreen()

    fireEvent.press(reloadAllAppsButton)

    expect(AppsModule.getApplications).toBeCalled()
  })

  it('should reset preferences apps when button is pressed', () => {
    const customInitialState = {
      ...initialStoreState,
      preferences: {
        displayRecentApps: false,
        displayFavoriteApps: true,
        displayPinnedApps: false,
        displayTemporaryPinnedApps: true,
      } as PreferencesState,
    }

    const { store } = renderWithProvider(<AdvancedSettings />, { preloadedState: customInitialState })

    const resetPreferencesButton = screen.getByTestId('advanced-settings-reset-preferences-button')

    expect(resetPreferencesButton).toBeOnTheScreen()

    fireEvent.press(resetPreferencesButton)

    expect(store.getState().preferences).toEqual({
      displayRecentApps: false,
      displayFavoriteApps: true,
      displayPinnedApps: false,
      displayTemporaryPinnedApps: true,
    })
    expect(ToastAndroid.show).toBeCalledWith('Settings reset successfully!', ToastAndroid.LONG)
  })
})
