'use client'

import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    min-height: 100%;
  }

  body {
    background: ${({ theme }) => theme.colors.surface.paper};
    color: ${({ theme }) => theme.colors.content.primary};
    font-family: ${({ theme }) => theme.typography.fontFamily.sans};
    font-size: ${({ theme }) => theme.typography.fontSizes.body};
    font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
    line-height: ${({ theme }) => theme.typography.lineHeights.body};
    -webkit-font-smoothing: antialiased;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  img {
    display: block;
    max-width: 100%;
    height: auto;
  }

  h1,
  h2,
  h3 {
    font-family: inherit;
    font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
    line-height: ${({ theme }) => theme.typography.lineHeights.tight};
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  }

  h1 {
    font-size: ${({ theme }) => theme.typography.fontSizes.hero};
  }

  h2 {
    font-size: ${({ theme }) => theme.typography.fontSizes.section};
  }

  h3 {
    font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  }

  p {
    margin: 0;
  }

  button,
  input,
  select,
  textarea {
    font-family: inherit;
  }

  a:focus-visible,
  button:focus-visible,
  summary:focus-visible {
    outline: ${({ theme }) => theme.spacing(0.5)} solid ${({ theme }) => theme.colors.content.accent};
    outline-offset: ${({ theme }) => theme.spacing(1)};
  }

  html[data-motion='on'] [data-reveal]:not([data-shown='true']),
  html[data-motion='on'] [data-load]:not([data-shown='true']) {
    opacity: ${({ theme }) => theme.opacity.hidden};
    transform: translateY(${({ theme }) => theme.layout.revealLift});
  }

  html[data-motion='on'] [data-reveal],
  html[data-motion='on'] [data-load] {
    transition:
      opacity ${({ theme }) => theme.motion.reveal} ${({ theme }) => theme.motion.emphasize},
      transform ${({ theme }) => theme.motion.reveal} ${({ theme }) => theme.motion.emphasize};
    transition-delay: calc(${({ theme }) => theme.motion.stagger} * var(--stagger, 0));
  }

  html[data-motion='on'] [data-load] {
    display: inline-block;
  }

  @media (prefers-reduced-motion: reduce) {
    html[data-motion='on'] [data-reveal],
    html[data-motion='on'] [data-load] {
      opacity: 1;
      transform: none;
      transition: none;
    }
  }
`
