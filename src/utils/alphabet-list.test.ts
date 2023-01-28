import { getAppsLetterIndex, getFirstLetter, getLettersMap } from './alphabet-list'
import { AppLetterIndex } from '../models/list-letter-index'
import { AppDetails } from '../models/app-details'

describe('AlphabetList Tests', () => {
  describe('getLettersMap Tests', () => {
    it('should map letters to indexes correctly', () => {
      const result = getLettersMap()

      expect(result['A']).toEqual(1)
      expect(result['Z']).toEqual(26)
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
    const apps: AppDetails[] = [
      {
        label: 'App 1',
        name: 'com.app_1',
      },
      {
        label: 'App 2',
        name: 'com.app_2',
      },
      {
        label: 'Brave',
        name: 'com.brave',
      },
      {
        label: 'Chrome',
        name: 'com.chrome',
      },
      {
        label: 'Clock',
        name: 'com.clock',
      },
      {
        label: 'Google',
        name: 'com.google',
      },
      {
        label: 'Youtube',
        name: 'com.youtube',
      },
      {
        label: '_App',
        name: 'com._app',
      },
    ]
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
        letter: 'Y',
        index: 6,
      },
      {
        letter: '#',
        index: 7,
      },
    ]

    it(`should return correct list of letter/index objects from app's list`, () => {
      expect(getAppsLetterIndex(apps)).toEqual(appLetterIndex)
    })
  })
})
