'use client'

import React from 'react'
import styled from 'styled-components'

import { Sheet, Eyebrow, Grid, Gold } from '@/components/proposal/ProposalStyles'
import { glance, proposal } from '@/lib/proposal'

const Keep = styled.strong`
  white-space: nowrap;
`

const ProposalGlanceComponent = () => (
  <Sheet>
    <Eyebrow>At a glance</Eyebrow>
    <h1>What I am offering</h1>
    <Grid>
      {glance.map((row) => (
        <div key={row.label}>
          <Eyebrow>{row.label}</Eyebrow>
          <p>{row.value}</p>
        </div>
      ))}
    </Grid>
    <Gold>
      <p>
        The prototype already covers most of Month 1. That is why the flat fee is {proposal.fee},
        under the $44,000 we discussed, and why leftovers can be live by {proposal.launch} so
        spring students can find what the fall left behind.
      </p>
    </Gold>
    <p>
      Try it in five minutes. Pick any role at the sign-in page and click Continue. Shared password{' '}
      <Keep>{proposal.password}</Keep> is already filled. A five-minute tour is linked at the top of
      the hub.
    </p>
    <p>Next step: a 20-minute walkthrough whenever it suits, or sign the acceptance page.</p>
  </Sheet>
)

export const ProposalGlance = React.memo(ProposalGlanceComponent)
ProposalGlance.displayName = 'ProposalGlance'
