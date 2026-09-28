import type { Where } from 'payload'

import { canIterate } from '@/lib/collab'
import { lexicalToPlain } from '@/lib/lexical'
import { getAuth, getSessionUser } from '@/lib/payload'

export type TopicCard = {
  id: string
  title: string
  slug: string
  description?: string | null
  cluster?: string | null
}

export type ProjectCard = {
  id: string
  title: string
  slug: string
  kind: string
  university: string
  semester?: string | null
  summary: string
  faculty: { name: string; role?: string | null }[]
  neighborhood?: string | null
}

export type FileCard = {
  id: string
  filename: string
  url?: string | null
  mimeType?: string | null
  caption?: string | null
  kind?: string | null
  pageCount?: number | null
  revision?: number | null
}

export type LeftoverSection = {
  id?: string
  blockType: string
  heading: string
  body: string
}

export type AuthorEntry = {
  name: string
  role?: string | null
  affiliation?: string | null
}

export type PersonCard = {
  id: string
  name: string
}

export type SubmissionCard = {
  id: string
  title: string
  slug: string
  summary?: string | null
  writeup?: string | null
  handoff?: string | null
  leftoverSections: LeftoverSection[]
  authorList: AuthorEntry[]
  collaborators: PersonCard[]
  format: string
  stage: string
  visibility: string
  status: string
  reuseLevel?: string | null
  estimatedHours?: number | null
  authors: string
  attributionUniversity: string
  agreedAt?: string | null
  reviewerNote?: string | null
  revision: number
  updatedAt?: string | null
  project?: ProjectCard | null
  topics: TopicCard[]
  files: FileCard[]
  canIterate: boolean
}

export type CommentCard = {
  id: string
  body: string
  channel: string
  role: string
  authorName: string
  createdAt?: string | null
}

export type SuggestionCard = {
  id: string
  field: string
  before?: string | null
  after: string
  rationale?: string | null
  status: string
  proposedByName: string
  createdAt?: string | null
}

export type PresenceCard = {
  id: string
  userName: string
  action: string
  lastSeen?: string | null
  userId: string
}

export type VersionCard = {
  id: string
  title?: string
  updatedAt?: string | null
  revision?: number | null
}

const asId = (value: unknown) => String(value)

const mapTopic = (value: unknown): TopicCard | null => {
  if (!value || typeof value !== 'object') return null
  const topic = value as {
    id: unknown
    title?: string
    slug?: string
    description?: string
    cluster?: string
  }
  if (!topic.title || !topic.slug) return null
  return {
    id: asId(topic.id),
    title: topic.title,
    slug: topic.slug,
    description: topic.description,
    cluster: topic.cluster,
  }
}

const mapProject = (value: unknown): ProjectCard | null => {
  if (!value || typeof value !== 'object') return null
  const project = value as {
    id: unknown
    title?: string
    slug?: string
    kind?: string
    university?: string
    semester?: string
    summary?: string
    faculty?: { name?: string; role?: string }[]
    campus?: { neighborhood?: string }
  }
  if (!project.title || !project.slug || !project.kind || !project.university || !project.summary) {
    return null
  }
  return {
    id: asId(project.id),
    title: project.title,
    slug: project.slug,
    kind: project.kind,
    university: project.university,
    semester: project.semester,
    summary: project.summary,
    faculty: Array.isArray(project.faculty)
      ? project.faculty
          .filter((row) => row?.name)
          .map((row) => ({ name: row.name as string, role: row.role }))
      : [],
    neighborhood: project.campus?.neighborhood,
  }
}

const mapFile = (value: unknown): FileCard | null => {
  if (!value || typeof value !== 'object') return null
  const file = value as {
    id: unknown
    filename?: string
    url?: string
    mimeType?: string
    caption?: string
    kind?: string
    pageCount?: number
    revision?: number
  }
  if (!file.filename) return null
  return {
    id: asId(file.id),
    filename: file.filename,
    url: file.url,
    mimeType: file.mimeType,
    caption: file.caption,
    kind: file.kind,
    pageCount: file.pageCount,
    revision: file.revision,
  }
}

const mapPerson = (value: unknown): PersonCard | null => {
  if (!value || typeof value !== 'object') return null
  const person = value as { id: unknown; name?: string }
  if (!person.name) return null
  return { id: asId(person.id), name: person.name }
}

