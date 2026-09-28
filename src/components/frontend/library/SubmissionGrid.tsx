'use client'

import React from 'react'
import styled from 'styled-components'

import { PageSection, SectionWrapper, type SectionTone } from '@/components/frontend/layout/Containers'
import { SubmissionCard } from '@/components/frontend/library/SubmissionCard'
import type { SubmissionCard as Item } from '@/lib/queries'

const Grid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(5)};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const Heading = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSizes.section};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`

type ListProps = {
  title: string
  items: Item[]
  tone?: SectionTone
}

const SubmissionGridComponent = ({ title, items, tone = 'paper' }: ListProps) => (
  <PageSection tone={tone}>
    <SectionWrapper>
      <Heading>{title}</Heading>
      {items.length ? (
        <Grid>
          {items.map((item) => (
            <SubmissionCard item={item} key={item.id} />
          ))}
        </Grid>
      ) : (
        <p>Nothing in this view yet.</p>
      )}
    </SectionWrapper>
  </PageSection>
)

export const SubmissionGrid = React.memo(SubmissionGridComponent)
SubmissionGrid.displayName = 'SubmissionGrid'
