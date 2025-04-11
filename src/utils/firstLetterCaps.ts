/**
 * Converts the first letter of a string to uppercase.
 * @param str - The string to be converted.
 * @returns The string with the first letter capitalized.
 */
export function firstLetterCaps(str: string): string {
  if (!str) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}
