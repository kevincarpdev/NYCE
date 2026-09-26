'use client'

import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const Bar = styled.div`
  background: ${({ theme }) => theme.colors.surface.gold};
  color: ${({ theme }) => theme.colors.surface.ink};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  text-transform: uppercase;
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
`

const Inner = styled.div`
  width: min(100% - ${({ theme }) => theme.spacing(8)}, ${({ theme }) => theme.layout.maxWidth});
  margin-inline: auto;
  padding-block: ${({ theme }) => theme.spacing(2)};
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(4)};
  flex-wrap: wrap;
`

const Quiet = styled(Link)`
  text-decoration: underline;
  text-underline-offset: ${({ theme }) => theme.spacing(1)};
`

const PrototypeBannerComponent = () => (
  <Bar>
    <Inner>
      <span>Prototype beside nyce.org · sample research only</span>
      <Quiet href="/walkthrough">How to look at this</Quiet>
    </Inner>
  </Bar>
)

export const PrototypeBanner = React.memo(PrototypeBannerComponent)
PrototypeBanner.displayName = 'PrototypeBanner'
