import { screen } from '@testing-library/react-native'
import React from 'react'
import { initialStoreState } from '../../utils/test/data'
import { renderWithProvider } from '../../utils/test/utils'
import { RootState } from '../store'
import HighlightText from './HighlightText'

describe('<HighlightText /> Tests', () => {
  it('should render correctly and match snapshot - without search query', () => {
    const customInitialState: RootState = {
      ...initialStoreState,
      appState: {
        ...initialStoreState.appState,
        search: {
          query: undefined,
          result: [],
        },
      },
    }

    const textToHighlight = 'Chrome'

    renderWithProvider(<HighlightText text={textToHighlight} />, { preloadedState: customInitialState })

    expect(screen.toJSON()).toMatchSnapshot()
    expect(screen.getByText(/Chrome/)).toBeOnTheScreen()
    expect(screen.queryAllByTestId('highlight-text-highlighted')).toHaveLength(0)
  })

  it('should render correctly and match snapshot - with search query', () => {
    const customInitialState: RootState = {
      ...initialStoreState,
      appState: {
        ...initialStoreState.appState,
        search: {
          query: 'chro',
          result: [], // left empty because result list doesn't matter in this component.
        },
      },
    }

    const textToHighlight = 'Chrome'

    renderWithProvider(<HighlightText text={textToHighlight} />, { preloadedState: customInitialState })

    expect(screen.toJSON()).toMatchSnapshot()
    expect(screen.getByText(/Chrome/)).toBeOnTheScreen()
    expect(screen.getAllByTestId('highlight-text-highlighted')).toHaveLength(1)
  })

  it('should highlight query in text correctly', () => {
    const customInitialState: RootState = {
      ...initialStoreState,
      appState: {
        ...initialStoreState.appState,
        search: {
          query: 'o',
          result: [], // left empty because result list doesn't matter in this component.
        },
      },
    }

    const textToHighlight = 'Chrome & GOOGLE'

    renderWithProvider(<HighlightText text={textToHighlight} />, { preloadedState: customInitialState })

    expect(screen.getByText(/Chrome & GOOGLE/)).toBeOnTheScreen()

    const highlightedTexts = screen.getAllByTestId('highlight-text-highlighted')

    expect(highlightedTexts).toHaveLength(3)
    expect(highlightedTexts[0]).toHaveTextContent('o')
    expect(highlightedTexts[1]).toHaveTextContent('O')
    expect(highlightedTexts[2]).toHaveTextContent('O')
    // TODO: Check highlighted texts styling
  })
})
