'use client'

import React from 'react'
import styled from 'styled-components'

import { PageSection, SectionWrapper } from '@/components/frontend/layout/Containers'
import { Button } from '@/components/frontend/ui/Button'
import { Reveal } from '@/components/frontend/motion/Reveal'
import { audiences } from '@/lib/content'

const Intro = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(4)};
  max-width: 40rem;
`

const Grid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(6)};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(4, 1fr);
  }
`

const Card = styled.article`
  background: ${({ theme }) => theme.colors.surface.raised};
  padding: ${({ theme }) => theme.spacing(8)};
  display: grid;
  gap: ${({ theme }) => theme.spacing(4)};
  height: 100%;
`

const Role = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.content.accent};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`

const WhoItsForComponent = () => (
  <PageSection tone="paper">
    <SectionWrapper>
      <Reveal>
        <Intro>
          <h2>Who it is for</h2>
          <p>
            Professors and students developing climate-tech startups. Next semester’s students and
            aspiring founders. A reviewer at The Exchange.
          </p>
        </Intro>
      </Reveal>
      <Grid>
        {audiences.map((person, index) => (
          <Reveal delay={index + 1} key={person.role}>
            <Card>
              <Role>{person.role}</Role>
              <h3>{person.name}</h3>
              <p>{person.body}</p>
              <Button href={person.href} variant="ink">
                {person.action}
              </Button>
            </Card>
          </Reveal>
        ))}
      </Grid>
    </SectionWrapper>
  </PageSection>
)

export const WhoItsFor = React.memo(WhoItsForComponent)
WhoItsFor.displayName = 'WhoItsFor'
