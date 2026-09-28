'use client'

import React from 'react'

import { Sheet, Eyebrow, Table } from '@/components/proposal/ProposalStyles'
import { proposal, timeline } from '@/lib/proposal'

const ProposalTimelineComponent = () => (
  <Sheet>
    <Eyebrow>Schedule</Eyebrow>
    <h1>Ten months, live leftovers by mid-December</h1>
    <p>
      Kickoff {proposal.kickoff}. Concentrated work in the first months and the last months, light
      in between, matching the posting.
    </p>
    <Table $layout="schedule">
      <thead>
        <tr>
          <th>When</th>
          <th>What</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {timeline.map((row) => (
          <tr key={row.when}>
            <td>{row.when}</td>
            <td>
              <strong>{row.title}</strong>
            </td>
            <td>{row.body}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </Sheet>
)

export const ProposalTimeline = React.memo(ProposalTimelineComponent)
ProposalTimeline.displayName = 'ProposalTimeline'
