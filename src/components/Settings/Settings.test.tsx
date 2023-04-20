import { screen, within } from '@testing-library/react-native'
import React from 'react'
import { initialStoreState } from '../../../utils/test/data'
import { renderWithProvider } from '../../../utils/test/utils'
import { RootState } from '../../store'
import Settings from './Settings'

describe('<Settings /> Tests', () => {
  it('should not render modal when display settings value is false (default)', () => {
    renderWithProvider(<Settings />)

    expect(screen.queryByTestId('settings-wrapper')).toBeNull()
  })

  it('should render modal correctly and match snapshot when display settings value is false', () => {
    const customInitialState: RootState = {
      ...initialStoreState,
      appState: {
        ...initialStoreState.appState,
        displaySettings: true,
      },
    }

    renderWithProvider(<Settings />, { preloadedState: customInitialState })

    expect(screen.toJSON()).toMatchSnapshot()

    const settingsWrapper = screen.getByTestId('settings-wrapper')

    expect(settingsWrapper).toBeOnTheScreen()
    expect(within(settingsWrapper).getByText('Recent Apps')).toBeOnTheScreen()
    expect(within(settingsWrapper).getByText('Pinned Apps')).toBeOnTheScreen()
    expect(within(settingsWrapper).getByText('Favorite Apps')).toBeOnTheScreen()
    expect(within(settingsWrapper).getByText('Advanced Settings')).toBeOnTheScreen()
  })
})
