import { screen } from '@testing-library/react-native'
import React from 'react'
import { renderWithProvider } from '../../../../utils/test/utils'
import SettingsItemLabel, { SettingsItemLabelProps } from '../shared/SettingsItemLabel'

describe('<SettingsItemLabel /> Tests', () => {
  const requiredProps: SettingsItemLabelProps = {
    title: 'An item label',
  }

  it('should render correctly and match snapshot - required props', () => {
    renderWithProvider(<SettingsItemLabel {...requiredProps} />)

    expect(screen.toJSON()).toMatchSnapshot()
    expect(screen.getByText(requiredProps.title)).toBeOnTheScreen()
  })

  it('should render correctly and match snapshot - required and optional props', () => {
    const allProps: SettingsItemLabelProps = {
      ...requiredProps,
      description: 'An item description',
      titleStyle: { color: '#000' },
      wrapperStyle: { flex: 1 },
    }

    renderWithProvider(<SettingsItemLabel {...allProps} />)

    expect(screen.toJSON()).toMatchSnapshot()
    expect(screen.getByText(allProps.title)).toBeOnTheScreen()
    expect(screen.getByText(allProps.description!)).toBeOnTheScreen()
    expect(screen.getByTestId('wrapper')).toHaveStyle(allProps.wrapperStyle)
    expect(screen.getByTestId('title')).toHaveStyle(allProps.titleStyle)
  })
})
