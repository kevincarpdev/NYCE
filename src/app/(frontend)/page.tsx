import { HomeHero } from '@/components/frontend/home/HomeHero'
import { ProjectGrid } from '@/components/frontend/home/ProjectGrid'
import { PageSection, SectionWrapper } from '@/components/frontend/layout/Containers'
import { SubmissionGrid } from '@/components/frontend/library/SubmissionGrid'
import { listProjects, listSubmissions, listTopics } from '@/lib/queries'

export default async function HomePage() {
  const [topics, projects, submissions] = await Promise.all([
    listTopics(),
    listProjects(),
    listSubmissions(),
  ])

  const published = submissions.filter((item) => item.status === 'published')

  return (
    <>
      <HomeHero topics={topics} />
      <PageSection>
        <SectionWrapper>
          <h2>Files sit in a project</h2>
          <p>
            A course, a cohort, or a lab. That is how “what did last semester leave behind on this
            problem” works.
          </p>
          <ProjectGrid projects={projects} />
        </SectionWrapper>
      </PageSection>
      <SubmissionGrid items={published} title="In the library now" />
    </>
  )
}
