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

const Shell = styled.div`
  ${pageWidth};
`

const Section = styled.section`
  padding-block: ${({ theme }) => theme.spacing(16)};
`

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(8)};
`

type BoxProps = {
  children: React.ReactNode
}

const BaseContainerComponent = ({ children }: BoxProps) => <Shell>{children}</Shell>
export const BaseContainer = React.memo(BaseContainerComponent)
BaseContainer.displayName = 'BaseContainer'

const PageSectionComponent = ({ children }: BoxProps) => (
  <Section>
    <Shell>{children}</Shell>
  </Section>
)
export const PageSection = React.memo(PageSectionComponent)
PageSection.displayName = 'PageSection'

const SectionWrapperComponent = ({ children }: BoxProps) => <Stack>{children}</Stack>
export const SectionWrapper = React.memo(SectionWrapperComponent)
SectionWrapper.displayName = 'SectionWrapper'
