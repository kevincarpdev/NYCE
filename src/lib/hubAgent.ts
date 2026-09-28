import { generateText, isStepCount, tool } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'
import type { Payload } from 'payload'
import { z } from 'zod'

import { canIterate } from '@/lib/collab'
import type { SessionUser } from '@/lib/session'

type ChatTurn = {
  role: 'user' | 'assistant'
  content: string
}

const fields = ['title', 'summary', 'handoff'] as const

const fieldSchema = z.enum(fields)

const asId = (value: unknown) => {
  if (value && typeof value === 'object' && 'id' in value) return (value as { id: number }).id
  return value as number
}

const snapshot = (doc: {
  title?: string
  summary?: string
  handoff?: string | null
  revision?: number | null
}) => ({
  title: doc.title || '',
  summary: doc.summary || '',
  handoff: doc.handoff || '',
  revision: doc.revision || 1,
})

const saveComment = async (
  payload: Payload,
  submissionId: number,
  body: string,
  role: 'user' | 'assistant',
  user?: SessionUser | null,
) => {
  await payload.create({
    collection: 'comments',
    data: {
      submission: submissionId,
      channel: 'assistant',
      role,
      body,
      author: role === 'user' && user ? Number(user.id) : undefined,
      authorName: role === 'assistant' ? 'Hub assistant' : user?.name || 'Someone',
    },
    overrideAccess: true,
  })
}

const propose = async (
  payload: Payload,
  submission: { id: number; title?: string; summary?: string; handoff?: string | null },
  field: (typeof fields)[number],
  after: string,
  rationale: string,
  user?: SessionUser | null,
) => {
  const before = snapshot(submission)[field]
  const created = await payload.create({
    collection: 'suggestions',
    data: {
      submission: submission.id,
      field,
      before,
      after,
      rationale,
      status: 'proposed',
      proposedBy: user ? Number(user.id) : undefined,
      proposedByName: user?.name || 'Hub assistant',
    },
    overrideAccess: true,
  })
  return { id: created.id, field, after }
}

export const runHubAgent = async ({
  payload,
  accessUser,
  session,
  submissionId,
  messages,
}: {
  payload: Payload
  accessUser: { id: number | string }
  session: SessionUser
  submissionId: number
  messages: ChatTurn[]
}) => {
  const submission = await payload.findByID({
    collection: 'submissions',
    id: submissionId,
    depth: 1,
    overrideAccess: false,
    user: accessUser,
  })
  const last = [...messages].reverse().find((message) => message.role === 'user')
  if (!last) return { text: 'Ask me to tighten a summary, write a handoff, or apply a proposed edit.' }

  await saveComment(payload, submissionId, last.content, 'user', session)

  const canEdit = canIterate(session, submission)
  const current = snapshot(submission)
  let text = ''

  if (process.env.OPENAI_API_KEY) {
    const openai = createOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: process.env.OPENAI_BASE_URL,
    })
    const result = await generateText({
      model: openai(process.env.OPENAI_MODEL || 'gpt-4.1-mini'),
      system: `You help professors and students leave climate-tech research they are not taking forward. You propose edits to title, summary, or handoff. You do not invent studies. You do not publish. Propose first. Apply only when asked. Current leftover:\nTitle: ${current.title}\nSummary: ${current.summary}\nHandoff: ${current.handoff}\nThe person can ${canEdit ? '' : 'not '}apply edits.`,
      messages: messages.map((message) => ({ role: message.role, content: message.content })),
      stopWhen: isStepCount(4),
      tools: {
        proposeEdit: tool({
          description: 'Propose a change. It waits for a person to accept.',
          inputSchema: z.object({
            field: fieldSchema,
            after: z.string(),
            rationale: z.string(),
          }),
          execute: async ({ field, after, rationale }) =>
            propose(payload, { ...current, id: asId(submission.id) }, field, after, rationale, session),
        }),
        applyLatest: tool({
          description: 'Accept the latest proposed edit if this person can edit.',
          inputSchema: z.object({}),
          execute: async () => {
            if (!canEdit) return { ok: false, reason: 'You can propose. An editor has to accept.' }
            const open = await payload.find({
              collection: 'suggestions',
              where: {
                and: [
                  { submission: { equals: submissionId } },
                  { status: { equals: 'proposed' } },
                ],
              },
              sort: '-createdAt',
              limit: 1,
              overrideAccess: true,
            })
            const doc = open.docs[0]
            if (!doc) return { ok: false, reason: 'No proposed edit waiting.' }
            await payload.update({
              collection: 'suggestions',
              id: doc.id,
              data: { status: 'accepted' },
              overrideAccess: false,
              user: accessUser,
            })
            return { ok: true, field: doc.field }
          },
        }),
      },
    })
    text = result.text
  } else {
    text = await runDemoAgent({
      payload,
      accessUser,
      session,
      submission: { ...current, id: asId(submission.id) },
      canEdit,
      prompt: last.content,
    })
  }

  if (text) await saveComment(payload, submissionId, text, 'assistant', session)
  return { text }
}

const runDemoAgent = async ({
  payload,
  accessUser,
  session,
  submission,
  canEdit,
  prompt,
}: {
  payload: Payload
  accessUser: { id: number | string }
  session: SessionUser
  submission: { id: number; title: string; summary: string; handoff: string }
  canEdit: boolean
  prompt: string
}) => {
  const asked = prompt.toLowerCase()
  if (asked.includes('apply') || asked.includes('accept')) {
    if (!canEdit) {
      return 'I can propose. Amina, Priya, or a reviewer has to accept the edit so two people do not overwrite each other.'
    }
    const open = await payload.find({
      collection: 'suggestions',
      where: {
        and: [{ submission: { equals: submission.id } }, { status: { equals: 'proposed' } }],
      },
      sort: '-createdAt',
      limit: 1,
      overrideAccess: true,
    })
    const doc = open.docs[0]
    if (!doc) return 'There is no proposed edit waiting. Ask me to tighten the summary or write a handoff.'
    await payload.update({
      collection: 'suggestions',
      id: doc.id,
      data: { status: 'accepted' },
      overrideAccess: false,
      user: accessUser,
    })
    return `Accepted the ${doc.field} edit. Reload the work panel to see it. Payload stored a version.`
  }

  if (asked.includes('handoff') || asked.includes('next semester') || asked.includes('reuse')) {
    const after =
      submission.handoff ||
      `Next studio should reuse the method, not the company idea. Start from: ${submission.summary}`
    await propose(
      payload,
      submission,
      'handoff',
      after,
      'Write a handoff the next cohort can act on without the original team.',
      session,
    )
    return 'I proposed a handoff for next semester. It is in Suggested edits. Accept it to write the field. This assistant is running without a model key; set OPENAI_API_KEY on the server to use a hosted model.'
  }

  const after = `${submission.summary.split(/(?<=\.)\s/)[0]} The team is not taking this forward.`
  await propose(
    payload,
    submission,
    'summary',
    after,
    'Tighten the leftover so a later cohort sees what to pick up.',
    session,
  )
  return 'I proposed a tighter summary. Open Suggested edits, compare it, then accept if it is right. Two people can sit on this leftover at once. The second save is rejected if the revision moved. This assistant is running without a model key; set OPENAI_API_KEY on the server to use a hosted model.'
}
