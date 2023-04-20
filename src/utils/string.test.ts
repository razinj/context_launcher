import { createKeyForHighlightTextElement, truncateString } from './string'

describe('String utils tests', () => {
  describe('truncateString Tests', () => {
    it(`should truncate string if it's length surpasses the max length`, () => {
      expect(truncateString('Hello World!', 5)).toBe('Hello...')
    })

    it(`should not truncate string if it's length doesn't surpasses the max length`, () => {
      expect(truncateString('Hi', 5)).toBe('Hi')
    })
  })

  describe('createKeyForHighlightTextElement Tests', () => {
    it('should replace all non-alphanumeric values to hyphens', () => {
      expect(createKeyForHighlightTextElement(1, 'Hello World!')).toBe('1-Hello-World-')
    })
  })
})
