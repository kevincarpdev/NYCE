'use client'

import React from 'react'

import { Sheet, Eyebrow, Table } from '@/components/proposal/ProposalStyles'
import { emailMap, postingMap } from '@/lib/proposal'

const ProposalMapComponent = () => (
  <Sheet>
    <Eyebrow>Scope</Eyebrow>
    <h1>What you asked for, and where it is</h1>
    <h2>From the posting</h2>
    <Table $layout="map">
      <thead>
        <tr>
          <th>Deliverable</th>
          <th>Now</th>
          <th>Where</th>
        </tr>
      </thead>
      <tbody>
        {postingMap.map((row) => (
          <tr key={row.item}>
            <td>{row.item}</td>
            <td>{row.status}</td>
            <td>{row.note}</td>
          </tr>
        ))}
      </tbody>
    </Table>
    <h2>From the 8 September note</h2>
    <Table $layout="map">
      <thead>
        <tr>
          <th>Concern</th>
          <th>Now</th>
          <th>Where</th>
        </tr>
      </thead>
      <tbody>
        {emailMap.map((row) => (
          <tr key={row.item}>
            <td>{row.item}</td>
            <td>{row.status}</td>
            <td>{row.note}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </Sheet>
)

export const ProposalMap = React.memo(ProposalMapComponent)
ProposalMap.displayName = 'ProposalMap'
