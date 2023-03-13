import React from 'react'
import { fireEvent, screen } from '@testing-library/react-native'
import { initialStoreState } from '../../../../utils/test/data'
import { renderWithProvider } from '../../../../utils/test/utils'
import { ToastAndroid } from 'react-native'
import { RecentAppDetails } from '../../../models/recent-app'
import RecentAppsSettings from './RecentAppsSettings'

describe('<RecentAppsSettings /> Tests', () => {
  beforeEach(() => {
    jest.spyOn(ToastAndroid, 'show')
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should render correctly and match snapshot', () => {
    renderWithProvider(<RecentAppsSettings />)

    expect(screen.toJSON()).toMatchSnapshot()
    expect(screen.getByTestId('settings-bottom-display-recent-apps-switch')).toBeOnTheScreen()
    expect(screen.getByTestId('advanced-settings-clear-recent-apps-button')).toBeOnTheScreen()
  })

  it('should clear recent apps when button is pressed', () => {
    const customInitialState = {
      ...initialStoreState,
      recentApps: {
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
        ] as RecentAppDetails[],
      },
    }

    const { store } = renderWithProvider(<RecentAppsSettings />, { preloadedState: customInitialState })

    const clearRecentAppsButton = screen.getByTestId('advanced-settings-clear-recent-apps-button')

    expect(clearRecentAppsButton).toBeOnTheScreen()

    fireEvent.press(clearRecentAppsButton)

    expect(store.getState().recentApps.list).toEqual([])
    expect(ToastAndroid.show).toBeCalledWith('Recent apps cleared successfully!', ToastAndroid.LONG)
  })

  it('should toggle display recent apps value in the store when pressed', () => {
    const customInitialStoreState = {
      ...initialStoreState,
      preferences: {
        ...initialStoreState.preferences,
        displayRecentApps: false,
      },
    }

    const { store } = renderWithProvider(<RecentAppsSettings />, { preloadedState: customInitialStoreState })

    const toggleRecentAppsSwitch = screen.getByTestId('settings-bottom-display-recent-apps-switch')

    expect(toggleRecentAppsSwitch).toBeOnTheScreen()

    fireEvent(toggleRecentAppsSwitch, 'valueChange')

    expect(store.getState().preferences.displayRecentApps).toEqual(true)
  })
})
