import { fireEvent, screen } from '@testing-library/react-native'
import React from 'react'
import { getAppForTestsByName, initialStoreState } from '../../utils/test/data'
import { renderWithProvider } from '../../utils/test/utils'
import { RootState } from '../store'
import AllAppsLetterIndex from './AllAppsLetterIndex'

describe('<AllAppsLetterIndex /> Tests', () => {
  const onPressFn = jest.fn()

  it('should render correctly and match snapshot - empty list', () => {
    renderWithProvider(<AllAppsLetterIndex onPress={onPressFn} />)

    expect(screen.toJSON()).toMatchSnapshot()
    expect(screen.getByTestId('all-apps-letter-index-wrapper')).toBeOnTheScreen()
    expect(screen.getByTestId('all-apps-letter-index-list')).toBeOnTheScreen()
  })

  it('should render correctly and match snapshot - populated list', () => {
    const customInitialState: RootState = {
      ...initialStoreState,
      appsList: {
        list: [getAppForTestsByName('Chrome')!],
      },
    }

    renderWithProvider(<AllAppsLetterIndex onPress={onPressFn} />, { preloadedState: customInitialState })

    expect(screen.toJSON()).toMatchSnapshot()
    expect(screen.getByTestId('all-apps-letter-index-wrapper')).toBeOnTheScreen()

    const list = screen.getByTestId('all-apps-letter-index-list')

    expect(list).toBeOnTheScreen()

    const letterIndexItem = screen.getByText('C')

    expect(letterIndexItem).toBeOnTheScreen()
    expect(list).toContainElement(letterIndexItem)
  })

  it('should call passed function when element is pressed', () => {
    const customInitialState: RootState = {
      ...initialStoreState,
      appsList: {
        list: [getAppForTestsByName('Chrome')!, getAppForTestsByName('Maps')!],
      },
    }

    renderWithProvider(<AllAppsLetterIndex onPress={onPressFn} />, { preloadedState: customInitialState })

    const list = screen.getByTestId('all-apps-letter-index-list')

    expect(list).toBeOnTheScreen()

    // Letter C
    const letterIndexItem_C = screen.getByText('C')

    expect(letterIndexItem_C).toBeOnTheScreen()
    expect(list).toContainElement(letterIndexItem_C)

    fireEvent.press(letterIndexItem_C)

    expect(onPressFn).toBeCalledWith(0)

    // Letter M
    const letterIndexItem_M = screen.getByText('M')

    expect(letterIndexItem_M).toBeOnTheScreen()
    expect(list).toContainElement(letterIndexItem_M)

    fireEvent.press(letterIndexItem_M)

    expect(onPressFn).toBeCalledWith(1)
  })
})
