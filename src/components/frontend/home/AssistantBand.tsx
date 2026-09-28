'use client'

import React from 'react'
import styled from 'styled-components'

import { PageSection, SectionWrapper } from '@/components/frontend/layout/Containers'
import { Reveal } from '@/components/frontend/motion/Reveal'
import { Button } from '@/components/frontend/ui/Button'
import { brandPhotos } from '@/lib/brand'

const Layout = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(10)};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1.1fr 0.9fr;
    align-items: center;
  }
`

const Copy = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(5)};
  justify-items: start;
`

const Photo = styled.img`
  width: 100%;
  height: ${({ theme }) => theme.layout.featurePhoto};
  object-fit: cover;
`

const AssistantBandComponent = () => (
  <PageSection tone="canvas">
    <SectionWrapper>
      <Layout>
        <Reveal>
          <Copy>
            <h2>Ask it, later</h2>
            <p>
              An assistant can propose edits to a leftover. A person clicks yes. Published pages do
              not change on their own. This is not a public chatbot.
            </p>
            <Button href="/sign-in?role=student" size="lg" variant="primary">
              Open a leftover workspace
            </Button>
          </Copy>
        </Reveal>
        <Reveal delay={1}>
          <Photo alt={brandPhotos.demoLab.alt} src={brandPhotos.demoLab.src} />
        </Reveal>
      </Layout>
    </SectionWrapper>
  </PageSection>
)

export const AssistantBand = React.memo(AssistantBandComponent)
AssistantBand.displayName = 'AssistantBand'
