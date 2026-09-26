import { PageSection, SectionWrapper } from '@/components/frontend/layout/Containers'
import { SignInForm } from '@/components/frontend/auth/SignInForm'
import { PageHeading } from '@/components/frontend/ui/PageHeading'

type Search = Promise<{ next?: string }>

export default async function SignInPage({ searchParams }: { searchParams: Search }) {
  const params = await searchParams
  const nextPath = params.next && params.next.startsWith('/') ? params.next : '/library'

  return (
    <PageSection>
      <SectionWrapper>
        <PageHeading>Sign in</PageHeading>
        <p>
          Invited professors, students, and reviewers. Accounts live in this database, next to the
          files.
        </p>
        <SignInForm nextPath={nextPath} />
      </SectionWrapper>
    </PageSection>
  )
}
