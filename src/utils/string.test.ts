import { truncateString } from './string'

describe('String utils tests', () => {
  it(`should truncate string if it's length surpasses the max length`, () => {
    expect(truncateString('Hello World!', 5)).toBe('Hello...')
  })

  it(`should not truncate string if it's length doesn't surpasses the max length`, () => {
    expect(truncateString('Hi', 5)).toBe('Hi')
  })
})
