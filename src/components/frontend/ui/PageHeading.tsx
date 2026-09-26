'use client'

import React from 'react'
import styled from 'styled-components'

const Heading = styled.h1`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSizes.xxl};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
`

type HeadingProps = {
  children: React.ReactNode
}

const PageHeadingComponent = ({ children }: HeadingProps) => <Heading>{children}</Heading>

export const PageHeading = React.memo(PageHeadingComponent)
PageHeading.displayName = 'PageHeading'
