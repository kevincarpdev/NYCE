'use client'

import React, { useState } from 'react'
import styled from 'styled-components'

import { Button } from '@/components/frontend/ui/Button'
import { editableFields, suggestionLabels } from '@/lib/labels'
import type { SuggestionCard } from '@/lib/queries'

const Card = styled.article`
  background: ${({ theme }) => theme.colors.surface.paper};
  padding: ${({ theme }) => theme.spacing(4)};
  display: grid;
  gap: ${({ theme }) => theme.spacing(3)};
`

const Diff = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(2)};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`

const Before = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.content.muted};
`

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(2)};
`

type ListProps = {
  suggestions: SuggestionCard[]
  canIterate: boolean
  onApplied: () => void
}

const SuggestionListComponent = ({ suggestions, canIterate, onApplied }: ListProps) => {
  const [items, setItems] = useState(suggestions)
  const [busy, setBusy] = useState<string | null>(null)

  const patch = async (id: string, status: 'accepted' | 'rejected') => {
    setBusy(id)
    const response = await fetch(`/api/suggestions/${id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    setBusy(null)
    if (!response.ok) return
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, status } : item)),
    )
    if (status === 'accepted') onApplied()
  }

  if (!items.length) return <p>No proposed edits yet. Ask the assistant to tighten a summary.</p>

  return (
    <div>
      {items.map((item) => (
        <Card key={item.id}>
          <strong>
            {editableFields[item.field] || item.field} · {suggestionLabels[item.status]}
          </strong>
          <p>{item.proposedByName}</p>
          {item.rationale ? <p>{item.rationale}</p> : null}
          <Diff>
            {item.before ? <Before>{item.before}</Before> : null}
            <p>{item.after}</p>
          </Diff>
          {canIterate && item.status === 'proposed' ? (
            <Actions>
              <Button disabled={busy === item.id} onClick={() => void patch(item.id, 'accepted')} type="button">
                Accept
              </Button>
              <Button
                disabled={busy === item.id}
                onClick={() => void patch(item.id, 'rejected')}
                type="button"
                variant="ink"
              >
                Send back
              </Button>
            </Actions>
          ) : null}
        </Card>
      ))}
    </div>
  )
}

export const SuggestionList = React.memo(SuggestionListComponent)
SuggestionList.displayName = 'SuggestionList'
