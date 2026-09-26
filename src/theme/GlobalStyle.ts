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
    font-size: ${({ theme }) => theme.typography.fontSizes.md};
    font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
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
    line-height: ${({ theme }) => theme.typography.lineHeights.tight};
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  }

  h2 {
    font-size: ${({ theme }) => theme.typography.fontSizes.xxl};
  }

  h3 {
    font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  }
`
