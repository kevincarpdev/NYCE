import type { Access, CollectionConfig, FieldAccess, Where } from 'payload'

import { canSubmitWork, isStaff, ownerId, sameId } from '@/access/roles'
import { AGREEMENT_VERSION } from '@/lib/agreement'
import { toSlug } from '@/lib/slug'

const isOwnerOrStaff: FieldAccess = ({ req: { user }, doc }) =>
  isStaff(user) || sameId(user?.id, ownerId(doc?.submittedBy))

const publishedBodyAccess: FieldAccess = ({ req: { user }, doc }) => {
  if (isStaff(user) || sameId(user?.id, ownerId(doc?.submittedBy))) return true
  if (doc?.status !== 'published') return false
  if (doc?.visibility === 'public') return true
  return Boolean(user)
}

const readSubmissions: Access = ({ req: { user } }) => {
  if (isStaff(user)) return true
  if (!user) {
    const where: Where = { status: { equals: 'published' } }
    return where
  }
  const where: Where = {
    or: [{ status: { equals: 'published' } }, { submittedBy: { equals: user.id } }],
  }
  return where
}

const updateSubmissions: Access = ({ req: { user } }) => {
  if (isStaff(user)) return true
  if (!user || !canSubmitWork(user)) return false
  const where: Where = {
    and: [
      { submittedBy: { equals: user.id } },
      { status: { in: ['draft', 'changes_requested'] } },
    ],
  }
  return where
}

export const Submissions: CollectionConfig = {
  slug: 'submissions',
  admin: {
    group: 'Library',
    useAsTitle: 'title',
    description: 'Leftover climate-tech research. Reviewers publish or send back. Attribution and the agreement stay on the record.',
    defaultColumns: ['title', 'status', 'visibility', 'project', 'agreedBy', 'agreedAt'],
    listSearchableFields: ['title', 'authors', 'summary'],
    components: {
      beforeListTable: ['/components/admin/ReviewQueueLink'],
      edit: {
        beforeDocumentControls: ['/components/admin/ReviewActions'],
      },
    },
  },
  access: {
    create: ({ req: { user } }) => canSubmitWork(user),
    read: readSubmissions,
    update: updateSubmissions,
    delete: ({ req: { user } }) => isStaff(user),
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data && !data.slug && data.title) {
          data.slug = toSlug(data.title)
        }
        return data
      },
    ],
    beforeChange: [
      ({ data, req, operation }) => {
        if (!data) return data
        if (operation === 'create' && req.user && !data.submittedBy) {
          data.submittedBy = req.user.id
          if (!isStaff(req.user)) {
            data.status = 'in_review'
          }
        }
        if (data.agreed && !data.agreedAt) {
          data.agreedAt = new Date().toISOString()
          data.agreedBy = req.user?.id
          data.agreementVersion = data.agreementVersion || AGREEMENT_VERSION
        }
        if (operation === 'create' && !data.agreed && !isStaff(req.user)) {
          throw new Error('Agree to the attribution terms before submitting.')
        }
        return data
      },
    ],
    afterChange: [
      async ({ doc, req }) => {
        const related = Array.isArray(doc.files) ? doc.files : []
        for (const entry of related) {
          const id = typeof entry === 'object' && entry && 'id' in entry ? entry.id : entry
          if (!id) continue
          await req.payload.update({
            collection: 'files',
            id,
            data: {
              submission: doc.id,
              status: doc.status,
              visibility: doc.visibility,
            },
            overrideAccess: true,
            req,
            context: { skipFileSync: true },
          })
        }
        return doc
      },
    ],
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
      name: 'summary',
      type: 'textarea',
      required: true,
      access: { read: publishedBodyAccess },
    },
    {
      name: 'project',
      type: 'relationship',
      relationTo: 'projects',
      required: true,
    },
    {
      name: 'topics',
      type: 'relationship',
      relationTo: 'topics',
      hasMany: true,
      required: true,
    },
    {
      name: 'format',
      type: 'select',
      required: true,
      options: [
        { label: 'Memo', value: 'memo' },
        { label: 'Deck', value: 'deck' },
        { label: 'Spreadsheet', value: 'spreadsheet' },
        { label: 'Paper', value: 'paper' },
        { label: 'Video', value: 'video' },
      ],
    },
    {
      name: 'stage',
      type: 'select',
      required: true,
      options: [
        { label: 'Concept', value: 'concept' },
        { label: 'Lab result', value: 'lab_result' },
        { label: 'Prototype', value: 'prototype' },
        { label: 'Shelved', value: 'shelved' },
      ],
    },
    {
      name: 'visibility',
      type: 'select',
      required: true,
      defaultValue: 'public',
      options: [
        { label: 'Public', value: 'public' },
        { label: 'Invited', value: 'invited' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'in_review',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'In review', value: 'in_review' },
        { label: 'Sent back', value: 'changes_requested' },
        { label: 'Published', value: 'published' },
      ],
      admin: { position: 'sidebar' },
      access: {
        update: ({ req: { user } }) => isStaff(user),
      },
    },
    {
      name: 'authors',
      type: 'text',
      required: true,
    },
    {
      name: 'attributionUniversity',
      type: 'text',
      required: true,
    },
    {
      name: 'notTakingForward',
      type: 'checkbox',
      defaultValue: true,
      label: 'We are not taking this work forward',
    },
    {
      name: 'files',
      type: 'relationship',
      relationTo: 'files',
      hasMany: true,
      access: { read: publishedBodyAccess },
    },
    {
      name: 'reviewerNote',
      type: 'textarea',
      admin: { position: 'sidebar' },
      access: {
        read: isOwnerOrStaff,
        update: ({ req: { user } }) => isStaff(user),
      },
    },
    {
      name: 'submittedBy',
      type: 'relationship',
      relationTo: 'users',
      admin: { readOnly: true, position: 'sidebar' },
    },
    {
      name: 'agreed',
      type: 'checkbox',
      required: true,
      label: 'I agree to the attribution terms',
    },
    {
      name: 'agreementVersion',
      type: 'text',
      admin: { readOnly: true, position: 'sidebar' },
    },
    {
      name: 'agreedAt',
      type: 'date',
      admin: {
        readOnly: true,
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    {
      name: 'agreedBy',
      type: 'relationship',
      relationTo: 'users',
      admin: { readOnly: true, position: 'sidebar' },
    },
  ],
}
