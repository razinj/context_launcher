import { fireEvent, screen } from '@testing-library/react-native'
import React from 'react'
import { ToastAndroid } from 'react-native'
import { renderWithProvider } from '../../../../utils/test/utils'
import { getAppsListAction } from '../../../slices/appsList'
import { resetPreferences } from '../../../slices/preferences'
import AdvancedSettings from './AdvancedSettings'

const useDispatchMock = jest.fn()

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => useDispatchMock,
}))

describe('<AdvancedSettings /> Tests', () => {
  beforeEach(() => {
    jest.spyOn(ToastAndroid, 'show')
  })

  it('should render correctly and match snapshot', () => {
    renderWithProvider(<AdvancedSettings />)

    expect(screen.toJSON()).toMatchSnapshot()
    expect(screen.getByTestId('reload-all-apps-button')).toBeOnTheScreen()
    expect(screen.getByTestId('reset-preferences-button')).toBeOnTheScreen()
  })

  it('should dispatch action to get all applications', () => {
    renderWithProvider(<AdvancedSettings />)

    const reloadAllAppsButton = screen.getByTestId('reload-all-apps-button')

    expect(reloadAllAppsButton).toBeOnTheScreen()

    fireEvent.press(reloadAllAppsButton)

    expect(useDispatchMock).toBeCalledWith(getAppsListAction())
    expect(ToastAndroid.show).toBeCalledWith('All apps reloaded successfully!', ToastAndroid.LONG)
  })

  it('should reset preferences apps when button is pressed', () => {
    renderWithProvider(<AdvancedSettings />)

    const resetPreferencesButton = screen.getByTestId('reset-preferences-button')

    expect(resetPreferencesButton).toBeOnTheScreen()

    fireEvent.press(resetPreferencesButton)

    expect(useDispatchMock).toBeCalledWith(resetPreferences())
    expect(ToastAndroid.show).toBeCalledWith('Settings reset successfully!', ToastAndroid.LONG)
  })
})
