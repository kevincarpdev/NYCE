import { AuthShell } from '@/components/frontend/auth/AuthShell'
import { SignInForm } from '@/components/frontend/auth/SignInForm'
import { getSessionUser } from '@/lib/payload'
import { isSafePath } from '@/lib/safePath'

type Search = Promise<{ next?: string; redirect?: string; reason?: string; role?: string }>

export default async function SignInPage({ searchParams }: { searchParams: Search }) {
  const params = await searchParams
  const requested = params.next || params.redirect
  const nextPath = isSafePath(requested) ? requested : '/library'
  const reason = params.reason === 'admin' ? 'admin' : undefined
  const role = params.role
  const user = await getSessionUser()

  return (
    <AuthShell>
      <SignInForm nextPath={nextPath} reason={reason} role={role} user={user} />
    </AuthShell>
  )
}
