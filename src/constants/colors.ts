export const colors = {
  white: "#fff",
  emeraldGreen: "#4CAF50",
  darkGold: "#E6B800",
} as const;

export type ColorKeys = keyof typeof colors;
