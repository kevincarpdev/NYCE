import type { CollectionConfig } from 'payload'

import { isStaff } from '@/access/roles'

const editableFields = [
  { label: 'Title', value: 'title' },
  { label: 'Summary', value: 'summary' },
  { label: 'Handoff', value: 'handoff' },
]

export const Suggestions: CollectionConfig = {
  slug: 'suggestions',
  admin: {
    group: 'Iterate',
    useAsTitle: 'field',
    defaultColumns: ['field', 'status', 'proposedByName', 'submission', 'createdAt'],
    description: 'Proposed edits. Accepting one writes the field on the submission.',
  },
  access: {
    create: ({ req: { user } }) => Boolean(user),
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => isStaff(user),
  },
  hooks: {
    beforeChange: [
      ({ data, req, operation }) => {
        if (operation === 'create' && req.user) {
          data.proposedBy = data.proposedBy || req.user.id
          data.proposedByName =
            data.proposedByName ||
            (typeof req.user.name === 'string' ? req.user.name : req.user.email)
        }
        return data
      },
    ],
    afterChange: [
      async ({ doc, previousDoc, req, context }) => {
        if (context?.skipApply) return doc
        if (doc.status !== 'accepted') return doc
        if (previousDoc?.status === 'accepted') return doc
        const submissionId =
          typeof doc.submission === 'object' && doc.submission && 'id' in doc.submission
            ? doc.submission.id
            : doc.submission
        if (!submissionId || !doc.field || typeof doc.after !== 'string') return doc
        const current = await req.payload.findByID({
          collection: 'submissions',
          id: submissionId,
          depth: 0,
          overrideAccess: true,
        })
        await req.payload.update({
          collection: 'submissions',
          id: submissionId,
          data: {
            [doc.field]: doc.after,
            revision: current.revision,
          },
          overrideAccess: false,
          user: req.user || undefined,
          req,
        })
        return doc
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
      name: 'field',
      type: 'select',
      required: true,
      options: editableFields,
    },
    { name: 'before', type: 'textarea' },
    { name: 'after', type: 'textarea', required: true },
    { name: 'rationale', type: 'textarea' },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'proposed',
      options: [
        { label: 'Proposed', value: 'proposed' },
        { label: 'Accepted', value: 'accepted' },
        { label: 'Rejected', value: 'rejected' },
      ],
    },
    {
      name: 'proposedBy',
      type: 'relationship',
      relationTo: 'users',
    },
    { name: 'proposedByName', type: 'text' },
  ],
}
