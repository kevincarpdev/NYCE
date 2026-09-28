'use client'

import React from 'react'
import styled from 'styled-components'

import { PageSection, SectionWrapper } from '@/components/frontend/layout/Containers'
import { Reveal } from '@/components/frontend/motion/Reveal'
import { howItWorks } from '@/lib/content'

const Intro = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(4)};
  max-width: 40rem;
`

const Grid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(8)};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(4, 1fr);
  }
`

const Card = styled.article`
  display: grid;
  gap: ${({ theme }) => theme.spacing(4)};
  align-content: start;
`

const Step = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  text-transform: uppercase;
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ theme }) => theme.colors.content.accent};
`

const HowItWorksComponent = () => (
  <PageSection tone="raised">
    <SectionWrapper>
      <Reveal>
        <Intro>
          <h2>How it works</h2>
          <p>Leave it. Agree. Review. Find it. A tagging taxonomy so next semester can browse.</p>
        </Intro>
      </Reveal>
      <Grid>
        {howItWorks.map((item, index) => (
          <Reveal delay={index + 1} key={item.step}>
            <Card>
              <Step>{item.step}</Step>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </Card>
          </Reveal>
        ))}
      </Grid>
    </SectionWrapper>
  </PageSection>
)

export const HowItWorks = React.memo(HowItWorksComponent)
HowItWorks.displayName = 'HowItWorks'
