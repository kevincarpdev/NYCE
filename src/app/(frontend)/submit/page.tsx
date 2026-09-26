import { redirect } from 'next/navigation'

import { PageSection, SectionWrapper } from '@/components/frontend/layout/Containers'
import { SubmitForm } from '@/components/frontend/submit/SubmitForm'
import { PageHeading } from '@/components/frontend/ui/PageHeading'
import { canSubmitWork } from '@/access/roles'
import { getSessionUser } from '@/lib/payload'
import { listProjects, listTopics } from '@/lib/queries'

export default async function SubmitPage() {
  const user = await getSessionUser()
  if (!user || !canSubmitWork(user)) {
    redirect('/sign-in?next=/submit')
  }

  const [projects, topics] = await Promise.all([listProjects(), listTopics()])

  return (
    <PageSection>
      <SectionWrapper>
        <PageHeading>Send work in</PageHeading>
        <p>
          Word, Excel, decks, PDF, and video. Agree to the draft attribution terms. A reviewer
          publishes or sends it back.
        </p>
        <SubmitForm projects={projects} topics={topics} />
      </SectionWrapper>
    </PageSection>
  )
}
