'use client'

import React from 'react'

import { Sheet, Eyebrow, Grid, List } from '@/components/proposal/ProposalStyles'
import { alreadyShows, tenMonthsAdd } from '@/lib/proposal'

const ProposalScopeComponent = () => (
  <Sheet>
    <Eyebrow>The 10 months</Eyebrow>
    <h1>What the prototype already shows, and what the term adds</h1>
    <Grid>
      <div>
        <h2>Already in the prototype</h2>
        <List>
          {alreadyShows.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </List>
      </div>
      <div>
        <h2>What the 10 months add</h2>
        <List>
          {tenMonthsAdd.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </List>
      </div>
    </Grid>
    <p>
      The hours go to real files, the taxonomy, the agreement language, Microsoft sign-in if you
      want it, US hosting, training, and support through the year. The prototype is the starting
      point, not the finished library.
    </p>
  </Sheet>
)

export const ProposalScope = React.memo(ProposalScopeComponent)
ProposalScope.displayName = 'ProposalScope'
