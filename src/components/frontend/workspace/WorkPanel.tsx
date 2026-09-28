'use client'

import React, { useState } from 'react'
import styled from 'styled-components'

import { Button } from '@/components/frontend/ui/Button'
import { Area, Control } from '@/components/frontend/ui/controls'
import { reuseLabels, sectionLabels } from '@/lib/labels'
import type { SubmissionCard } from '@/lib/queries'

const Grid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(5)};
`

const Field = styled.label`
  display: grid;
  gap: ${({ theme }) => theme.spacing(2)};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
`

const Block = styled.article`
  background: ${({ theme }) => theme.colors.surface.raised};
  padding: ${({ theme }) => theme.spacing(5)};
  display: grid;
  gap: ${({ theme }) => theme.spacing(2)};
`

const ErrorText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.status.returned};
`

type PanelProps = {
  item: SubmissionCard
  onSaved: (item: SubmissionCard) => void
}

const WorkPanelComponent = ({ item, onSaved }: PanelProps) => {
  const [title, setTitle] = useState(item.title)
  const [summary, setSummary] = useState(item.summary || '')
  const [handoff, setHandoff] = useState(item.handoff || '')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [revision, setRevision] = useState(item.revision)

  const save = async () => {
    setBusy(true)
    setError('')
    const response = await fetch(`/api/submissions/${item.id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, summary, handoff, revision }),
    })
    const payload = await response.json().catch(() => ({}))
    setBusy(false)
    if (!response.ok) {
      setError(payload.errors?.[0]?.message || payload.message || 'Could not save.')
      return
    }
    const next = payload.doc
    setRevision(next.revision)
    onSaved({
      ...item,
      title: next.title,
      summary: next.summary,
      handoff: next.handoff,
      revision: next.revision,
    })
  }

  return (
    <Grid>
      {item.reuseLevel ? <p>{reuseLabels[item.reuseLevel]}</p> : null}
      {item.canIterate ? (
        <>
          <Field>
            Title
            <Control onChange={(event) => setTitle(event.target.value)} value={title} />
          </Field>
          <Field>
            Summary
            <Area onChange={(event) => setSummary(event.target.value)} value={summary} />
          </Field>
          <Field>
            Handoff
            <Area onChange={(event) => setHandoff(event.target.value)} value={handoff} />
          </Field>
          {error ? <ErrorText>{error}</ErrorText> : null}
          <Button disabled={busy} onClick={() => void save()} type="button">
            Save this leftover
          </Button>
          <p>Revision {revision}. If someone else saved first, Payload keeps their version and asks you to reload.</p>
        </>
      ) : (
        <>
          {item.writeup ? <p>{item.writeup}</p> : <p>{item.summary}</p>}
          {item.handoff ? (
            <Block>
              <strong>Handoff</strong>
              <p>{item.handoff}</p>
            </Block>
          ) : null}
        </>
      )}
      {item.leftoverSections.map((section) => (
        <Block key={section.id || section.heading}>
          <strong>
            {sectionLabels[section.blockType] || section.blockType} · {section.heading}
          </strong>
          <p>{section.body}</p>
        </Block>
      ))}
    </Grid>
  )
}

export const WorkPanel = React.memo(WorkPanelComponent)
WorkPanel.displayName = 'WorkPanel'
