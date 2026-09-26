export const ROLES = ['student', 'professor', 'member', 'reviewer', 'admin'] as const

export type Role = (typeof ROLES)[number]

export type AccessUser = {
  id: number | string
  role?: Role | string | null
} | null | undefined

export const isStaff = (user: AccessUser) => user?.role === 'reviewer' || user?.role === 'admin'

export const canSubmitWork = (user: AccessUser) =>
  user?.role === 'student' || user?.role === 'professor' || isStaff(user)

export const canUseAdmin = (user: AccessUser) => isStaff(user)

export const sameId = (left: unknown, right: unknown) =>
  left != null && right != null && String(left) === String(right)

export const ownerId = (value: unknown) => {
  if (value && typeof value === 'object' && 'id' in value) {
    return (value as { id: unknown }).id
  }
  return value
}
