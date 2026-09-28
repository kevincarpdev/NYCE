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
    overlay: {
      start: 'rgba(43, 59, 71, 0.82)',
      mid: 'rgba(20, 81, 109, 0.42)',
      end: 'rgba(20, 81, 109, 0.08)',
    },
    focus: {
      ring: 'rgba(20, 81, 109, 0.24)',
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
      panel: '2.5rem',
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
    maxWidth: '90rem',
    wideMaxWidth: '90rem',
    gutter: '1.5rem',
    gutterWide: '2.5rem',
    asideWidth: '24rem',
    previewHeight: '32rem',
    logoWidth: 168,
    logoWidthMobile: 120,
    logoHeight: 44,
    authPhotoRatio: '1.15fr',
    authFormWidth: '28rem',
    curveHeight: '5.5rem',
    curveClip: 'ellipse(70% 100% at 50% 100%)',
    authMobilePhoto: '14rem',
    heroPhotoHeight: '22rem',
    bannerHeight: '2.75rem',
    areaMin: '8rem',
  },
  zIndex: {
    base: 0,
    overlay: 1,
    content: 2,
  },
  motion: {
    marquee: '42s',
    fade: '160ms',
    easing: 'linear',
    out: 'ease-out',
  },
  opacity: {
    disabled: 0.45,
  },
  icons: {
    sm: 16,
    md: 20,
    lg: 28,
  },
  breakpoints: {
    md: '48rem',
    lg: '80rem',
  },
} as const

export type AppTheme = typeof theme
