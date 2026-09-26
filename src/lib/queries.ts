import type { Where } from 'payload'

import { getAuth, getSessionUser } from '@/lib/payload'

export type TopicCard = {
  id: string
  title: string
  slug: string
  description?: string | null
}

export type ProjectCard = {
  id: string
  title: string
  slug: string
  kind: string
  university: string
  semester?: string | null
  summary: string
}

export type FileCard = {
  id: string
  filename: string
  url?: string | null
  mimeType?: string | null
}

export type SubmissionCard = {
  id: string
  title: string
  slug: string
  summary?: string | null
  format: string
  stage: string
  visibility: string
  status: string
  authors: string
  attributionUniversity: string
  agreedAt?: string | null
  reviewerNote?: string | null
  project?: ProjectCard | null
  topics: TopicCard[]
  files: FileCard[]
}

const asId = (value: unknown) => String(value)

const mapTopic = (value: unknown): TopicCard | null => {
  if (!value || typeof value !== 'object') return null
  const topic = value as { id: unknown; title?: string; slug?: string; description?: string }
  if (!topic.title || !topic.slug) return null
  return {
    id: asId(topic.id),
    title: topic.title,
    slug: topic.slug,
    description: topic.description,
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
  }
}

const mapFile = (value: unknown): FileCard | null => {
  if (!value || typeof value !== 'object') return null
  const file = value as { id: unknown; filename?: string; url?: string; mimeType?: string }
  if (!file.filename) return null
  return {
    id: asId(file.id),
    filename: file.filename,
    url: file.url,
    mimeType: file.mimeType,
  }
}

const mapSubmission = (value: unknown): SubmissionCard | null => {
  if (!value || typeof value !== 'object') return null
  const doc = value as Record<string, unknown>
  if (typeof doc.title !== 'string' || typeof doc.slug !== 'string') return null
  return {
    id: asId(doc.id),
    title: doc.title,
    slug: doc.slug,
    summary: typeof doc.summary === 'string' ? doc.summary : null,
    format: String(doc.format || ''),
    stage: String(doc.stage || ''),
    visibility: String(doc.visibility || ''),
    status: String(doc.status || ''),
    authors: String(doc.authors || ''),
    attributionUniversity: String(doc.attributionUniversity || ''),
    agreedAt: typeof doc.agreedAt === 'string' ? doc.agreedAt : null,
    reviewerNote: typeof doc.reviewerNote === 'string' ? doc.reviewerNote : null,
    project: mapProject(doc.project),
    topics: Array.isArray(doc.topics)
      ? doc.topics.map(mapTopic).filter((topic): topic is TopicCard => Boolean(topic))
      : [],
    files: Array.isArray(doc.files)
      ? doc.files.map(mapFile).filter((file): file is FileCard => Boolean(file))
      : [],
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
    sort: 'title',
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
    and.push({ submittedBy: { equals: Number.isNaN(numericId) ? session.id : numericId } })
  } else {
    and.push({ status: { equals: 'published' } })
  }

  if (query.q) {
    and.push({
      or: [
        { title: { contains: query.q } },
        { authors: { contains: query.q } },
        { summary: { contains: query.q } },
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

  return result.docs.map(mapSubmission).filter((doc): doc is SubmissionCard => Boolean(doc))
}

export const getSubmissionBySlug = async (slug: string) => {
  const { payload, user } = await withAccess()
  const result = await payload.find({
    collection: 'submissions',
    depth: 2,
    limit: 1,
    overrideAccess: false,
    user: user || undefined,
    where: { slug: { equals: slug } },
  })
  return mapSubmission(result.docs[0])
}
