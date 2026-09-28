import type { CollectionConfig } from 'payload'

import { isStaff } from '@/access/roles'

export const Presences: CollectionConfig = {
  slug: 'presences',
  admin: {
    group: 'Iterate',
    useAsTitle: 'userName',
    defaultColumns: ['userName', 'action', 'submission', 'lastSeen'],
    description: 'Who is on a leftover right now. Heartbeat from the workspace.',
  },
  access: {
    create: ({ req: { user } }) => Boolean(user),
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => {
      if (isStaff(user)) return true
      if (!user) return false
      return { user: { equals: user.id } }
    },
    delete: ({ req: { user } }) => {
      if (isStaff(user)) return true
      if (!user) return false
      return { user: { equals: user.id } }
    },
  },
  fields: [
    {
      name: 'submission',
      type: 'relationship',
      relationTo: 'submissions',
      required: true,
      index: true,
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      index: true,
    },
    { name: 'userName', type: 'text', required: true },
    {
      name: 'action',
      type: 'select',
      defaultValue: 'viewing',
      options: [
        { label: 'Viewing', value: 'viewing' },
        { label: 'Editing', value: 'editing' },
        { label: 'Reviewing', value: 'reviewing' },
      ],
    },
    {
      name: 'lastSeen',
      type: 'date',
      required: true,
      admin: { date: { pickerAppearance: 'dayAndTime' } },
    },
  ],
}
