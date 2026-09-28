'use client'

import React from 'react'
import styled, { keyframes } from 'styled-components'

import { partners } from '@/lib/brand'

const track = [...partners, ...partners]

const scroll = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
`

const Bar = styled.div`
  overflow: hidden;
  min-width: 0;
  background: ${({ theme }) => theme.colors.surface.canvas};
  color: ${({ theme }) => theme.colors.surface.ink};
  padding-block: ${({ theme }) => theme.spacing(6)};
`

const Track = styled.div`
  display: flex;
  width: max-content;
  gap: ${({ theme }) => theme.spacing(6)};
  animation: ${scroll} ${({ theme }) => theme.motion.marquee} ${({ theme }) => theme.motion.easing}
    infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const Item = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  text-transform: uppercase;
  white-space: nowrap;
`

const PartnerMarqueeComponent = () => (
  <Bar>
    <Track>
      {track.map((partner, index) => (
        <Item key={`${partner}-${index}`}>
          {index % partners.length === 0 ? `Anchored by ${partner}` : partner}
        </Item>
      ))}
    </Track>
  </Bar>
)

export const PartnerMarquee = React.memo(PartnerMarqueeComponent)
PartnerMarquee.displayName = 'PartnerMarquee'
