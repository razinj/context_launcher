import { fireEvent, screen, waitFor } from '@testing-library/react-native'
import React from 'react'
import { Text } from 'react-native'
import { renderWithProvider } from '../../../../utils/test/utils'
import ToggleSettings, { ToggleSettingsProps } from '../shared/ToggleSettings'

describe('<ToggleSettings /> Tests', () => {
  const requiredProps: ToggleSettingsProps = {
    title: 'An item label',
  }

  it('should render correctly and match snapshot - required props', () => {
    renderWithProvider(
      <ToggleSettings {...requiredProps}>
        <Text>A Child</Text>
      </ToggleSettings>
    )

    expect(screen.toJSON()).toMatchSnapshot()
    expect(screen.getByTestId('toggle-settings-button')).toBeOnTheScreen()
    expect(screen.getByText(requiredProps.title)).toBeOnTheScreen()
    expect(screen.queryByText('A Child')).not.toBeOnTheScreen()
  })

  it('should render correctly and match snapshot - required and optional props', () => {
    const allProps: ToggleSettingsProps = {
      ...requiredProps,
      description: 'An item description',
    }

    renderWithProvider(
      <ToggleSettings {...allProps}>
        <Text>A Child</Text>
      </ToggleSettings>
    )

    expect(screen.toJSON()).toMatchSnapshot()
    expect(screen.getByTestId('toggle-settings-button')).toBeOnTheScreen()
    expect(screen.getByText(allProps.title)).toBeOnTheScreen()
    expect(screen.getByText(allProps.description!)).toBeOnTheScreen()
    expect(screen.queryByText('A Child')).not.toBeOnTheScreen()
  })

  it('should display children when toggled', () => {
    renderWithProvider(
      <ToggleSettings {...requiredProps}>
        <Text>A Child</Text>
      </ToggleSettings>
    )

    const toggleButton = screen.getByTestId('toggle-settings-button')

    expect(toggleButton).toBeOnTheScreen()

    fireEvent.press(toggleButton)

    waitFor(() => {
      expect(screen.queryByText('A Child')).toBeOnTheScreen()
    })
  })
})
