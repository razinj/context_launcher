import { fireEvent, screen } from '@testing-library/react-native'
import React from 'react'
import { getAppsForTests, initialStoreState } from '../../../../utils/test/data'
import { renderWithProvider } from '../../../../utils/test/utils'
import { sortPinnedApps, sortTemporaryPinnedApps } from '../../../slices/appState'
import { clearPinnedApps } from '../../../slices/pinnedApps'
import { displayPinnedApps, displayTemporaryPinnedApps } from '../../../slices/preferences'
import { RootState } from '../../../store'
import * as ToastModule from '../../../utils/toast'
import PinnedAppsSettings from './PinnedAppsSettings'

const useDispatchMock = jest.fn()

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => useDispatchMock,
}))

describe('<PinnedAppsSettings /> Tests', () => {
  beforeAll(() => {
    jest.spyOn(ToastModule, 'displayToast')
  })

  it('should render correctly and match snapshot', () => {
    renderWithProvider(<PinnedAppsSettings />)

    expect(screen.toJSON()).toMatchSnapshot()
    expect(screen.getByTestId('display-pinned-apps-button')).toBeOnTheScreen()
    expect(screen.getByTestId('display-temporarily-pinned-apps-button')).toBeOnTheScreen()
    expect(screen.getByTestId('sort-pinned-apps-button')).toBeOnTheScreen()
    expect(screen.getByTestId('sort-temporarily-pinned-apps-button')).toBeOnTheScreen()
    expect(screen.getByTestId('set-start-time-button')).toBeOnTheScreen()
    expect(screen.getByTestId('set-end-time-button')).toBeOnTheScreen()
    expect(screen.getByTestId('clear-pinned-apps-button')).toBeOnTheScreen()
    expect(screen.getByTestId('clear-temporarily-pinned-apps-button')).toBeOnTheScreen()
  })

  it('should dispatch action to clear pinned apps when button is pressed', () => {
    renderWithProvider(<PinnedAppsSettings />)

    const clearPinnedAppsButton = screen.getByTestId('clear-pinned-apps-button')

    expect(clearPinnedAppsButton).toBeOnTheScreen()

    fireEvent.press(clearPinnedAppsButton)

    expect(useDispatchMock).toBeCalledWith(clearPinnedApps({ temporarily: false }))
    expect(ToastModule.displayToast).toBeCalledWith('Pinned apps cleared successfully!')
  })

  it('should dispatch action to clear temporarily pinned apps when button is pressed', () => {
    renderWithProvider(<PinnedAppsSettings />)

    const clearTemporarilyPinnedAppsButton = screen.getByTestId('clear-temporarily-pinned-apps-button')

    expect(clearTemporarilyPinnedAppsButton).toBeOnTheScreen()

    fireEvent.press(clearTemporarilyPinnedAppsButton)

    expect(useDispatchMock).toBeCalledWith(clearPinnedApps({ temporarily: true }))
    expect(ToastModule.displayToast).toBeCalledWith('Temporarily pinned apps cleared successfully!')
  })

  describe('Sort pinned apps button tests - permanently pinned apps', () => {
    it('should render sort pinned apps button as disabled if pinned apps are <= 1', () => {
      const customInitialStoreState: RootState = {
        ...initialStoreState,
        pinnedApps: {
          ...initialStoreState.pinnedApps,
          list: getAppsForTests(1),
        },
        preferences: {
          ...initialStoreState.preferences,
          displayPinnedApps: true,
        },
      }

      renderWithProvider(<PinnedAppsSettings />, { preloadedState: customInitialStoreState })

      expect(screen.getByTestId('sort-pinned-apps-button')).toBeDisabled()
      expect(screen.getByText(/Add more apps to be able to sort/)).toBeOnTheScreen()
    })

    it('should render sort pinned apps button as disabled if display pinned apps value is false', () => {
      const customInitialStoreState: RootState = {
        ...initialStoreState,
        pinnedApps: {
          ...initialStoreState.pinnedApps,
          list: getAppsForTests(2),
        },
        preferences: {
          ...initialStoreState.preferences,
          displayPinnedApps: false,
        },
      }

      renderWithProvider(<PinnedAppsSettings />, { preloadedState: customInitialStoreState })

      expect(screen.getByTestId('sort-pinned-apps-button')).toBeDisabled()
      expect(screen.getByText(/Display pinned apps to be able to sort/)).toBeOnTheScreen()
    })

    it('should render sort pinned apps button as enabled if pinned apps are > 1 and display pinned apps value is true', () => {
      const customInitialStoreState: RootState = {
        ...initialStoreState,
        pinnedApps: {
          ...initialStoreState.pinnedApps,
          list: getAppsForTests(2),
        },
        preferences: {
          ...initialStoreState.preferences,
          displayPinnedApps: true,
        },
      }

      renderWithProvider(<PinnedAppsSettings />, { preloadedState: customInitialStoreState })

      expect(screen.getByTestId('sort-pinned-apps-button')).not.toBeDisabled()
      expect(screen.getByText(/Click to start sorting/)).toBeOnTheScreen()
    })

    it('should dispatch action to sort pinned when button is pressed', () => {
      const customInitialStoreState: RootState = {
        ...initialStoreState,
        pinnedApps: {
          ...initialStoreState.pinnedApps,
          list: getAppsForTests(2),
        },
        preferences: {
          ...initialStoreState.preferences,
          displayPinnedApps: true,
        },
      }

      renderWithProvider(<PinnedAppsSettings />, { preloadedState: customInitialStoreState })

      const sortPinnedAppsButton = screen.getByTestId('sort-pinned-apps-button')

      expect(sortPinnedAppsButton).toBeOnTheScreen()
      expect(sortPinnedAppsButton).not.toBeDisabled()

      fireEvent.press(sortPinnedAppsButton)

      expect(useDispatchMock).toBeCalledWith(sortPinnedApps())
    })
  })

  describe('Sort pinned apps button tests - temporarily pinned apps', () => {
    it('should render sort pinned apps button as disabled if pinned apps are <= 1', () => {
      const customInitialStoreState: RootState = {
        ...initialStoreState,
        pinnedApps: {
          ...initialStoreState.pinnedApps,
          temporarily: getAppsForTests(1),
        },
        preferences: {
          ...initialStoreState.preferences,
          displayTemporaryPinnedApps: true,
        },
      }

      renderWithProvider(<PinnedAppsSettings />, { preloadedState: customInitialStoreState })

      expect(screen.getByTestId('sort-temporarily-pinned-apps-button')).toBeDisabled()
      expect(screen.getByText(/Add more apps to be able to sort/)).toBeOnTheScreen()
    })

    it('should render sort pinned apps button as disabled if display pinned apps value is false', () => {
      const customInitialStoreState: RootState = {
        ...initialStoreState,
        pinnedApps: {
          ...initialStoreState.pinnedApps,
          temporarily: getAppsForTests(2),
        },
        preferences: {
          ...initialStoreState.preferences,
          displayTemporaryPinnedApps: false,
        },
      }

      renderWithProvider(<PinnedAppsSettings />, { preloadedState: customInitialStoreState })

      expect(screen.getByTestId('sort-temporarily-pinned-apps-button')).toBeDisabled()
      expect(screen.getByText(/Display temporarily pinned apps to be able to sort/)).toBeOnTheScreen()
    })

    it('should render sort pinned apps button as enabled if pinned apps are > 1 and display pinned apps value is true', () => {
      const customInitialStoreState: RootState = {
        ...initialStoreState,
        pinnedApps: {
          ...initialStoreState.pinnedApps,
          temporarily: getAppsForTests(2),
        },
        preferences: {
          ...initialStoreState.preferences,
          displayTemporaryPinnedApps: true,
        },
      }

      renderWithProvider(<PinnedAppsSettings />, { preloadedState: customInitialStoreState })

      expect(screen.getByTestId('sort-temporarily-pinned-apps-button')).not.toBeDisabled()
      expect(screen.getByText(/Click to start sorting/)).toBeOnTheScreen()
    })

    it('should dispatch action to sort pinned when button is pressed', () => {
      const customInitialStoreState: RootState = {
        ...initialStoreState,
        pinnedApps: {
          ...initialStoreState.pinnedApps,
          temporarily: getAppsForTests(2),
        },
        preferences: {
          ...initialStoreState.preferences,
          displayTemporaryPinnedApps: true,
        },
      }

      renderWithProvider(<PinnedAppsSettings />, { preloadedState: customInitialStoreState })

      const sortTemporarilyPinnedAppsButton = screen.getByTestId('sort-temporarily-pinned-apps-button')

      expect(sortTemporarilyPinnedAppsButton).toBeOnTheScreen()
      expect(sortTemporarilyPinnedAppsButton).not.toBeDisabled()

      fireEvent.press(sortTemporarilyPinnedAppsButton)

      expect(useDispatchMock).toBeCalledWith(sortTemporaryPinnedApps())
    })
  })

  it('should dispatch action to toggle pinned apps view when button is pressed', () => {
    const customInitialStoreState: RootState = {
      ...initialStoreState,
      preferences: {
        ...initialStoreState.preferences,
        displayPinnedApps: false,
      },
    }

    renderWithProvider(<PinnedAppsSettings />, { preloadedState: customInitialStoreState })

    const togglePinnedAppsSwitch = screen.getByTestId('display-pinned-apps-button')

    expect(togglePinnedAppsSwitch).toBeOnTheScreen()
    expect(togglePinnedAppsSwitch).not.toBeDisabled()

    fireEvent(togglePinnedAppsSwitch, 'valueChange')

    expect(useDispatchMock).toBeCalledWith(displayPinnedApps(true))
  })

  it('should dispatch action to toggle temporarily pinned apps view when button is pressed', () => {
    const customInitialStoreState: RootState = {
      ...initialStoreState,
      preferences: {
        ...initialStoreState.preferences,
        displayTemporaryPinnedApps: false,
      },
    }

    renderWithProvider(<PinnedAppsSettings />, { preloadedState: customInitialStoreState })

    const toggleTemporarilyPinnedAppsSwitch = screen.getByTestId('display-temporarily-pinned-apps-button')

    expect(toggleTemporarilyPinnedAppsSwitch).toBeOnTheScreen()
    expect(toggleTemporarilyPinnedAppsSwitch).not.toBeDisabled()

    fireEvent(toggleTemporarilyPinnedAppsSwitch, 'valueChange')

    expect(useDispatchMock).toBeCalledWith(displayTemporaryPinnedApps(true))
  })

  it.todo('should open time picker with correct values - permanently pinned apps')
  it.todo('should open time picker with correct values - temporarily pinned apps')
})
