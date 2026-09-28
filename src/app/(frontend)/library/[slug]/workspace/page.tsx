import { redirect } from 'next/navigation'

import { WorkspaceBoard } from '@/components/frontend/workspace/WorkspaceBoard'
import { getSessionUser } from '@/lib/payload'
import { getWorkspace } from '@/lib/queries'

type Params = Promise<{ slug: string }>
type Search = Promise<{ tab?: string }>

export default async function WorkspacePage({
  params,
  searchParams,
}: {
  params: Params
  searchParams: Search
}) {
  const { slug } = await params
  const { tab } = await searchParams
  const user = await getSessionUser()
  if (!user) redirect(`/sign-in?next=/library/${slug}/workspace`)
  const workspace = await getWorkspace(slug)
  if (!workspace) redirect(`/library/${slug}`)
  const aside = tab === 'edits' || tab === 'assistant' || tab === 'discuss' ? tab : 'discuss'
  return (
    <WorkspaceBoard
      comments={workspace.comments}
      initialAside={aside}
      item={workspace.item}
      suggestions={workspace.suggestions}
      user={user}
      versions={workspace.versions}
    />
  )
}