const mapSection = (value: unknown): LeftoverSection | null => {
  if (!value || typeof value !== 'object') return null
  const block = value as { id?: string; blockType?: string; heading?: string; body?: string }
  if (!block.blockType || !block.heading || !block.body) return null
  return {
    id: block.id,
    blockType: block.blockType,
    heading: block.heading,
    body: block.body,
  }
}

const mapSubmission = (value: unknown, canEdit = false): SubmissionCard | null => {
  if (!value || typeof value !== 'object') return null
  const doc = value as Record<string, unknown>
  if (typeof doc.title !== 'string' || typeof doc.slug !== 'string') return null
  return {
    id: asId(doc.id),
    title: doc.title,
    slug: doc.slug,
    summary: typeof doc.summary === 'string' ? doc.summary : null,
    writeup: lexicalToPlain(doc.writeup) || null,
    handoff: typeof doc.handoff === 'string' ? doc.handoff : null,
    leftoverSections: Array.isArray(doc.leftoverSections)
      ? doc.leftoverSections
          .map(mapSection)
          .filter((section): section is LeftoverSection => Boolean(section))
      : [],
    authorList: Array.isArray(doc.authorList)
      ? (doc.authorList as AuthorEntry[]).filter((row) => row?.name)
      : [],
    collaborators: Array.isArray(doc.collaborators)
      ? doc.collaborators.map(mapPerson).filter((person): person is PersonCard => Boolean(person))
      : [],
    format: String(doc.format || ''),
    stage: String(doc.stage || ''),
    visibility: String(doc.visibility || ''),
    status: String(doc.status || ''),
    reuseLevel: typeof doc.reuseLevel === 'string' ? doc.reuseLevel : null,
    estimatedHours: typeof doc.estimatedHours === 'number' ? doc.estimatedHours : null,
    authors: String(doc.authors || ''),
    attributionUniversity: String(doc.attributionUniversity || ''),
    agreedAt: typeof doc.agreedAt === 'string' ? doc.agreedAt : null,
    reviewerNote: typeof doc.reviewerNote === 'string' ? doc.reviewerNote : null,
    revision: typeof doc.revision === 'number' ? doc.revision : 1,
    updatedAt: typeof doc.updatedAt === 'string' ? doc.updatedAt : null,
    project: mapProject(doc.project),
    topics: Array.isArray(doc.topics)
      ? doc.topics.map(mapTopic).filter((topic): topic is TopicCard => Boolean(topic))
      : [],
    files: Array.isArray(doc.files)
      ? doc.files.map(mapFile).filter((file): file is FileCard => Boolean(file))
      : [],
    canIterate: canEdit,
  }
}

const withAccess = async () => {
  const { payload, user } = await getAuth()
  const session = await getSessionUser()
  return { payload, user, session }
}

export const listTopics = async () => {
  const { payload } = await withAccess()
  const result = await payload.find({
    collection: 'topics',
    limit: 50,
    sort: 'sortOrder',
    overrideAccess: false,
  })
  return result.docs.map(mapTopic).filter((topic): topic is TopicCard => Boolean(topic))
}

export const listProjects = async () => {
  const { payload } = await withAccess()
  const result = await payload.find({
    collection: 'projects',
    limit: 50,
    sort: 'title',
    overrideAccess: false,
  })
  return result.docs.map(mapProject).filter((project): project is ProjectCard => Boolean(project))
}

type LibraryQuery = {
  q?: string
  topic?: string
  project?: string
  format?: string
  stage?: string
  mine?: boolean
}

