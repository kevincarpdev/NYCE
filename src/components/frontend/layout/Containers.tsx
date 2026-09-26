'use client'

import React from 'react'
import styled from 'styled-components'

const Shell = styled.div`
  width: min(100% - ${({ theme }) => theme.spacing(8)}, ${({ theme }) => theme.layout.maxWidth});
  margin-inline: auto;
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
