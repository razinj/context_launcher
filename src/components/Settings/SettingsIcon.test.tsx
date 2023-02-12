import { fireEvent } from '@testing-library/react-native'
import { defaultGlobalContextValue, renderWithProvider, renderWithProviderAndContexts } from '../../../utils/test/utils'
import { GlobalContextType } from '../../models/context'
import SettingsIcon from './SettingsIcon'

describe('<SettingsIcon /> Tests', () => {
  it('should render correctly and match snapshot', () => {
    const { toJSON, getByTestId } = renderWithProvider(<SettingsIcon />)

    expect(toJSON()).toMatchSnapshot()
    expect(getByTestId('settings-button')).toBeDefined()
  })

  it('should call function to display settings bottom sheet when pressed', () => {
    const displaySettingsBottomSheetFn = jest.fn()

    const customGlobalContextValue: GlobalContextType = {
      ...defaultGlobalContextValue,
      displaySettingsBottomSheet: displaySettingsBottomSheetFn,
    }

    const { getByTestId } = renderWithProviderAndContexts(<SettingsIcon />, {
      globalContextValue: customGlobalContextValue,
    })

    const settingsButton = getByTestId('settings-button')

    expect(settingsButton).toBeDefined()

    fireEvent.press(settingsButton)

    expect(displaySettingsBottomSheetFn).toBeCalled()
  })
})
