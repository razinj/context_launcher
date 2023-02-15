import { fireEvent, screen } from '@testing-library/react-native'
import { defaultGlobalContextValue } from '../../../utils/test/data'
import { renderWithProvider, renderWithProviderAndContexts } from '../../../utils/test/utils'
import { GlobalContextType } from '../../models/context'
import SettingsIcon from './SettingsIcon'

describe('<SettingsIcon /> Tests', () => {
  it('should render correctly and match snapshot', () => {
    renderWithProvider(<SettingsIcon />)

    expect(screen.toJSON()).toMatchSnapshot()
    expect(screen.getByTestId('settings-button')).toBeDefined()
  })

  it('should call function to display settings bottom sheet when pressed', () => {
    const displaySettingsBottomSheetFn = jest.fn()

    const customGlobalContextValue: GlobalContextType = {
      ...defaultGlobalContextValue,
      displaySettingsBottomSheet: displaySettingsBottomSheetFn,
    }

    renderWithProviderAndContexts(<SettingsIcon />, {
      globalContextValue: customGlobalContextValue,
    })

    const settingsButton = screen.getByTestId('settings-button')

    expect(settingsButton).toBeDefined()

    fireEvent.press(settingsButton)

    expect(displaySettingsBottomSheetFn).toBeCalled()
  })
})
