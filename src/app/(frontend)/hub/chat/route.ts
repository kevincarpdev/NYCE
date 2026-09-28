import { NextResponse } from 'next/server'

import { runHubAgent } from '@/lib/hubAgent'
import { getAuth, getSessionUser } from '@/lib/payload'

export async function POST(request: Request) {
  const session = await getSessionUser()
  if (!session) return NextResponse.json({ error: 'Sign in to use the assistant.' }, { status: 401 })

  const body = await request.json().catch(() => null)
  const submissionId = Number(body?.submissionId)
  const messages = Array.isArray(body?.messages) ? body.messages : []
  if (!submissionId) return NextResponse.json({ error: 'Missing leftover.' }, { status: 400 })

  const { payload, user } = await getAuth()
  if (!user) return NextResponse.json({ error: 'Sign in to use the assistant.' }, { status: 401 })
  try {
    const result = await runHubAgent({
      payload,
      accessUser: user as { id: number | string },
      session,
      submissionId,
      messages,
    })
    return NextResponse.json(result)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'The assistant could not run.'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
