'use client'

import React from 'react'
import styled from 'styled-components'

import { PageSection, SectionWrapper } from '@/components/frontend/layout/Containers'
import { CountUp } from '@/components/frontend/motion/CountUp'
import { Reveal } from '@/components/frontend/motion/Reveal'

const Grid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(10)};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(4, 1fr);
  }
`

const Stat = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(3)};
`

const Label = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  max-width: 16ch;
`

export type HubStat = {
  value: number
  suffix?: string
  label: string
}

type StatsBandProps = {
  stats: HubStat[]
}

const StatsBandComponent = ({ stats }: StatsBandProps) => (
  <PageSection tone="brand">
    <SectionWrapper>
      <Grid>
        {stats.map((stat, index) => (
          <Reveal delay={index} key={stat.label}>
            <Stat>
              <CountUp suffix={stat.suffix} value={stat.value} />
              <Label>{stat.label}</Label>
            </Stat>
          </Reveal>
        ))}
      </Grid>
    </SectionWrapper>
  </PageSection>
)

export const StatsBand = React.memo(StatsBandComponent)
StatsBand.displayName = 'StatsBand'
