import type { CollectionConfig } from 'payload'

import { isStaff } from '@/access/roles'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    group: 'Library',
    useAsTitle: 'title',
    description: 'A course, cohort, or lab. Files sit in a project so later students can ask what last semester left behind.',
    defaultColumns: ['title', 'kind', 'university', 'semester'],
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
      admin: { position: 'sidebar' },
    },
    {
      name: 'kind',
      type: 'select',
      required: true,
      options: [
        { label: 'Course', value: 'course' },
        { label: 'Cohort', value: 'cohort' },
        { label: 'Lab', value: 'lab' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'university',
      type: 'text',
      required: true,
    },
    {
      name: 'semester',
      type: 'text',
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
    },
  ],
}
