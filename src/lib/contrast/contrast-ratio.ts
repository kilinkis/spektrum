/**
 * Converts a hex color string to its relative luminance.
 * Handles both 3-digit and 6-digit hex codes.
 * @param hex - Hex color string (e.g., "#fff" or "#ffffff")
 * @returns Relative luminance (0 = black, 1 = white)
 */
export function hexToLuminance(hex: string): number {
  // Remove '#' and expand short hex codes (e.g., 'fff' -> 'ffffff')
  let cleanHex = hex.replace('#', '')
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(x => x + x).join('')
  }

  // Validate hex string
  if (!/^[0-9a-fA-F]{6}$/.test(cleanHex)) {
    throw new Error(`Invalid hex color: ${hex}`)
  }

  // Convert hex to sRGB values (0-1)
  const sRGB = cleanHex.match(/.{2}/g)!.map(x => parseInt(x, 16) / 255)

  // Convert sRGB to linear RGB
  const [r, g, b] = sRGB.map(c =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  )

  // Calculate luminance using the Rec. 709 formula (https://en.wikipedia.org/wiki/Rec._709)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/**
 * Calculates the contrast ratio between two hex colors.
 * @param fg - Foreground hex color
 * @param bg - Background hex color
 * @returns Contrast ratio (1 = no contrast, 21 = max contrast)
 */
export function contrastRatio(fg: string, bg: string): number {
  const l1 = hexToLuminance(fg)
  const l2 = hexToLuminance(bg)

  // Contrast ratio formula as per WCAG (https://www.w3.org/WAI/GL/wiki/Contrast_ratio)
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
}