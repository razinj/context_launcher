import { apps } from '../../utils/test/data'
import { AppLetterIndex } from '../models/list-letter-index'
import { getAppsLetterIndex, getFirstLetter, getLettersMap } from './alphabet-list'

describe('AlphabetList Tests', () => {
  describe('getLettersMap Tests', () => {
    it('should map letters to indexes correctly', () => {
      const result = getLettersMap()

      expect(result.A).toEqual(1)
      expect(result.Z).toEqual(26)
    })
  })

  describe('getFirstLetter Tests', () => {
    it('should return the correct letter from passed alphabet-starting value', () => {
      expect(getFirstLetter('hello world!')).toBe('H')
    })

    it('should return # from passed non-alphabet-starting value', () => {
      expect(getFirstLetter('_a_value')).toBe('#')
    })
  })

  describe('getAppsLetterIndex Tests', () => {
    const appLetterIndex: AppLetterIndex[] = [
      {
        letter: 'A',
        index: 0,
      },
      {
        letter: 'B',
        index: 2,
      },
      {
        letter: 'C',
        index: 3,
      },
      {
        letter: 'G',
        index: 5,
      },
      {
        letter: 'M',
        index: 6,
      },
      {
        letter: 'Y',
        index: 7,
      },
      {
        letter: '#',
        index: 8,
      },
    ]

    it(`should return correct list of letter/index objects from app's list`, () => {
      expect(getAppsLetterIndex(apps)).toEqual(appLetterIndex)
    })
  })
})
