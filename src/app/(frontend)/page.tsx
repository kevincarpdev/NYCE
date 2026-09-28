import { AssistantBand } from '@/components/frontend/home/AssistantBand'
import { FaqPreview } from '@/components/frontend/home/FaqPreview'
import { HomeCta } from '@/components/frontend/home/HomeCta'
import { HomeHero } from '@/components/frontend/home/HomeHero'
import { HowItWorks } from '@/components/frontend/home/HowItWorks'
import { MissionBand } from '@/components/frontend/home/MissionBand'
import { OwnershipBand } from '@/components/frontend/home/OwnershipBand'
import { ProjectGrid } from '@/components/frontend/home/ProjectGrid'
import { StatsBand } from '@/components/frontend/home/StatsBand'
import { TopicGrid } from '@/components/frontend/home/TopicGrid'
import { WhoItsFor } from '@/components/frontend/home/WhoItsFor'
import { PartnerMarquee } from '@/components/frontend/auth/PartnerMarquee'
import { PageSection, SectionWrapper } from '@/components/frontend/layout/Containers'
import { SubmissionGrid } from '@/components/frontend/library/SubmissionGrid'
import { Reveal } from '@/components/frontend/motion/Reveal'
import { exchangeFacts } from '@/lib/brand'
import { listProjects, listSubmissions, listTopics } from '@/lib/queries'

export default async function HomePage() {
  const [topics, projects, submissions] = await Promise.all([
    listTopics(),
    listProjects(),
    listSubmissions(),
  ])

  const published = submissions.filter((item) => item.status === 'published')
  const topicsWithCount = topics.map((topic) => ({
    ...topic,
    count: published.filter((item) => item.topics.some((entry) => entry.slug === topic.slug)).length,
  }))

  return (
    <>
      <HomeHero topics={topics} />
      <MissionBand />
      <HowItWorks />
      <WhoItsFor />
      <StatsBand
        stats={[
          { value: published.length, label: 'Leftovers in the library now' },
          { value: topics.length, label: 'Topics in the starting taxonomy' },
          { value: projects.length, label: 'Courses, cohorts, and labs' },
          { value: exchangeFacts.partners, label: 'Exchange partners on nyce.org' },
        ]}
      />
      <TopicGrid topics={topicsWithCount} />
      <PageSection tone="paper">
        <SectionWrapper>
          <Reveal>
            <h2>Files sit in a project</h2>
            <p>
              A course, a cohort, or a lab. That is how “what did last semester leave behind on this
              problem” works.
            </p>
          </Reveal>
          <Reveal delay={1}>
            <ProjectGrid projects={projects} />
          </Reveal>
        </SectionWrapper>
      </PageSection>
      <SubmissionGrid items={published} title="In the library now" tone="raised" />
      <OwnershipBand />
      <AssistantBand />
      <PartnerMarquee />
      <FaqPreview />
      <HomeCta />
    </>
  )
}
