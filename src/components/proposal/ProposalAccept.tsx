'use client'

import React from 'react'
import styled from 'styled-components'

import { Sheet, Eyebrow, Grid, Line, List } from '@/components/proposal/ProposalStyles'
import { proposal, terms } from '@/lib/proposal'

const Block = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(2)};
`

const Label = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.content.accent};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`

const ProposalAcceptComponent = () => (
  <Sheet data-page="accept">
    <Eyebrow>Acceptance</Eyebrow>
    <h1>Knowledge Hub engagement</h1>
    <p>
      The New York Climate Exchange retains Kevin Carpenter for the Knowledge Hub described here,
      for a flat fee of {proposal.fee}, with leftovers live by {proposal.launch} and support
      through {proposal.supportThrough}.
    </p>
    <List>
      {terms.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </List>
    <p>This offer is valid for {proposal.validDays} days from {proposal.date}.</p>
    <Grid>
      <Block>
        <Label>Name</Label>
        <Line id="sign-name" />
      </Block>
      <Block>
        <Label>Title</Label>
        <Line id="sign-title" />
      </Block>
      <Block>
        <Label>Signature</Label>
        <Line id="sign-signature" />
      </Block>
      <Block>
        <Label>Date</Label>
        <Line id="sign-date" />
      </Block>
    </Grid>
    <p>
      Kevin Carpenter, {proposal.date}
    </p>
  </Sheet>
)

export const ProposalAccept = React.memo(ProposalAcceptComponent)
ProposalAccept.displayName = 'ProposalAccept'
