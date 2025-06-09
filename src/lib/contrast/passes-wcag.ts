/**
 * Checks if a contrast ratio passes WCAG AA or AAA standards.
 * @param ratio - Contrast ratio
 * @returns Object with AA and AAA boolean results
 */
export function passesWCAG(ratio: number) {
  return {
    AA: ratio >= 4.5,   // Minimum for normal text
    AAA: ratio >= 7,    // Minimum for enhanced contrast
  }
}