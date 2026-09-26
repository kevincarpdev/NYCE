import { cache } from 'react'
import { headers } from 'next/headers'
import { getPayload } from 'payload'

import config from '@payload-config'
import type { SessionUser } from '@/lib/session'

export type { SessionUser } from '@/lib/session'

export const getCMS = cache(async () => getPayload({ config: await config }))

export const getAuth = cache(async () => {
  const payload = await getCMS()
  const { user } = await payload.auth({ headers: await headers() })
  return { payload, user }
})

export const getSessionUser = cache(async (): Promise<SessionUser | null> => {
  const { user } = await getAuth()
  if (!user) return null
  const record = user as { id: number | string; email: string; name?: string; role?: string }
  return {
    id: String(record.id),
    email: record.email,
    name: record.name || record.email,
    role: record.role || 'member',
  }
})
