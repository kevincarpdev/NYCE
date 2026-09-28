'use client'

import React from 'react'

import { Sheet, Eyebrow, Grid, List, Table, Gold } from '@/components/proposal/ProposalStyles'
import { included, notIncluded, proposal, running } from '@/lib/proposal'

const ProposalInvestmentComponent = () => (
  <Sheet>
    <Eyebrow>Investment</Eyebrow>
    <h1>{proposal.fee} flat</h1>
    <Gold>
      <p>
        Four milestones of $10,500: signing, launch, end of March, and the final recommendations.
        Or ten monthly payments of $4,200. Whichever suits your finance team.
      </p>
    </Gold>
    <Grid>
      <div>
        <h2>Included</h2>
        <List>
          {included.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </List>
      </div>
      <div>
        <h2>Not included</h2>
        <List>
          {notIncluded.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </List>
      </div>
    </Grid>
    <h2>What The Exchange pays besides the fee</h2>
    <Table $layout="pair">
      <thead>
        <tr>
          <th>Item</th>
          <th>Cost</th>
        </tr>
      </thead>
      <tbody>
        {running.map((row) => (
          <tr key={row.item}>
            <td>{row.item}</td>
            <td>{row.cost}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </Sheet>
)

export const ProposalInvestment = React.memo(ProposalInvestmentComponent)
ProposalInvestment.displayName = 'ProposalInvestment'
