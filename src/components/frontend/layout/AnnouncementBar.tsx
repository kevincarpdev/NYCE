'use client'

import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

import { pageWidth } from '@/components/frontend/layout/Containers'
import { hubCopy } from '@/lib/brand'

const Bar = styled.div`
  background: ${({ theme }) => theme.colors.surface.gold};
  color: ${({ theme }) => theme.colors.surface.ink};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  text-transform: uppercase;
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`

const Inner = styled.div`
  ${pageWidth};
  min-height: ${({ theme }) => theme.layout.bannerHeight};
  padding-block: ${({ theme }) => theme.spacing(2)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(4)};
  flex-wrap: wrap;
`

const Quiet = styled(Link)`
  text-decoration: underline;
  text-underline-offset: ${({ theme }) => theme.spacing(1)};
  transition: color ${({ theme }) => theme.motion.fade} ${({ theme }) => theme.motion.out};

  &:hover {
    color: ${({ theme }) => theme.colors.content.accent};
  }
`

const AnnouncementBarComponent = () => (
  <Bar>
    <Inner>
      <span>{hubCopy.announcement}</span>
      <Quiet href="/walkthrough">{hubCopy.announcementLink}</Quiet>
    </Inner>
  </Bar>
)

export const AnnouncementBar = React.memo(AnnouncementBarComponent)
AnnouncementBar.displayName = 'AnnouncementBar'
