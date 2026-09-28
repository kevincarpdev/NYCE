import type { CollectionConfig } from 'payload'

import { canUseAdmin, isStaff } from '@/access/roles'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    group: 'Access',
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role', 'university'],
  },
  auth: {
    maxLoginAttempts: 20,
    tokenExpiration: 60 * 60 * 24 * 14,
  },
  access: {
    admin: ({ req: { user } }) => canUseAdmin(user),
    create: ({ req: { user } }) => isStaff(user),
    read: ({ req: { user } }) => {
      if (isStaff(user)) return true
      if (!user) return false
      return true
    },
    update: ({ req: { user } }) => {
      if (isStaff(user)) return true
      if (!user) return false
      return { id: { equals: user.id } }
    },
    delete: ({ req: { user } }) => isStaff(user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'member',
      saveToJWT: true,
      options: [
        { label: 'Student', value: 'student' },
        { label: 'Professor', value: 'professor' },
        { label: 'Next semester', value: 'member' },
        { label: 'Reviewer', value: 'reviewer' },
        { label: 'Admin', value: 'admin' },
      ],
      access: {
        update: ({ req: { user } }) => isStaff(user),
      },
    },
    {
      name: 'university',
      type: 'text',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Role at the university',
    },
  ],
}
