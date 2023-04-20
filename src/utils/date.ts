export const getTimeFromDate = (stringDate?: string): string => {
  if (!stringDate) return 'unset'

  const date = new Date(stringDate)

  const singleDigitHours = `${date.getHours()}`.length === 1
  const singleDigitMinutes = `${date.getMinutes()}`.length === 1

  const hours = singleDigitHours ? `0${date.getHours()}` : date.getHours()
  const minutes = singleDigitMinutes ? `0${date.getMinutes()}` : date.getMinutes()

  return `${hours}:${minutes}`
}

export const getDateFromStringWithCurrentDateValue = (stringDate?: string): Date | undefined => {
  if (!stringDate) return

  const currentDate = new Date()
  const fullDate = new Date(stringDate)
  return new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    fullDate.getHours(),
    fullDate.getMinutes(),
    0,
    0
  )
}

export const stripDateFromSeconds = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), 0, 0)
}
