import type { CollectionConfig } from 'payload'

import { isStaff } from '@/access/roles'

export const Topics: CollectionConfig = {
  slug: 'topics',
  admin: {
    group: 'Library',
    useAsTitle: 'title',
    description:
      'Starting taxonomy so next semester can browse instead of hunting. Month 1 with Shaina and Megha replaces this set.',
    defaultColumns: ['title', 'cluster', 'featured', 'sortOrder'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => isStaff(user),
    update: ({ req: { user } }) => isStaff(user),
    delete: ({ req: { user } }) => isStaff(user),
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    { name: 'description', type: 'textarea' },
    { name: 'guidance', type: 'textarea', label: 'What belongs here' },
    {
      name: 'cluster',
      type: 'select',
      defaultValue: 'systems',
      options: [
        { label: 'Systems', value: 'systems' },
        { label: 'Place', value: 'place' },
        { label: 'Money', value: 'money' },
        { label: 'Tools', value: 'tools' },
      ],
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'topics',
      filterOptions: ({ id }) => (id ? { id: { not_equals: id } } : true),
    },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'sortOrder', type: 'number', defaultValue: 0 },
    {
      name: 'relatedSubmissions',
      type: 'join',
      collection: 'submissions',
      on: 'topics',
    },
  ],
}
