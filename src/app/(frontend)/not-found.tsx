import { PageSection, SectionWrapper } from '@/components/frontend/layout/Containers'
import { Button } from '@/components/frontend/ui/Button'
import { PageHeading } from '@/components/frontend/ui/PageHeading'

export default function NotFoundPage() {
  return (
    <PageSection>
      <SectionWrapper>
        <PageHeading>Nothing here</PageHeading>
        <p>That page is not in the prototype library.</p>
        <Button href="/library">Back to the library</Button>
      </SectionWrapper>
    </PageSection>
  )
}
