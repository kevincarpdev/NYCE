import type { CollectionConfig } from 'payload'

import { isStaff } from '@/access/roles'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    group: 'Library',
    useAsTitle: 'title',
    description:
      'A course, cohort, or lab. Files sit in a project so later students can ask what last semester left behind.',
    defaultColumns: ['title', 'kind', 'university', 'semester', 'active'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => isStaff(user),
    update: ({ req: { user } }) => isStaff(user),
    delete: ({ req: { user } }) => isStaff(user),
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Overview',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'summary', type: 'textarea', required: true },
            {
              name: 'about',
              type: 'richText',
              label: 'About this project',
            },
            {
              name: 'standing',
              type: 'radio',
              defaultValue: 'term',
              options: [
                { label: 'One term', value: 'term' },
                { label: 'Recurring', value: 'recurring' },
              ],
            },
            { name: 'active', type: 'checkbox', defaultValue: true },
          ],
        },
        {
          label: 'Calendar',
          fields: [
            { name: 'university', type: 'text', required: true },
            { name: 'semester', type: 'text' },
            { name: 'startsOn', type: 'date' },
            { name: 'endsOn', type: 'date' },
            { name: 'seatCount', type: 'number', min: 0 },
          ],
        },
        {
          label: 'People',
          fields: [
            {
              name: 'leads',
              type: 'relationship',
              relationTo: 'users',
              hasMany: true,
            },
            {
              name: 'faculty',
              type: 'array',
              labels: { singular: 'Person', plural: 'People' },
              fields: [
                { name: 'name', type: 'text', required: true },
                {
                  name: 'role',
                  type: 'select',
                  options: [
                    { label: 'Instructor', value: 'instructor' },
                    { label: 'Lab lead', value: 'lab_lead' },
                    { label: 'Coordinator', value: 'coordinator' },
                  ],
                },
                { name: 'email', type: 'email' },
              ],
            },
          ],
        },
        {
          label: 'Place',
          fields: [
            {
              name: 'campus',
              type: 'group',
              fields: [
                { name: 'neighborhood', type: 'text' },
                { name: 'latitude', type: 'number' },
                { name: 'longitude', type: 'number' },
              ],
            },
            { name: 'website', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
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
      name: 'relatedSubmissions',
      type: 'join',
      collection: 'submissions',
      on: 'project',
      admin: { position: 'sidebar' },
    },
  ],
}
