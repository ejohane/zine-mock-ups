/**
 * Zine Mock-ups Design System
 *
 * A calm, focused design language for prototyping content curation UIs.
 */

import { Platform } from 'react-native';

// Brand colors - Monotone palette
const brand = {
  primary: '#1A1A1A', // Near black - main accent
  primaryLight: '#404040',
  primaryDark: '#000000',
  secondary: '#6B6B6B', // Medium gray - for highlights
  secondaryLight: '#8A8A8A',
};

// Semantic colors - Muted monotone variants
const semantic = {
  success: '#4A4A4A',
  warning: '#5A5A5A',
  error: '#2A2A2A',
  info: '#6A6A6A',
};

// Content type colors (for visual categorization) - Grayscale
export const ContentColors = {
  podcast: '#3A3A3A',
  video: '#1A1A1A',
  article: '#5A5A5A',
  post: '#4A4A4A',
};

// Provider colors - Grayscale
export const ProviderColors = {
  youtube: '#2A2A2A',
  spotify: '#1A1A1A',
  substack: '#3A3A3A',
};

export const Colors = {
  light: {
    // Core
    text: '#000000',
    textSecondary: '#4A4A4A',
    textTertiary: '#8A8A8A',
    background: '#FFFFFF',
    backgroundSecondary: '#FAFAFA',
    backgroundTertiary: '#F5F5F5',

    // Interactive
    tint: brand.primary,
    tintLight: brand.primaryLight,
    link: '#0066CC',
    buttonPrimary: '#1A1A1A',
    buttonPrimaryText: '#FFFFFF',
    icon: '#4A4A4A',
    iconMuted: '#C0C0C0',

    // Tab bar
    tabIconDefault: '#9A9A9A',
    tabIconSelected: brand.primary,

    // Cards & surfaces
    card: '#FFFFFF',
    cardHover: '#FAFAFA',
    border: '#E0E0E0',
    borderLight: '#F0F0F0',

    // Overlays
    overlay: 'rgba(0, 0, 0, 0.5)',
    scrim: 'rgba(255, 255, 255, 0.8)',

    // Brand
    ...brand,
    ...semantic,
  },
  dark: {
    // Core
    text: '#FFFFFF',
    textSecondary: '#A0A0A0',
    textTertiary: '#6A6A6A',
    background: '#000000',
    backgroundSecondary: '#1A1A1A',
    backgroundTertiary: '#2A2A2A',

    // Interactive
    tint: '#FFFFFF',
    tintLight: '#E0E0E0',
    link: '#FFFFFF',
    buttonPrimary: '#FFFFFF',
    buttonPrimaryText: '#000000',
    icon: '#A0A0A0',
    iconMuted: '#4A4A4A',

    // Tab bar
    tabIconDefault: '#6A6A6A',
    tabIconSelected: '#FFFFFF',

    // Cards & surfaces
    card: '#1A1A1A',
    cardHover: '#2A2A2A',
    border: '#2A2A2A',
    borderLight: '#1A1A1A',

    // Overlays
    overlay: 'rgba(0, 0, 0, 0.7)',
    scrim: 'rgba(0, 0, 0, 0.8)',

    // Brand
    ...brand,
    ...semantic,
  },
};

// Typography scale
export const Typography = {
  // Display - for hero sections
  displayLarge: {
    fontSize: 40,
    lineHeight: 48,
    fontWeight: '700' as const,
    letterSpacing: -1,
  },
  displayMedium: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '700' as const,
    letterSpacing: -0.5,
  },

  // Headlines
  headlineLarge: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '600' as const,
    letterSpacing: -0.3,
  },
  headlineMedium: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '600' as const,
    letterSpacing: -0.2,
  },
  headlineSmall: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600' as const,
  },

  // Titles
  titleLarge: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600' as const,
  },
  titleMedium: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600' as const,
  },
  titleSmall: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600' as const,
  },

  // Body
  bodyLarge: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400' as const,
  },
  bodyMedium: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400' as const,
  },
  bodySmall: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400' as const,
  },

  // Labels
  labelLarge: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500' as const,
  },
  labelMedium: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500' as const,
  },
  labelSmall: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '500' as const,
    letterSpacing: 0.5,
    textTransform: 'uppercase' as const,
  },
};

// Spacing scale (4px base)
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
};

// Border radius
export const Radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  full: 9999,
};

// Shadows
export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