export const listSubmissions = async (query: LibraryQuery = {}) => {
  const { payload, user, session } = await withAccess()
  const and: Where[] = []

  if (query.mine && session) {
    const numericId = Number(session.id)
    const id = Number.isNaN(numericId) ? session.id : numericId
    and.push({
      or: [{ submittedBy: { equals: id } }, { collaborators: { contains: id } }],
    })
  } else {
    and.push({ status: { equals: 'published' } })
  }

  if (query.q) {
    and.push({
      or: [
        { title: { contains: query.q } },
        { authors: { contains: query.q } },
        { summary: { contains: query.q } },
        { handoff: { contains: query.q } },
      ],
    })
  }

  if (query.topic) {
    const topic = await payload.find({
      collection: 'topics',
      where: { slug: { equals: query.topic } },
      limit: 1,
      overrideAccess: false,
    })
    if (topic.docs[0]) {
      and.push({ topics: { contains: topic.docs[0].id } })
    }
  }

  if (query.project) {
    const project = await payload.find({
      collection: 'projects',
      where: { slug: { equals: query.project } },
      limit: 1,
      overrideAccess: false,
    })
    if (project.docs[0]) {
      and.push({ project: { equals: project.docs[0].id } })
    }
  }

  if (query.format) and.push({ format: { equals: query.format } })
  if (query.stage) and.push({ stage: { equals: query.stage } })

  const result = await payload.find({
    collection: 'submissions',
    depth: 2,
    limit: 50,
    sort: '-createdAt',
    overrideAccess: false,
    user: user || undefined,
    where: and.length ? { and } : undefined,
  })

  return result.docs
    .map((doc) => mapSubmission(doc, canIterate(session, doc)))
    .filter((doc): doc is SubmissionCard => Boolean(doc))
}

export const getSubmissionBySlug = async (slug: string) => {
  const { payload, user, session } = await withAccess()
  const result = await payload.find({
    collection: 'submissions',
    depth: 2,
    limit: 1,
    overrideAccess: false,
    user: user || undefined,
    where: { slug: { equals: slug } },
  })
  const doc = result.docs[0]
  return mapSubmission(doc, canIterate(session, doc))
}

const mapComment = (value: unknown): CommentCard | null => {
  if (!value || typeof value !== 'object') return null
  const doc = value as Record<string, unknown>
  if (typeof doc.body !== 'string') return null
  return {
    id: asId(doc.id),
    body: doc.body,
    channel: String(doc.channel || 'discussion'),
    role: String(doc.role || 'user'),
    authorName: String(doc.authorName || 'Someone'),
    createdAt: typeof doc.createdAt === 'string' ? doc.createdAt : null,
  }
}

const mapSuggestion = (value: unknown): SuggestionCard | null => {
  if (!value || typeof value !== 'object') return null
  const doc = value as Record<string, unknown>
  if (typeof doc.after !== 'string' || typeof doc.field !== 'string') return null
  return {
    id: asId(doc.id),
    field: doc.field,
    before: typeof doc.before === 'string' ? doc.before : null,
    after: doc.after,
    rationale: typeof doc.rationale === 'string' ? doc.rationale : null,
    status: String(doc.status || 'proposed'),
    proposedByName: String(doc.proposedByName || 'Someone'),
    createdAt: typeof doc.createdAt === 'string' ? doc.createdAt : null,
  }
}

export const getWorkspace = async (slug: string) => {
  const { payload, user, session } = await withAccess()
  const result = await payload.find({
    collection: 'submissions',
    depth: 2,
    limit: 1,
    overrideAccess: false,
    user: user || undefined,
    where: { slug: { equals: slug } },
  })
  const doc = result.docs[0]
  const item = mapSubmission(doc, canIterate(session, doc))
  if (!item || !session) return null

  const [comments, suggestions, versions] = await Promise.all([
    payload.find({
      collection: 'comments',
      where: { submission: { equals: Number(item.id) } },
      sort: 'createdAt',
      limit: 100,
      overrideAccess: false,
      user: user || undefined,
    }),
    payload.find({
      collection: 'suggestions',
      where: { submission: { equals: Number(item.id) } },
      sort: '-createdAt',
      limit: 50,
      overrideAccess: false,
      user: user || undefined,
    }),
    payload.findVersions({
      collection: 'submissions',
      where: { parent: { equals: Number(item.id) } },
      sort: '-updatedAt',
      limit: 12,
      overrideAccess: true,
    }),
  ])

  return {
    item,
    comments: comments.docs.map(mapComment).filter((row): row is CommentCard => Boolean(row)),
    suggestions: suggestions.docs
      .map(mapSuggestion)
      .filter((row): row is SuggestionCard => Boolean(row)),
    versions: versions.docs.map((version) => ({
      id: asId(version.id),
      title: typeof version.version?.title === 'string' ? version.version.title : item.title,
      updatedAt: typeof version.updatedAt === 'string' ? version.updatedAt : null,
      revision:
        typeof version.version?.revision === 'number' ? version.version.revision : null,
    })) as VersionCard[],
  }
}
