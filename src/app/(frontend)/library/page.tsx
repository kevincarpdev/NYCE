import { PageSection, SectionWrapper } from '@/components/frontend/layout/Containers'
import { LibraryFilters } from '@/components/frontend/library/LibraryFilters'
import { SubmissionGrid } from '@/components/frontend/library/SubmissionGrid'
import { PageHeading } from '@/components/frontend/ui/PageHeading'
import { listProjects, listSubmissions, listTopics } from '@/lib/queries'

type Search = Promise<{
  q?: string
  topic?: string
  project?: string
  format?: string
  stage?: string
}>

export default async function LibraryPage({ searchParams }: { searchParams: Search }) {
  const params = await searchParams
  const [topics, projects, items] = await Promise.all([
    listTopics(),
    listProjects(),
    listSubmissions(params),
  ])

  return (
    <>
      <PageSection>
        <SectionWrapper>
          <PageHeading>Library</PageHeading>
          <p>
            Browse leftover climate-tech research. Public work is open. Invited work is marked.
            Drafts never appear here.
          </p>
          <LibraryFilters current={params} projects={projects} topics={topics} />
        </SectionWrapper>
      </PageSection>
      <SubmissionGrid items={items} title={`${items.length} in view`} />
    </>
  )
}
