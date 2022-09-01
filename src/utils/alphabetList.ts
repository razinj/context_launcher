type LetterMap = {
  [key: string]: number
}

const alphabet = [
  'z',
  'y',
  'x',
  'w',
  'v',
  'u',
  't',
  's',
  'r',
  'q',
  'p',
  'o',
  'n',
  'm',
  'l',
  'k',
  'j',
  'i',
  'h',
  'g',
  'f',
  'e',
  'd',
  'c',
  'b',
  'a',
].reverse()

const getLettersMap = (): LetterMap => {
  const letterMap: LetterMap = {}

  alphabet.forEach((letter: string, index: number) => {
    letterMap[letter] = index + 1
  })

  return letterMap
}

const lettersMap = getLettersMap()

export const getFirstLetter = (value: string): string => {
  const firstChar = value.substring(0, 1)
  const isValidLetter = lettersMap[firstChar.toLowerCase()]

  if (isValidLetter) {
    return firstChar.toUpperCase()
  }

  return '#'
}
