import { canUseAdmin } from '@/access/roles'

export type SessionUser = {
  id: string
  email: string
  name: string
  role: string
}

export const sessionFlags = (user: SessionUser | null) => ({
  canSubmit: user?.role === 'student' || user?.role === 'professor',
  canReview: canUseAdmin(user),
})
