import type { CollectionConfig } from 'payload'

import { isStaff } from '@/access/roles'

export const Topics: CollectionConfig = {
  slug: 'topics',
  admin: {
    group: 'Library',
    useAsTitle: 'title',
    description:
      'Starting taxonomy so next semester can browse instead of hunting. Month 1 with Shaina and Megha replaces this set.',
    defaultColumns: ['title', 'slug'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => isStaff(user),
    update: ({ req: { user } }) => isStaff(user),
    delete: ({ req: { user } }) => isStaff(user),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
  ],
}
