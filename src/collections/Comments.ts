import type { CollectionConfig } from 'payload'

import { isStaff } from '@/access/roles'

export const Comments: CollectionConfig = {
  slug: 'comments',
  admin: {
    group: 'Iterate',
    useAsTitle: 'body',
    defaultColumns: ['authorName', 'channel', 'submission', 'createdAt'],
    description: 'Notes on leftover work. People and the hub assistant write here.',
  },
  access: {
    create: ({ req: { user } }) => Boolean(user),
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => {
      if (isStaff(user)) return true
      if (!user) return false
      return { author: { equals: user.id } }
    },
    delete: ({ req: { user } }) => {
      if (isStaff(user)) return true
      if (!user) return false
      return { author: { equals: user.id } }
    },
  },
  hooks: {
    beforeChange: [
      ({ data, req, operation }) => {
        if (operation === 'create' && req.user) {
          data.author = data.author || req.user.id
          data.authorName =
            data.authorName ||
            (typeof req.user.name === 'string' ? req.user.name : req.user.email)
        }
        return data
      },
    ],
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
      name: 'file',
      type: 'relationship',
      relationTo: 'files',
    },
    {
      name: 'channel',
      type: 'select',
      required: true,
      defaultValue: 'discussion',
      options: [
        { label: 'Discussion', value: 'discussion' },
        { label: 'Assistant', value: 'assistant' },
      ],
    },
    {
      name: 'role',
      type: 'select',
      defaultValue: 'user',
      options: [
        { label: 'Person', value: 'user' },
        { label: 'Assistant', value: 'assistant' },
      ],
    },
    { name: 'body', type: 'textarea', required: true },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
    },
    { name: 'authorName', type: 'text' },
  ],
}
