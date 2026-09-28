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
    defaultColumns: ['filename', 'kind', 'status', 'visibility', 'revision'],
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
      ({ data, req, operation, originalDoc }) => {
        if (operation === 'create' && req.user && !data.uploadedBy) {
          data.uploadedBy = req.user.id
        }
        if (operation === 'create') {
          data.status = data.status || 'draft'
          data.visibility = data.visibility || 'invited'
          data.revision = data.revision || 1
        }
        if (operation === 'update' && originalDoc) {
          data.revision = Number(originalDoc.revision || 0) + 1
        }
        return data
      },
    ],
  },
  upload: {
    staticDir: process.env.UPLOAD_DIR || 'files',
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
    imageSizes: [
      {
        name: 'thumb',
        width: 480,
        height: 320,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumb',
  },
  fields: [
    {
      name: 'caption',
      type: 'textarea',
    },
    {
      name: 'kind',
      type: 'select',
      defaultValue: 'primary',
      options: [
        { label: 'Primary file', value: 'primary' },
        { label: 'Supporting', value: 'supporting' },
        { label: 'Appendix', value: 'appendix' },
      ],
    },
    {
      name: 'language',
      type: 'select',
      defaultValue: 'en',
      options: [
        { label: 'English', value: 'en' },
        { label: 'Spanish', value: 'es' },
      ],
    },
    { name: 'pageCount', type: 'number', min: 0 },
    { name: 'revision', type: 'number', defaultValue: 1, admin: { readOnly: true } },
    { name: 'internalNotes', type: 'textarea' },
    {
      name: 'replaces',
      type: 'relationship',
      relationTo: 'files',
      admin: { description: 'Prior file this revision replaces.' },
    },
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
