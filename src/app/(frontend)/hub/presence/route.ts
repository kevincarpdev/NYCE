import { NextResponse } from 'next/server'

import { getAuth, getSessionUser } from '@/lib/payload'

const windowMs = 45_000

export async function GET(request: Request) {
  const session = await getSessionUser()
  if (!session) return NextResponse.json({ people: [] })
  const submissionId = Number(new URL(request.url).searchParams.get('submission'))
  if (!submissionId) return NextResponse.json({ people: [] })
  const { payload, user } = await getAuth()
  const since = new Date(Date.now() - windowMs).toISOString()
  const result = await payload.find({
    collection: 'presences',
    where: {
      and: [
        { submission: { equals: submissionId } },
        { lastSeen: { greater_than: since } },
      ],
    },
    sort: '-lastSeen',
    limit: 20,
    overrideAccess: false,
    user: user || undefined,
  })
  return NextResponse.json({
    people: result.docs.map((doc) => ({
      id: String(doc.id),
      userId: String(typeof doc.user === 'object' && doc.user ? doc.user.id : doc.user),
      userName: doc.userName,
      action: doc.action,
      lastSeen: doc.lastSeen,
    })),
  })
}

export async function POST(request: Request) {
  const session = await getSessionUser()
  if (!session) return NextResponse.json({ error: 'Sign in.' }, { status: 401 })
  const body = await request.json().catch(() => null)
  const submissionId = Number(body?.submissionId)
  const action = body?.action === 'editing' || body?.action === 'reviewing' ? body.action : 'viewing'
  if (!submissionId) return NextResponse.json({ error: 'Missing leftover.' }, { status: 400 })
  const { payload, user } = await getAuth()
  const existing = await payload.find({
    collection: 'presences',
    where: {
      and: [{ submission: { equals: submissionId } }, { user: { equals: Number(session.id) } }],
    },
    limit: 1,
    overrideAccess: true,
  })
  const data = {
    submission: submissionId,
    user: Number(session.id),
    userName: session.name,
    action,
    lastSeen: new Date().toISOString(),
  }
  if (existing.docs[0]) {
    await payload.update({
      collection: 'presences',
      id: existing.docs[0].id,
      data,
      overrideAccess: false,
      user: user || undefined,
    })
  } else {
    await payload.create({
      collection: 'presences',
      data,
      overrideAccess: false,
      user: user || undefined,
    })
  }
  return NextResponse.json({ ok: true })
}
