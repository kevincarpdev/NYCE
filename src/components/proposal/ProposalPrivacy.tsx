'use client'

import React from 'react'

import { Sheet, Eyebrow, List } from '@/components/proposal/ProposalStyles'
import { about } from '@/lib/proposal'

const ProposalPrivacyComponent = () => (
  <Sheet>
    <Eyebrow>Care of files</Eyebrow>
    <h1>Privacy, ownership, and security</h1>
    <p>
      Unpublished fellow decks, partner memos, IP agreements, and personal stories stay private
      until someone hits publish. Drafts do not get a public link. Who can see what is written in
      the system. Every publish, private download, and suggested edit is written to a history.
    </p>
    <p>
      The site uses HTTPS. Files stay in a US region. The database is not open to the public
      internet. I would not put huge science datasets in this hub.
    </p>
    <p>
      For the pilot the account list lives next to the files. When partners need a university
      login, we attach Microsoft Entra if staff already use Microsoft 365. Same files. Same roles.
      New front door for the password.
    </p>
    <h2>About</h2>
    <List>
      {about.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </List>
  </Sheet>
)

export const ProposalPrivacy = React.memo(ProposalPrivacyComponent)
ProposalPrivacy.displayName = 'ProposalPrivacy'
