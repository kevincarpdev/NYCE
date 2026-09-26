'use client'

import React, { useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { ServerStyleSheet, StyleSheetManager, ThemeProvider } from 'styled-components'

import { GlobalStyle } from './GlobalStyle'
import { theme } from './theme'

type RegistryProps = {
  children: React.ReactNode
}

const StyledComponentsRegistryComponent = ({ children }: RegistryProps) => {
  const [sheet] = useState(() => new ServerStyleSheet())

  useServerInsertedHTML(() => {
    const styles = sheet.getStyleElement()
    sheet.instance.clearTag()
    return <>{styles}</>
  })

  return (
    <StyleSheetManager sheet={sheet.instance}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </StyleSheetManager>
  )
}

export const StyledComponentsRegistry = React.memo(StyledComponentsRegistryComponent)
StyledComponentsRegistry.displayName = 'StyledComponentsRegistry'
