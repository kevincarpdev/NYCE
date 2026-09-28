'use client'

import React from 'react'
import styled from 'styled-components'

import { PageSection, SectionWrapper } from '@/components/frontend/layout/Containers'
import { Reveal } from '@/components/frontend/motion/Reveal'
import { RevealText } from '@/components/frontend/motion/RevealText'

const Statement = styled.p`
  margin: 0;
  max-width: 28ch;
  font-size: ${({ theme }) => theme.typography.fontSizes.statement};
  line-height: ${({ theme }) => theme.typography.lineHeights.statement};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ theme }) => theme.colors.surface.ink};
`

const MissionBandComponent = () => (
  <PageSection tone="canvas">
    <SectionWrapper>
      <Reveal>
        <Statement>
          <RevealText
            as="span"
            text="A hub for leftover climate-tech research, beside nyce.org, not a rebuild of it."
          />
        </Statement>
      </Reveal>
    </SectionWrapper>
  </PageSection>
)

export const MissionBand = React.memo(MissionBandComponent)
MissionBand.displayName = 'MissionBand'
