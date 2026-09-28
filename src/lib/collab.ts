import { isStaff, ownerId, sameId } from '@/access/roles'
import type { AccessUser } from '@/access/roles'

export const relationId = ownerId

export const collaboratorIds = (doc: { submittedBy?: unknown; collaborators?: unknown }) => {
  const people = Array.isArray(doc.collaborators) ? doc.collaborators : []
  return [ownerId(doc.submittedBy), ...people.map(ownerId)].filter((id) => id != null)
}

export const canIterate = (
  user: AccessUser,
  doc?: { submittedBy?: unknown; collaborators?: unknown } | null,
) => {
  if (!user || !doc) return false
  if (isStaff(user)) return true
  return collaboratorIds(doc).some((id) => sameId(user.id, id))
}
