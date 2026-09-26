'use client'

import React from 'react'
import styled, { css } from 'styled-components'

const tones = {
  public: css`
    background: ${({ theme }) => theme.colors.surface.wash};
    color: ${({ theme }) => theme.colors.status.public};
  `,
  invited: css`
    background: ${({ theme }) => theme.colors.surface.brand};
    color: ${({ theme }) => theme.colors.content.inverse};
  `,
  published: css`
    background: ${({ theme }) => theme.colors.surface.wash};
    color: ${({ theme }) => theme.colors.status.published};
  `,
  review: css`
    background: ${({ theme }) => theme.colors.surface.gold};
    color: ${({ theme }) => theme.colors.surface.ink};
  `,
  returned: css`
    background: ${({ theme }) => theme.colors.status.returned};
    color: ${({ theme }) => theme.colors.content.inverse};
  `,
  quiet: css`
    background: ${({ theme }) => theme.colors.surface.paper};
    color: ${({ theme }) => theme.colors.content.muted};
  `,
}

const Pill = styled.span<{ $tone: keyof typeof tones }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  padding: ${({ theme }) => `${theme.spacing(1)} ${theme.spacing(2)}`};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  text-transform: uppercase;
  ${({ $tone }) => tones[$tone]};
`

type BadgeProps = {
  children: React.ReactNode
  tone?: keyof typeof tones
}

const BadgeComponent = ({ children, tone = 'quiet' }: BadgeProps) => (
  <Pill $tone={tone}>{children}</Pill>
)

export const Badge = React.memo(BadgeComponent)
Badge.displayName = 'Badge'
