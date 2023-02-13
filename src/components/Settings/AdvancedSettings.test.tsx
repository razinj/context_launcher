import { fireEvent, screen } from '@testing-library/react-native'
import { initialStoreState } from '../../../utils/test/data'
import { renderWithProvider } from '../../../utils/test/utils'
import { FavoriteApp } from '../../models/favorite-app'
import { RecentAppDetails } from '../../models/recent-app'
import { PreferencesState } from '../../slices/preferences'
import { ToastAndroid } from 'react-native'
import AppsModule from '../../native-modules/AppsModule'
import AdvancedSettings from './AdvancedSettings'

describe('<AdvancedSettings /> Tests', () => {
  beforeEach(() => {
    jest.spyOn(ToastAndroid, 'show')
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should render correctly and match snapshot', () => {
    renderWithProvider(<AdvancedSettings />)

    expect(screen.toJSON()).toMatchSnapshot()
    expect(screen.getByTestId('advanced-settings-reload-all-apps-button')).toBeDefined()
    expect(screen.getByTestId('advanced-settings-clear-recent-apps-button')).toBeDefined()
    expect(screen.getByTestId('advanced-settings-clear-favorite-apps-button')).toBeDefined()
    expect(screen.getByTestId('advanced-settings-reset-preferences-button')).toBeDefined()
  })

  // TODO: Find a way to mock internal dispatched action
  it.todo('should call AppsModule method to get all applications and set apps list')

  it('should call AppsModule method to get all applications', () => {
    renderWithProvider(<AdvancedSettings />)

    const reloadAllAppsButton = screen.getByTestId('advanced-settings-reload-all-apps-button')

    expect(reloadAllAppsButton).toBeDefined()

    fireEvent.press(reloadAllAppsButton)

    expect(AppsModule.getApplications).toBeCalled()
  })

  it('should clear recent apps when button is pressed', () => {
    const customInitialState = {
      ...initialStoreState,
      recentApps: {
        list: [
          {
            name: 'com.google.chrome',
            label: 'Chrome',
            icon: 'icon-base64-string-chrome',
          },
          {
            name: 'com.google.maps',
            label: 'Maps',
            icon: 'icon-base64-string-maps',
          },
        ] as RecentAppDetails[],
      },
    }

    const { store } = renderWithProvider(<AdvancedSettings />, { preloadedState: customInitialState })

    const clearRecentAppsButton = screen.getByTestId('advanced-settings-clear-recent-apps-button')

    expect(clearRecentAppsButton).toBeDefined()

    fireEvent.press(clearRecentAppsButton)

    expect(store.getState().recentApps.list).toEqual([])
    expect(ToastAndroid.show).toBeCalledWith('Recent apps cleared successfully!', ToastAndroid.LONG)
  })

  it('should clear favorite apps when button is pressed', () => {
    const customInitialState = {
      ...initialStoreState,
      favoriteApps: {
        list: [
          {
            name: 'com.google.chrome',
            label: 'Chrome',
            icon: 'icon-base64-string-chrome',
          },
          {
            name: 'com.google.maps',
            label: 'Maps',
            icon: 'icon-base64-string-maps',
          },
        ] as FavoriteApp[],
      },
    }

    const { store } = renderWithProvider(<AdvancedSettings />, { preloadedState: customInitialState })

    const clearFavoriteAppsButton = screen.getByTestId('advanced-settings-clear-favorite-apps-button')

    expect(clearFavoriteAppsButton).toBeDefined()

    fireEvent.press(clearFavoriteAppsButton)

    expect(store.getState().favoriteApps.list).toEqual([])
    expect(ToastAndroid.show).toBeCalledWith('Favorite apps cleared successfully!', ToastAndroid.LONG)
  })

  it('should reset preferences apps when button is pressed', () => {
    const customInitialState = {
      ...initialStoreState,
      preferences: {
        displayRecentApps: false,
        displayFavoriteApps: true,
      } as PreferencesState,
    }

    const { store } = renderWithProvider(<AdvancedSettings />, { preloadedState: customInitialState })

    const resetPreferencesButton = screen.getByTestId('advanced-settings-reset-preferences-button')

    expect(resetPreferencesButton).toBeDefined()

    fireEvent.press(resetPreferencesButton)

    expect(store.getState().preferences).toEqual({
      displayRecentApps: true,
      displayFavoriteApps: true,
    })
    expect(ToastAndroid.show).toBeCalledWith('Settings reset successfully!', ToastAndroid.LONG)
  })
})
