import { fireEvent, screen } from '@testing-library/react-native'
import { defaultGlobalContextValue } from '../../utils/test/data'
import { renderWithProvider, renderWithProviderAndContexts } from '../../utils/test/utils'
import { GlobalContextType } from '../models/context'
import AllAppsIcon from './AllAppsIcon'

describe('<AllAppsIcon /> Tests', () => {
  it('should render correctly and match snapshot', () => {
    renderWithProvider(<AllAppsIcon />)

    expect(screen.toJSON()).toMatchSnapshot()
    expect(screen.getByTestId('all-apps-toggle-button')).toBeDefined()
  })

  it('should call function to toggle all apps display when pressed', () => {
    const toggleDisplayAllAppsFn = jest.fn()

    const customGlobalContextValue: GlobalContextType = {
      ...defaultGlobalContextValue,
      displayAllApps: false,
      toggleDisplayAllApps: toggleDisplayAllAppsFn,
    }

    renderWithProviderAndContexts(<AllAppsIcon />, {
      globalContextValue: customGlobalContextValue,
    })

    const allAppsButton = screen.getByTestId('all-apps-toggle-button')

    expect(allAppsButton).toBeDefined()

    fireEvent.press(allAppsButton)

    expect(toggleDisplayAllAppsFn).toBeCalled()
  })
})
