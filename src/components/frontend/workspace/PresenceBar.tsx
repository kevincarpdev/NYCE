'use client'

import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import type { SessionUser } from '@/lib/session'
import { formatTime } from '@/lib/dates'

const Bar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(3)};
  align-items: center;
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`

const Pill = styled.span`
  background: ${({ theme }) => theme.colors.surface.wash};
  color: ${({ theme }) => theme.colors.content.accent};
  padding: ${({ theme }) => `${theme.spacing(1)} ${theme.spacing(3)}`};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
`

type Person = {
  userId: string
  userName: string
  action: string
  lastSeen?: string | null
}

type PresenceProps = {
  submissionId: string
  user: SessionUser
  editing: boolean
}

const PresenceBarComponent = ({ submissionId, user, editing }: PresenceProps) => {
  const [people, setPeople] = useState<Person[]>([])

  useEffect(() => {
    let alive = true
    const beat = async () => {
      await fetch('/hub/presence', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionId: Number(submissionId),
          action: editing ? 'editing' : 'viewing',
        }),
      })
      const response = await fetch(`/hub/presence?submission=${submissionId}`, {
        credentials: 'include',
      })
      if (!response.ok || !alive) return
      const payload = await response.json()
      setPeople(payload.people || [])
    }
    void beat()
    const timer = window.setInterval(() => void beat(), 15000)
    return () => {
      alive = false
      window.clearInterval(timer)
    }
  }, [submissionId, editing])

  const others = people.filter((person) => person.userId !== user.id)

  return (
    <Bar>
      <span>On this leftover</span>
      <Pill>
        You · {editing ? 'editing' : 'viewing'}
      </Pill>
      {others.map((person) => (
        <Pill key={person.userId}>
          {person.userName} · {person.action}
          {person.lastSeen ? ` · ${formatTime(person.lastSeen)}` : ''}
        </Pill>
      ))}
      {others.length === 0 ? (
        <span>Open this page as Priya or Jordan in another window to see two people at once.</span>
      ) : null}
    </Bar>
  )
}

export const PresenceBar = React.memo(PresenceBarComponent)
PresenceBar.displayName = 'PresenceBar'
