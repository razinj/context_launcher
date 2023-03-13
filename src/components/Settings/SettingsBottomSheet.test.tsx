import React from 'react'
import { fireEvent, screen } from '@testing-library/react-native'
import { renderWithProvider } from '../../../utils/test/utils'
import { CONTEXT_LAUNCHER_APP_ID } from '../../../utils/test/data'
import SettingsBottomSheet from './SettingsBottomSheet'
import * as AppsModuleUtils from '../../utils/apps-module'

describe('<SettingsBottomSheet /> Tests', () => {
  beforeAll(() => {
    jest.spyOn(AppsModuleUtils, 'showAppDetails')
  })

  it('should render correctly and match snapshot', () => {
    renderWithProvider(<SettingsBottomSheet />)

    expect(screen.toJSON()).toMatchSnapshot()
    // Wrappers
    expect(screen.getByTestId('settings-bottom-sheet-wrapper')).toBeOnTheScreen()
    expect(screen.getByTestId('settings-bottom-sheet-header-wrapper')).toBeOnTheScreen()
    // Elements
    expect(screen.getByTestId('settings-bottom-sheet-header-app-info-button')).toBeOnTheScreen()
  })

  it('should call native module function to open app info when pressed', () => {
    renderWithProvider(<SettingsBottomSheet />)

    const appInfoButton = screen.getByTestId('settings-bottom-sheet-header-app-info-button')

    expect(appInfoButton).toBeOnTheScreen()

    fireEvent.press(appInfoButton)

    expect(AppsModuleUtils.showAppDetails).toBeCalledWith(CONTEXT_LAUNCHER_APP_ID)
    // TODO: Make sure 'settingsBottomSheetRef?.current?.dismiss()' is called
  })
})
