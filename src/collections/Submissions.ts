import type { Access, CollectionConfig, FieldAccess, Where } from 'payload'

import { canSubmitWork, isStaff, ownerId, sameId } from '@/access/roles'
import { AGREEMENT_VERSION } from '@/lib/agreement'
import { toSlug } from '@/lib/slug'

const isOwnerOrStaff: FieldAccess = ({ req: { user }, doc }) =>
  isStaff(user) || sameId(user?.id, ownerId(doc?.submittedBy))

const publishedBodyAccess: FieldAccess = ({ req: { user }, doc }) => {
  if (isStaff(user) || sameId(user?.id, ownerId(doc?.submittedBy))) return true
  const collaborators = Array.isArray(doc?.collaborators) ? doc.collaborators : []
  if (collaborators.some((entry: unknown) => sameId(user?.id, ownerId(entry)))) return true
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
    or: [
      { status: { equals: 'published' } },
      { submittedBy: { equals: user.id } },
      { collaborators: { contains: user.id } },
    ],
  }
  return where
}

const updateSubmissions: Access = ({ req: { user } }) => {
  if (isStaff(user)) return true
  if (!user || !canSubmitWork(user)) return false
  const where: Where = {
    or: [{ submittedBy: { equals: user.id } }, { collaborators: { contains: user.id } }],
  }
  return where
}

export const Submissions: CollectionConfig = {
  slug: 'submissions',
  admin: {
    group: 'Library',
    useAsTitle: 'title',
    description:
      'Leftover climate-tech research. Reviewers publish or send back. Attribution and the agreement stay on the record.',
    defaultColumns: ['title', 'status', 'visibility', 'project', 'agreedBy', 'agreedAt'],
    listSearchableFields: ['title', 'authors', 'summary', 'handoff'],
    components: {
      beforeListTable: ['/components/admin/ReviewQueueLink'],
      edit: {
        beforeDocumentControls: ['/components/admin/ReviewActions'],
      },
    },
  },
  versions: {
    maxPerDoc: 30,
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
      ({ data, req, operation, originalDoc }) => {
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
        if (operation === 'create') {
          data.revision = 1
        }
        if (operation === 'update' && originalDoc) {
          const current = Number(originalDoc.revision || 0)
          if (data.revision != null && Number(data.revision) !== current) {
            throw new Error(
              'Someone else saved this while you were editing. Reload, then apply your change.',
            )
          }
          data.revision = current + 1
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
      type: 'tabs',
      tabs: [
        {
          label: 'Work',
          fields: [
            { name: 'title', type: 'text', required: true },
            {
              name: 'summary',
              type: 'textarea',
              required: true,
              access: { read: publishedBodyAccess },
            },
            {
              name: 'writeup',
              type: 'richText',
              access: { read: publishedBodyAccess },
            },
            {
              name: 'handoff',
              type: 'textarea',
              label: 'What next semester should reuse',
              access: { read: publishedBodyAccess },
            },
            {
              name: 'leftoverSections',
              type: 'blocks',
              access: { read: publishedBodyAccess },
              blocks: [
                {
                  slug: 'finding',
                  labels: { singular: 'Finding', plural: 'Findings' },
                  fields: [
                    { name: 'heading', type: 'text', required: true },
                    { name: 'body', type: 'textarea', required: true },
                  ],
                },
                {
                  slug: 'method',
                  labels: { singular: 'Method', plural: 'Methods' },
                  fields: [
                    { name: 'heading', type: 'text', required: true },
                    { name: 'body', type: 'textarea', required: true },
                  ],
                },
                {
                  slug: 'caveat',
                  labels: { singular: 'Caveat', plural: 'Caveats' },
                  fields: [
                    { name: 'heading', type: 'text', required: true },
                    { name: 'body', type: 'textarea', required: true },
                  ],
                },
                {
                  slug: 'reuse',
                  labels: { singular: 'Reuse this', plural: 'Reuse this' },
                  fields: [
                    { name: 'heading', type: 'text', required: true },
                    { name: 'body', type: 'textarea', required: true },
                  ],
                },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'estimatedHours', type: 'number', min: 0 },
                {
                  name: 'reuseLevel',
                  type: 'radio',
                  defaultValue: 'reuse_method',
                  options: [
                    { label: 'Read it, then move on', value: 'skim' },
                    { label: 'Reuse the method', value: 'reuse_method' },
                    { label: 'Reuse the numbers', value: 'reuse_data' },
                    { label: 'Rebuild from the leftover', value: 'rebuild' },
                  ],
                },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'workStart', type: 'date' },
                { name: 'workEnd', type: 'date' },
              ],
            },
          ],
        },
        {
          label: 'Classify',
          fields: [
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
          ],
        },
        {
          label: 'People',
          fields: [
            { name: 'authors', type: 'text', required: true },
            { name: 'attributionUniversity', type: 'text', required: true },
            {
              name: 'authorList',
              type: 'array',
              fields: [
                { name: 'name', type: 'text', required: true },
                {
                  name: 'role',
                  type: 'select',
                  options: [
                    { label: 'Student', value: 'student' },
                    { label: 'Professor', value: 'professor' },
                    { label: 'Researcher', value: 'researcher' },
                    { label: 'Lab', value: 'lab' },
                  ],
                },
                { name: 'affiliation', type: 'text' },
              ],
            },
            {
              name: 'collaborators',
              type: 'relationship',
              relationTo: 'users',
              hasMany: true,
              admin: {
                description: 'People who can edit this leftover with the submitter.',
              },
            },
            {
              name: 'notTakingForward',
              type: 'checkbox',
              defaultValue: true,
              label: 'We are not taking this work forward',
            },
          ],
        },
        {
          label: 'Files',
          fields: [
            {
              name: 'files',
              type: 'relationship',
              relationTo: 'files',
              hasMany: true,
              access: { read: publishedBodyAccess },
            },
          ],
        },
        {
          label: 'Agreement',
          fields: [
            {
              name: 'agreed',
              type: 'checkbox',
              required: true,
              label: 'I agree to the attribution terms',
            },
            {
              name: 'agreementVersion',
              type: 'text',
              admin: { readOnly: true },
            },
            {
              name: 'agreedAt',
              type: 'date',
              admin: {
                readOnly: true,
                date: { pickerAppearance: 'dayAndTime' },
              },
            },
            {
              name: 'agreedBy',
              type: 'relationship',
              relationTo: 'users',
              admin: { readOnly: true },
            },
          ],
        },
        {
          label: 'Review',
          fields: [
            {
              name: 'reviewerNote',
              type: 'textarea',
              access: {
                read: isOwnerOrStaff,
                update: ({ req: { user } }) => isStaff(user),
              },
            },
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
      name: 'revision',
      type: 'number',
      defaultValue: 1,
      admin: { position: 'sidebar', readOnly: true },
    },
    {
      name: 'submittedBy',
      type: 'relationship',
      relationTo: 'users',
      admin: { readOnly: true, position: 'sidebar' },
    },
  ],
}
