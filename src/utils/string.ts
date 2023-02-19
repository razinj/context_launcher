export const truncateString = (value: string | undefined, maxLength: number): string | undefined => {
  return value && value.length > maxLength ? `${value.substring(0, maxLength)}...` : value
}
