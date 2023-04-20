import { fireEvent, screen } from '@testing-library/react-native'
import React from 'react'
import { ToastAndroid } from 'react-native'
import { initialStoreState } from '../../../../utils/test/data'
import { renderWithProvider } from '../../../../utils/test/utils'
import { displayRecentApps } from '../../../slices/preferences'
import { clearRecentApps } from '../../../slices/recentApps'
import { RootState } from '../../../store'
import RecentAppsSettings from './RecentAppsSettings'

const useDispatchMock = jest.fn()

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => useDispatchMock,
}))

describe('<RecentAppsSettings /> Tests', () => {
  beforeEach(() => {
    jest.spyOn(ToastAndroid, 'show')
  })

  it('should render correctly and match snapshot', () => {
    renderWithProvider(<RecentAppsSettings />)

    expect(screen.toJSON()).toMatchSnapshot()
    expect(screen.getByTestId('display-recent-apps-switch')).toBeOnTheScreen()
    expect(screen.getByTestId('clear-recent-apps-button')).toBeOnTheScreen()
  })

  it('should clear recent apps when button is pressed', () => {
    const customInitialState: RootState = {
      ...initialStoreState,
      recentApps: {
        list: [
          {
            packageName: 'com.google.chrome',
            name: 'Chrome',
            icon: 'ICON',
          },
          {
            packageName: 'com.google.maps',
            name: 'Maps',
            icon: 'ICON',
          },
        ],
      },
    }

    renderWithProvider(<RecentAppsSettings />, { preloadedState: customInitialState })

    const clearRecentAppsButton = screen.getByTestId('clear-recent-apps-button')

    expect(clearRecentAppsButton).toBeOnTheScreen()

    fireEvent.press(clearRecentAppsButton)

    expect(useDispatchMock).toBeCalledWith(clearRecentApps())
    expect(ToastAndroid.show).toBeCalledWith('Recent apps cleared successfully!', ToastAndroid.LONG)
  })

  it('should dispatch action to toggle display recent apps when pressed', () => {
    const customInitialStoreState: RootState = {
      ...initialStoreState,
      preferences: {
        ...initialStoreState.preferences,
        displayRecentApps: false,
      },
    }

    renderWithProvider(<RecentAppsSettings />, { preloadedState: customInitialStoreState })

    const toggleRecentAppsSwitch = screen.getByTestId('display-recent-apps-switch')

    expect(toggleRecentAppsSwitch).toBeOnTheScreen()
    expect(toggleRecentAppsSwitch).not.toBeDisabled()

    fireEvent(toggleRecentAppsSwitch, 'valueChange')

    expect(useDispatchMock).toBeCalledWith(displayRecentApps(true))
  })
})
