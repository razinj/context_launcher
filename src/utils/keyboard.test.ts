import { Keyboard } from 'react-native'
import { dismissKeyboard } from './keyboard'

describe('Keyboard Tests', () => {
  const rnKeyboardDismissSpy = jest.spyOn(Keyboard, 'dismiss')

  beforeEach(() => {
    rnKeyboardDismissSpy.mockReset()
  })

  it('should call keyboard dismiss method', () => {
    dismissKeyboard()

    expect(rnKeyboardDismissSpy).toBeCalledTimes(1)
  })
})
