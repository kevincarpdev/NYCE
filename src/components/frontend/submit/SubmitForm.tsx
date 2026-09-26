'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/frontend/ui/Button'
import { AGREEMENT_TEXT } from '@/lib/agreement'
import { formatLabels, stageLabels, visibilityLabels } from '@/lib/labels'
import type { ProjectCard, TopicCard } from '@/lib/queries'
import {
  Area,
  Block,
  Control,
  ErrorText,
  Field,
  Form,
  Legal,
  Legend,
  Row,
  Select,
} from '@/components/frontend/submit/SubmitStyles'

type SubmitProps = {
  projects: ProjectCard[]
  topics: TopicCard[]
}

const SubmitFormComponent = ({ projects, topics }: SubmitProps) => {
  const router = useRouter()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [authors, setAuthors] = useState('')
  const [university, setUniversity] = useState('Stony Brook University')
  const [project, setProject] = useState(projects[0]?.id || '')
  const [topic, setTopic] = useState(topics[0]?.id || '')
  const [format, setFormat] = useState('memo')
  const [stage, setStage] = useState('shelved')
  const [visibility, setVisibility] = useState('public')
  const [agreed, setAgreed] = useState(false)
  const [files, setFiles] = useState<FileList | null>(null)

  const fillSample = () => {
    setTitle('Harbor heat walk notes')
    setSummary(
      'A walking route and cheap thermometer protocol for mapping heat along the Battery. We are not taking this forward. Next studio can reuse the route.',
    )
    setAuthors('Amina Ruiz')
    setFormat('memo')
    setStage('concept')
    setVisibility('public')
    setAgreed(true)
  }

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!agreed) {
      setError('Agree to the attribution terms to submit.')
      return
    }
    setBusy(true)
    setError('')
    const fileIds: (string | number)[] = []
    if (files) {
      for (const file of Array.from(files)) {
        const body = new FormData()
        body.append('file', file)
        const uploaded = await fetch('/api/files', { method: 'POST', credentials: 'include', body })
        if (!uploaded.ok) {
          setBusy(false)
          setError('That file type was not accepted. Use Word, Excel, a deck, PDF, or video.')
          return
        }
        const payload = await uploaded.json()
        fileIds.push(payload.doc.id)
      }
    }

    const created = await fetch('/api/submissions', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        summary,
        authors,
        attributionUniversity: university,
        project: Number(project),
        topics: [Number(topic)],
        format,
        stage,
        visibility,
        files: fileIds,
        agreed: true,
        notTakingForward: true,
      }),
    })

    if (!created.ok) {
      const payload = await created.json().catch(() => ({}))
      setBusy(false)
      setError(payload.errors?.[0]?.message || 'Could not submit. Check the required fields.')
      return
    }

    router.push('/mine')
    router.refresh()
  }

  return (
    <Form onSubmit={(event) => void onSubmit(event)}>
      <Button onClick={fillSample} type="button" variant="ink">
        Fill a sample memo
      </Button>
      <Block>
        <Legend>The work</Legend>
        <Field>
          Title
          <Control onChange={(event) => setTitle(event.target.value)} required value={title} />
        </Field>
        <Field>
          Summary
          <Area onChange={(event) => setSummary(event.target.value)} required value={summary} />
        </Field>
        <Field>
          Authors to credit
          <Control onChange={(event) => setAuthors(event.target.value)} required value={authors} />
        </Field>
        <Field>
          University
          <Control
            onChange={(event) => setUniversity(event.target.value)}
            required
            value={university}
          />
        </Field>
      </Block>
      <Block>
        <Legend>Classify it</Legend>
        <Field>
          Project
          <Select onChange={(event) => setProject(event.target.value)} value={project}>
            {projects.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
          </Select>
        </Field>
        <Field>
          Topic
          <Select onChange={(event) => setTopic(event.target.value)} value={topic}>
            {topics.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
          </Select>
        </Field>
        <Field>
          Format
          <Select onChange={(event) => setFormat(event.target.value)} value={format}>
            {Object.entries(formatLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </Field>
        <Field>
          Stage
          <Select onChange={(event) => setStage(event.target.value)} value={stage}>
            {Object.entries(stageLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </Field>
        <Field>
          Visibility
          <Select onChange={(event) => setVisibility(event.target.value)} value={visibility}>
            {Object.entries(visibilityLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </Field>
      </Block>
      <Block>
        <Legend>Attach files</Legend>
        <Field>
          Word, Excel, decks, PDF, or video
          <Control
            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.mp4,.png,.jpg,.jpeg,.webp"
            multiple
            onChange={(event) => setFiles(event.target.files)}
            type="file"
          />
        </Field>
      </Block>
      <Block>
        <Legend>Attribution and agreement</Legend>
        <Legal>{AGREEMENT_TEXT}</Legal>
        <Row>
          <input
            checked={agreed}
            onChange={(event) => setAgreed(event.target.checked)}
            type="checkbox"
          />
          <span>I agree. Store my name and the time with this submission.</span>
        </Row>
      </Block>
      {error ? <ErrorText>{error}</ErrorText> : null}
      <Button disabled={busy} type="submit">
        Submit for review
      </Button>
    </Form>
  )
}

export const SubmitForm = React.memo(SubmitFormComponent)
SubmitForm.displayName = 'SubmitForm'
