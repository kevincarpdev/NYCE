'use client'

import React, { useMemo, useState } from 'react'
import styled from 'styled-components'

import { Button } from '@/components/frontend/ui/Button'
import { Area } from '@/components/frontend/ui/controls'
import type { CommentCard } from '@/lib/queries'

const Log = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(3)};
  max-height: ${({ theme }) => theme.spacing(80)};
  overflow: auto;
`

const Bubble = styled.div<{ $assistant?: boolean }>`
  background: ${({ theme, $assistant }) =>
    $assistant ? theme.colors.surface.wash : theme.colors.surface.paper};
  padding: ${({ theme }) => theme.spacing(4)};
`

const Form = styled.form`
  display: grid;
  gap: ${({ theme }) => theme.spacing(3)};
  margin-top: ${({ theme }) => theme.spacing(4)};
`

type ChatProps = {
  submissionId: string
  history: CommentCard[]
  onProposed: () => void
}

const AssistantChatComponent = ({ submissionId, history, onProposed }: ChatProps) => {
  const initial = useMemo(
    () =>
      history
        .filter((row) => row.channel === 'assistant')
        .map((row) => ({
          role: row.role === 'assistant' ? 'assistant' : 'user',
          content: row.body,
        })),
    [history],
  )
  const [messages, setMessages] = useState(initial)
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const send = async (event: React.FormEvent) => {
    event.preventDefault()
    const content = input.trim()
    if (!content) return
    const next = [...messages, { role: 'user' as const, content }]
    setMessages(next)
    setInput('')
    setBusy(true)
    setError('')
    const response = await fetch('/hub/chat', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ submissionId: Number(submissionId), messages: next }),
    })
    const payload = await response.json().catch(() => ({}))
    setBusy(false)
    if (!response.ok) {
      setError(payload.error || 'The assistant could not run.')
      return
    }
    setMessages((current) => [...current, { role: 'assistant', content: payload.text }])
    onProposed()
  }

  return (
    <div>
      <p>
        Ask it to tighten a summary, write a handoff, or apply a proposed edit. It changes the
        leftover through suggestions, not a silent overwrite.
      </p>
      <Log>
        {messages.map((message, index) => (
          <Bubble $assistant={message.role === 'assistant'} key={`${message.role}-${index}`}>
            <strong>{message.role === 'assistant' ? 'Hub assistant' : 'You'}</strong>
            <p>{message.content}</p>
          </Bubble>
        ))}
      </Log>
      {error ? <p>{error}</p> : null}
      <Form onSubmit={(event) => void send(event)}>
        <Area
          onChange={(event) => setInput(event.target.value)}
          placeholder="Tighten the summary for the next studio"
          value={input}
        />
        <Button disabled={busy} type="submit">
          Send
        </Button>
      </Form>
    </div>
  )
}

export const AssistantChat = React.memo(AssistantChatComponent)
AssistantChat.displayName = 'AssistantChat'
