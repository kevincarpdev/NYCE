'use client'

import React from 'react'
import styled from 'styled-components'

import { PageSection, SectionWrapper } from '@/components/frontend/layout/Containers'
import { Reveal } from '@/components/frontend/motion/Reveal'
import { Button } from '@/components/frontend/ui/Button'

const Copy = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(6)};
  justify-items: start;
  max-width: 40rem;
`

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(3)};
`

const HomeCtaComponent = () => (
  <PageSection tone="gold">
    <SectionWrapper>
      <Reveal>
        <Copy>
          <h2>Look at the leftover library</h2>
          <p>
            Five minutes. Sample research only. Pick a role, or browse without signing in.
          </p>
          <Actions>
            <Button href="/walkthrough" size="lg" variant="primary">
              How to look at this
            </Button>
            <Button href="/library" size="lg" variant="ink">
              Browse the library
            </Button>
          </Actions>
        </Copy>
      </Reveal>
    </SectionWrapper>
  </PageSection>
)

export const HomeCta = React.memo(HomeCtaComponent)
HomeCta.displayName = 'HomeCta'
