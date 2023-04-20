import { AppDetails } from '../models/app-details'
import { AppLetterIndex } from '../models/list-letter-index'

type LetterMap = {
  [key: string]: number
}

const alphabet = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
]

/**
 * @returns Indexed alphabet letters in an object where the key is the alphabet and the value is the index
 */
export const getLettersMap = (): LetterMap => {
  const letterMap: LetterMap = {}

  alphabet.forEach((letter: string, index: number) => (letterMap[letter] = index + 1))

  return letterMap
}

/**
 * @param value Any string value
 * @returns A letter if the first chareceter of the value is an alphabet, otherwise it returns a '#'
 */
export const getFirstLetter = (value: string): string => {
  const firstChar = value.trim().substring(0, 1).toUpperCase()
  const isValidLetter = getLettersMap()[firstChar]

  if (isValidLetter) return firstChar

  return '#'
}

export const getAppsLetterIndex = (apps: AppDetails[]): AppLetterIndex[] => {
  const appsLetterIndex: AppLetterIndex[] = []
  const treatedLetters: string[] = []

  apps.forEach(({ name }: AppDetails, index: number) => {
    const letter = getFirstLetter(name)

    if (treatedLetters.includes(letter)) return

    appsLetterIndex.push({ letter, index })
    treatedLetters.push(letter)
  })

  return appsLetterIndex
}
