import { notFound } from 'next/navigation'

import { SubmissionDetail } from '@/components/frontend/library/SubmissionDetail'
import { getSessionUser } from '@/lib/payload'
import { getSubmissionBySlug } from '@/lib/queries'

type Params = Promise<{ slug: string }>

export default async function SubmissionPage({ params }: { params: Params }) {
  const { slug } = await params
  const [item, user] = await Promise.all([getSubmissionBySlug(slug), getSessionUser()])
  if (!item) notFound()
  return <SubmissionDetail item={item} signedIn={Boolean(user)} />
}
