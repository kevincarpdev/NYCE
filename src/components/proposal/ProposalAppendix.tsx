'use client'

import React from 'react'
import styled from 'styled-components'

import { Sheet, Eyebrow, List } from '@/components/proposal/ProposalStyles'
import { proposal } from '@/lib/proposal'

const Shots = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing(4)};
`

const Shot = styled.img`
  width: 100%;
  height: ${({ theme }) => theme.layout.shotHeight};
  object-fit: cover;
  object-position: top;
  border: 1px solid ${({ theme }) => theme.colors.border.subtle};
`

const Caption = styled.figcaption`
  margin-top: ${({ theme }) => theme.spacing(1)};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  color: ${({ theme }) => theme.colors.content.muted};
`

type AppendixProps = {
  shots: { src: string; caption: string }[]
}

const ProposalAppendixComponent = ({ shots }: AppendixProps) => (
  <Sheet>
    <Eyebrow>Appendix</Eyebrow>
    <h1>Five minutes on the prototype</h1>
    <List>
      <li>Open {proposal.demo}</li>
      <li>Pick a role. Click Continue. Password {proposal.password} is filled.</li>
      <li>Student: leftover workspace, a note, the assistant.</li>
      <li>Stay logged out: Term sheet language we were handed exists, the body stays closed.</li>
      <li>Reviewer: /admin, publish or send back.</li>
    </List>
    {shots.length > 0 ? (
      <Shots>
        {shots.map((shot) => (
          <figure key={shot.caption}>
            <Shot alt={shot.caption} src={shot.src} />
            <Caption>{shot.caption}</Caption>
          </figure>
        ))}
      </Shots>
    ) : null}
  </Sheet>
)

export const ProposalAppendix = React.memo(ProposalAppendixComponent)
ProposalAppendix.displayName = 'ProposalAppendix'
