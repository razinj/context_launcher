import { fireEvent, screen } from '@testing-library/react-native'
import React from 'react'
import { renderWithProvider, renderWithProviderAndContexts } from '../../../utils/test/utils'
import { setDisplaySettings } from '../../slices/appState'
import SettingsIcon from './SettingsIcon'

const useDispatchMock = jest.fn()

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => useDispatchMock,
}))

describe('<SettingsIcon /> Tests', () => {
  it('should render correctly and match snapshot', () => {
    renderWithProvider(<SettingsIcon />)

    expect(screen.toJSON()).toMatchSnapshot()
    expect(screen.getByTestId('settings-button')).toBeOnTheScreen()
  })

  it('should call function to display settings bottom sheet when pressed', () => {
    renderWithProviderAndContexts(<SettingsIcon />)

    const settingsButton = screen.getByTestId('settings-button')

    expect(settingsButton).toBeOnTheScreen()

    fireEvent.press(settingsButton)

    expect(useDispatchMock).toBeCalledWith(setDisplaySettings(true))
  })
})
