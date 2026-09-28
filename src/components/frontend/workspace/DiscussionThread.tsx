'use client'

import React, { useState } from 'react'
import styled from 'styled-components'

import { Button } from '@/components/frontend/ui/Button'
import { Area } from '@/components/frontend/ui/controls'
import { formatDate, formatTime } from '@/lib/dates'
import type { CommentCard } from '@/lib/queries'

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: ${({ theme }) => theme.spacing(4)};
`

const Note = styled.li`
  background: ${({ theme }) => theme.colors.surface.paper};
  padding: ${({ theme }) => theme.spacing(4)};
  display: grid;
  gap: ${({ theme }) => theme.spacing(2)};
`

const Meta = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  text-transform: uppercase;
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.content.accent};
`

const Form = styled.form`
  display: grid;
  gap: ${({ theme }) => theme.spacing(3)};
`

type ThreadProps = {
  submissionId: string
  comments: CommentCard[]
}

const DiscussionThreadComponent = ({ submissionId, comments }: ThreadProps) => {
  const [items, setItems] = useState(comments.filter((row) => row.channel === 'discussion'))
  const [body, setBody] = useState('')
  const [busy, setBusy] = useState(false)

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!body.trim()) return
    setBusy(true)
    const response = await fetch('/api/comments', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        submission: Number(submissionId),
        channel: 'discussion',
        role: 'user',
        body: body.trim(),
      }),
    })
    setBusy(false)
    if (!response.ok) return
    const payload = await response.json()
    const doc = payload.doc
    setItems((current) => [
      ...current,
      {
        id: String(doc.id),
        body: doc.body,
        channel: 'discussion',
        role: 'user',
        authorName: doc.authorName,
        createdAt: doc.createdAt,
      },
    ])
    setBody('')
  }

  return (
    <div>
      <List>
        {items.map((item) => (
          <Note key={item.id}>
            <Meta>
              {item.authorName}
              {item.createdAt ? ` · ${formatDate(item.createdAt)} ${formatTime(item.createdAt)}` : ''}
            </Meta>
            <p>{item.body}</p>
          </Note>
        ))}
      </List>
      <Form onSubmit={(event) => void onSubmit(event)}>
        <Area
          onChange={(event) => setBody(event.target.value)}
          placeholder="Leave a note for the next person on this leftover"
          value={body}
        />
        <Button disabled={busy} type="submit">
          Add note
        </Button>
      </Form>
    </div>
  )
}

export const DiscussionThread = React.memo(DiscussionThreadComponent)
DiscussionThread.displayName = 'DiscussionThread'
