import { fireEvent, screen } from '@testing-library/react-native'
import React from 'react'
import { renderWithProvider, renderWithProviderAndContexts } from '../../utils/test/utils'
import { toogleAllApps } from '../slices/appState'
import AllAppsIcon from './AllAppsIcon'

const useDispatchMock = jest.fn()

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => useDispatchMock,
}))

describe('<AllAppsIcon /> Tests', () => {
  it('should render correctly and match snapshot', () => {
    renderWithProvider(<AllAppsIcon />)

    expect(screen.toJSON()).toMatchSnapshot()
    expect(screen.getByTestId('all-apps-toggle-button')).toBeOnTheScreen()
  })

  it('should call function to toggle all apps display when pressed', () => {
    renderWithProviderAndContexts(<AllAppsIcon />, {})

    const allAppsButton = screen.getByTestId('all-apps-toggle-button')

    expect(allAppsButton).toBeOnTheScreen()

    fireEvent.press(allAppsButton)

    expect(useDispatchMock).toBeCalledWith(toogleAllApps())
  })
})
