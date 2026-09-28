'use client'

import React from 'react'
import styled from 'styled-components'

import { PageSection, SectionWrapper } from '@/components/frontend/layout/Containers'
import { Reveal } from '@/components/frontend/motion/Reveal'
import { Badge } from '@/components/frontend/ui/Badge'

const Layout = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(10)};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }
`

const Copy = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(5)};
`

const Record = styled.article`
  background: ${({ theme }) => theme.colors.surface.raised};
  padding: ${({ theme }) => theme.spacing(8)};
  display: grid;
  gap: ${({ theme }) => theme.spacing(4)};
`

const Row = styled.p`
  margin: 0;
  display: grid;
  gap: ${({ theme }) => theme.spacing(1)};
`

const Label = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.content.accent};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`

const OwnershipBandComponent = () => (
  <PageSection tone="paper">
    <SectionWrapper>
      <Layout>
        <Reveal>
          <Copy>
            <h2>Ownership and attribution stay on the record</h2>
            <p>
              Sensitivity around what is shared, and a clear record of who owns what, sit in the
              product from the start. Submitters agree before a file is stored. The leftover page
              keeps the authors, the university, and the date.
            </p>
          </Copy>
        </Reveal>
        <Reveal delay={1}>
          <Record>
            <Badge tone="published">Agreed</Badge>
            <Row>
              <Label>Authors</Label>
              Amina Ruiz, Dr. Priya Raman
            </Row>
            <Row>
              <Label>University</Label>
              Stony Brook University
            </Row>
            <Row>
              <Label>Agreed</Label>
              12 March 2026
            </Row>
            <Row>
              <Label>Reuse</Label>
              Methods and open questions. Not a company.
            </Row>
          </Record>
        </Reveal>
      </Layout>
    </SectionWrapper>
  </PageSection>
)

export const OwnershipBand = React.memo(OwnershipBandComponent)
OwnershipBand.displayName = 'OwnershipBand'
