import { fireEvent, screen } from '@testing-library/react-native'
import React from 'react'
import { renderWithProvider } from '../../../utils/test/utils'
import { APP_ID } from '../../constants'
import { setDisplaySettings } from '../../slices/appState'
import * as AppsModule from '../../utils/apps-module'
import SettingsHeader from './SettingsHeader'

const useDispatchMock = jest.fn()

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => useDispatchMock,
}))

describe('<SettingsHeader /> Tests', () => {
  beforeAll(() => {
    jest.spyOn(AppsModule, 'showAppDetails')
    jest.spyOn(AppsModule, 'openSystemSettings')
  })

  it('should render correctly and match snapshot', () => {
    renderWithProvider(<SettingsHeader />)

    expect(screen.toJSON()).toMatchSnapshot()
    expect(screen.getByTestId('wrapper')).toBeOnTheScreen()
    expect(screen.getByTestId('app-info-button')).toBeOnTheScreen()
    expect(screen.getByTestId('system-settings-button')).toBeOnTheScreen()
  })

  it('should call function to open app details page', () => {
    renderWithProvider(<SettingsHeader />)

    const appInfoButton = screen.getByTestId('app-info-button')

    expect(appInfoButton).toBeOnTheScreen()

    fireEvent.press(appInfoButton)

    expect(AppsModule.showAppDetails).toHaveBeenCalledWith(APP_ID)
    expect(useDispatchMock).toHaveBeenCalledWith(setDisplaySettings(false))
  })

  it('should call function to open system settings', () => {
    renderWithProvider(<SettingsHeader />)

    const systemSettingsButton = screen.getByTestId('system-settings-button')

    expect(systemSettingsButton).toBeOnTheScreen()

    fireEvent.press(systemSettingsButton)

    expect(useDispatchMock).toHaveBeenCalledWith(setDisplaySettings(false))
    expect(AppsModule.openSystemSettings).toHaveBeenCalled()
  })
})
