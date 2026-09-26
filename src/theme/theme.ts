export const theme = {
  colors: {
    content: {
      primary: '#2b3b47',
      muted: '#5a6b76',
      inverse: '#ffffff',
      accent: '#14516d',
    },
    surface: {
      paper: '#eef4f5',
      raised: '#ffffff',
      brand: '#14516d',
      canvas: '#67aab5',
      ink: '#2b3b47',
      gold: '#ffca00',
      wash: '#d7ecef',
    },
    border: {
      subtle: '#c5d6db',
      strong: '#14516d',
    },
    status: {
      published: '#14516d',
      review: '#c99700',
      returned: '#8f3d2b',
      invited: '#14516d',
      public: '#3d7a84',
    },
  },
  typography: {
    fontFamily: {
      sans: "var(--font-onest), 'Helvetica Neue', sans-serif",
    },
    fontSizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.5rem',
      xxl: '2.25rem',
      display: '3.25rem',
    },
    fontWeights: {
      medium: 500,
      bold: 700,
    },
    lineHeights: {
      tight: 1.1,
      body: 1.55,
    },
    letterSpacing: {
      tight: '-0.03em',
      wide: '0.12em',
    },
  },
  spacing: (units: number) => `${units * 4}px`,
  radii: {
    none: '0',
    sm: '2px',
  },
  layout: {
    maxWidth: '72rem',
    logoWidth: 168,
    logoWidthMobile: 120,
    logoHeight: 44,
  },
  icons: {
    sm: 16,
    md: 20,
    lg: 28,
  },
  breakpoints: {
    md: '48rem',
  },
} as const

export type AppTheme = typeof theme
