'use client'

import React from 'react'

import { Sheet, Eyebrow, List } from '@/components/proposal/ProposalStyles'
import { teamTime } from '@/lib/proposal'

const ProposalWorkComponent = () => (
  <Sheet>
    <Eyebrow>How we work</Eyebrow>
    <h1>A working prototype, then we iterate</h1>
    <p>
      I would not start with a long design phase in Figma. You click through the hub. We change it.
      Your look and brand are already on it.
    </p>
    <p>
      Payload CMS is free and open source. The library people see and the admin reviewers use are
      the same project. I also looked at Django, as we discussed. Django is a good fit for a
      classic university website. This project is a library with review steps. Payload is the
      lighter fit.
    </p>
    <h2>Time asked of your team</h2>
    <List>
      {teamTime.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </List>
    <p>Weekly check-ins, Eastern time, during the build. Remote, as posted.</p>
  </Sheet>
)

export const ProposalWork = React.memo(ProposalWorkComponent)
ProposalWork.displayName = 'ProposalWork'
