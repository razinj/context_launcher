import { fireEvent, screen } from '@testing-library/react-native'
import React from 'react'
import { getAppsForTests, initialStoreState } from '../../../../utils/test/data'
import { renderWithProvider } from '../../../../utils/test/utils'
import { displayRecentApps } from '../../../slices/preferences'
import { clearRecentApps } from '../../../slices/recentApps'
import { RootState } from '../../../store'
import * as ToastModule from '../../../utils/toast'
import RecentAppsSettings from './RecentAppsSettings'

const useDispatchMock = jest.fn()

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => useDispatchMock,
}))

describe('<RecentAppsSettings /> Tests', () => {
  beforeAll(() => {
    jest.spyOn(ToastModule, 'displayToast')
  })

  it('should render correctly and match snapshot', () => {
    renderWithProvider(<RecentAppsSettings />)

    expect(screen.toJSON()).toMatchSnapshot()
    expect(screen.getByTestId('display-switch')).toBeOnTheScreen()
    expect(screen.getByTestId('clear-button')).toBeOnTheScreen()
  })

  it('should dispatch action to clear recent apps when button is pressed', () => {
    const customInitialState: RootState = {
      ...initialStoreState,
      recentApps: {
        list: getAppsForTests(2),
      },
    }

    renderWithProvider(<RecentAppsSettings />, { preloadedState: customInitialState })

    const clearRecentAppsButton = screen.getByTestId('clear-button')

    expect(clearRecentAppsButton).toBeOnTheScreen()

    fireEvent.press(clearRecentAppsButton)

    expect(useDispatchMock).toBeCalledWith(clearRecentApps())
    expect(ToastModule.displayToast).toBeCalledWith('Recent apps cleared successfully!')
  })

  it('should dispatch action to toggle recent apps when button is pressed', () => {
    const customInitialStoreState: RootState = {
      ...initialStoreState,
      preferences: {
        ...initialStoreState.preferences,
        displayRecentApps: false,
      },
    }

    renderWithProvider(<RecentAppsSettings />, { preloadedState: customInitialStoreState })

    const toggleRecentAppsSwitch = screen.getByTestId('display-switch')

    expect(toggleRecentAppsSwitch).toBeOnTheScreen()

    fireEvent(toggleRecentAppsSwitch, 'valueChange')

    expect(useDispatchMock).toBeCalledWith(displayRecentApps(true))
  })
})
