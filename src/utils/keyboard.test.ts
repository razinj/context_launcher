import { Keyboard } from 'react-native'
import { dismissKeyboard } from './keyboard'

describe('Keyboard Tests', () => {
  beforeAll(() => {
    jest.spyOn(Keyboard, 'dismiss')
  })

  it('should call keyboard dismiss method', () => {
    dismissKeyboard()

    expect(Keyboard.dismiss).toBeCalledTimes(1)
  })
})
