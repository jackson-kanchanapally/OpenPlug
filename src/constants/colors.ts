export const colors = {
  white: "#fff",
  emeraldGreen: "#4CAF50",
  darkGold: "#E6B800",
  lightGrey: "#f5f5f5",
  veryDarkGrey: "#333",
  black: "#000",
  forestGreen: "#2E7D32",
  mediumGrey: "#666666",
  lightGreenBg: "#E8F5E9",
  errorRed: "#FF3B30",
} as const;

export type ColorKeys = keyof typeof colors;
