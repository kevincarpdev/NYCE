import { redirect } from 'next/navigation'

import { SubmissionGrid } from '@/components/frontend/library/SubmissionGrid'
import { getSessionUser } from '@/lib/payload'
import { listSubmissions } from '@/lib/queries'

export default async function MinePage() {
  const user = await getSessionUser()
  if (!user) redirect('/sign-in?next=/mine')

  const items = await listSubmissions({ mine: true })
  return <SubmissionGrid items={items} title="My submissions" />
}
