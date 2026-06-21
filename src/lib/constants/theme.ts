/**
 * Design tokens — single source of truth for colors and spacing.
 * Use these constants instead of raw hex strings throughout the codebase.
 * If branding changes, update here and it propagates everywhere.
 */
export const COLORS = {
  /** Main background */
  bg: "#0a0f0a",
  /** Card / surface background */
  surface: "#1a1f1a",
  /** Default border */
  border: "#27272a",
  /** Brand green / primary accent */
  primary: "#00ff88",
  /** Primary text */
  textPrimary: "#f5f5f5",
  /** Muted / secondary text */
  textMuted: "#a1a1aa",
  /** Discord brand color */
  discord: "#5865F2",
} as const;

export const TRANSITIONS = {
  fast: "transition-all duration-300",
  base: "transition-all duration-500",
  slow: "transition-all duration-700",
} as const;
