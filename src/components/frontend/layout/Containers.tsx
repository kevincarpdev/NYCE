'use client'

import React from 'react'
import styled, { css } from 'styled-components'

export const pageWidth = css`
  width: min(100% - ${({ theme }) => theme.layout.gutter}, ${({ theme }) => theme.layout.maxWidth});
  margin-inline: auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: min(
      100% - ${({ theme }) => theme.layout.gutterWide},
      ${({ theme }) => theme.layout.maxWidth}
    );
  }
`

const tones = {
  paper: css`
    background: ${({ theme }) => theme.colors.surface.paper};
    color: ${({ theme }) => theme.colors.content.primary};
  `,
  raised: css`
    background: ${({ theme }) => theme.colors.surface.raised};
    color: ${({ theme }) => theme.colors.content.primary};
  `,
  brand: css`
    background: ${({ theme }) => theme.colors.surface.brand};
    color: ${({ theme }) => theme.colors.content.inverse};
  `,
  canvas: css`
    background: ${({ theme }) => theme.colors.surface.canvas};
    color: ${({ theme }) => theme.colors.surface.ink};
  `,
  gold: css`
    background: ${({ theme }) => theme.colors.surface.gold};
    color: ${({ theme }) => theme.colors.surface.ink};
  `,
  ink: css`
    background: ${({ theme }) => theme.colors.surface.ink};
    color: ${({ theme }) => theme.colors.content.inverse};
  `,
}

const Shell = styled.div`
  ${pageWidth};
`

const Section = styled.section<{ $tone: keyof typeof tones }>`
  ${({ $tone }) => tones[$tone]};
  padding-block: ${({ theme }) => theme.spacing(20)};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-block: ${({ theme }) => theme.spacing(32)};
  }
`

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(10)};
`

type BoxProps = {
  children: React.ReactNode
}

type SectionProps = BoxProps & {
  tone?: keyof typeof tones
}

const BaseContainerComponent = ({ children }: BoxProps) => <Shell>{children}</Shell>
export const BaseContainer = React.memo(BaseContainerComponent)
BaseContainer.displayName = 'BaseContainer'

const PageSectionComponent = ({ children, tone = 'paper' }: SectionProps) => (
  <Section $tone={tone}>
    <Shell>{children}</Shell>
  </Section>
)
export const PageSection = React.memo(PageSectionComponent)
PageSection.displayName = 'PageSection'

const SectionWrapperComponent = ({ children }: BoxProps) => <Stack>{children}</Stack>
export const SectionWrapper = React.memo(SectionWrapperComponent)
SectionWrapper.displayName = 'SectionWrapper'

export type SectionTone = keyof typeof tones
