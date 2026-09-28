'use client'

import React from 'react'
import styled, { keyframes } from 'styled-components'

const fade = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const Frame = styled.div`
  animation: ${fade} ${({ theme }) => theme.motion.page} ${({ theme }) => theme.motion.out};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

type TemplateProps = {
  children: React.ReactNode
}

const FrontendTemplate = ({ children }: TemplateProps) => <Frame>{children}</Frame>

export default FrontendTemplate
