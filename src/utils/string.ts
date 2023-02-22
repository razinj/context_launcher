export const truncateString = (value: string | undefined, maxLength: number): string | undefined => {
  return value && value.length > maxLength ? `${value.substring(0, maxLength)}...` : value
}

/**
 * Replaces all non-alphanumeric values with hyphens
 */
export const createKeyForHighlightTextElement = (index: number, substring: string): string => {
  return `${index}-${substring.replace(/[\W_]/g, '-')}`
}
