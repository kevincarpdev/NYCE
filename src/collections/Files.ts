import type { Access, CollectionConfig, Where } from 'payload'

import { canSubmitWork, isStaff } from '@/access/roles'

const publicFiles: Access = ({ req: { user } }) => {
  if (isStaff(user)) return true
  if (!user) {
    const where: Where = {
      and: [{ status: { equals: 'published' } }, { visibility: { equals: 'public' } }],
    }
    return where
  }
  const where: Where = {
    or: [
      { uploadedBy: { equals: user.id } },
      {
        and: [{ status: { equals: 'published' } }, { visibility: { in: ['public', 'invited'] } }],
      },
    ],
  }
  return where
}

export const Files: CollectionConfig = {
  slug: 'files',
  admin: {
    group: 'Library',
    useAsTitle: 'filename',
    description: 'Private until the parent submission is published. Unpublished files have no public link.',
    defaultColumns: ['filename', 'status', 'visibility', 'uploadedBy'],
  },
  access: {
    create: ({ req: { user } }) => canSubmitWork(user),
    read: publicFiles,
    update: ({ req: { user } }) => {
      if (isStaff(user)) return true
      if (!user) return false
      return { uploadedBy: { equals: user.id } }
    },
    delete: ({ req: { user } }) => {
      if (isStaff(user)) return true
      if (!user) return false
      return { uploadedBy: { equals: user.id } }
    },
  },
  hooks: {
    beforeChange: [
      ({ data, req, operation }) => {
        if (operation === 'create' && req.user && !data.uploadedBy) {
          data.uploadedBy = req.user.id
        }
        if (operation === 'create') {
          data.status = data.status || 'draft'
          data.visibility = data.visibility || 'invited'
        }
        return data
      },
    ],
  },
  upload: {
    mimeTypes: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'video/mp4',
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
    ],
  },
  fields: [
    {
      name: 'uploadedBy',
      type: 'relationship',
      relationTo: 'users',
      admin: { readOnly: true, position: 'sidebar' },
    },
    {
      name: 'submission',
      type: 'relationship',
      relationTo: 'submissions',
      admin: { position: 'sidebar' },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'In review', value: 'in_review' },
        { label: 'Sent back', value: 'changes_requested' },
        { label: 'Published', value: 'published' },
      ],
      admin: { position: 'sidebar', readOnly: true },
      access: {
        update: ({ req: { user } }) => isStaff(user),
      },
    },
    {
      name: 'visibility',
      type: 'select',
      defaultValue: 'invited',
      options: [
        { label: 'Public', value: 'public' },
        { label: 'Invited', value: 'invited' },
      ],
      admin: { position: 'sidebar', readOnly: true },
      access: {
        update: ({ req: { user } }) => isStaff(user),
      },
    },
  ],
}
