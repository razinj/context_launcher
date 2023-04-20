import { AppDetails } from '../models/app-details'
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
    const apps: AppDetails[] = [
      {
        name: 'App 1',
        packageName: 'com.app_1',
        icon: 'ICON',
      },
      {
        name: 'App 2',
        packageName: 'com.app_2',
        icon: 'ICON',
      },
      {
        name: 'Brave',
        packageName: 'com.brave',
        icon: 'ICON',
      },
      {
        name: 'Chrome',
        packageName: 'com.chrome',
        icon: 'ICON',
      },
      {
        name: 'Clock',
        packageName: 'com.clock',
        icon: 'ICON',
      },
      {
        name: 'Google',
        packageName: 'com.google',
        icon: 'ICON',
      },
      {
        name: 'Youtube',
        packageName: 'com.youtube',
        icon: 'ICON',
      },
      {
        name: '_App',
        packageName: 'com._app',
        icon: 'ICON',
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
