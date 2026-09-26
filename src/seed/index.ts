import type { Payload } from 'payload'

import { AGREEMENT_VERSION } from '@/lib/agreement'
import { DEMO_PASSWORD } from '@/lib/demo'
import { makePdf, makePptx, makeXlsx } from '@/seed/sampleFiles'

const topics = [
  { title: 'Energy', slug: 'energy', description: 'Generation, storage, microgrids, and efficiency.' },
  {
    title: 'Buildings and materials',
    slug: 'buildings-and-materials',
    description: 'Mass timber, retrofits, and lower-carbon construction.',
  },
  { title: 'Mobility', slug: 'mobility', description: 'Transit, charging, and freight.' },
  {
    title: 'Food and agriculture',
    slug: 'food-and-agriculture',
    description: 'Cold chain, soil, and regional food systems.',
  },
  {
    title: 'Water and coasts',
    slug: 'water-and-coasts',
    description: 'Harbor, flood, and living shoreline work.',
  },
  {
    title: 'Carbon and measurement',
    slug: 'carbon-and-measurement',
    description: 'Inventories, sensors, and methods people can actually run.',
  },
  {
    title: 'Adaptation and resilience',
    slug: 'adaptation-and-resilience',
    description: 'Heat, housing, and neighborhood-scale preparedness.',
  },
  {
    title: 'Climate finance',
    slug: 'climate-finance',
    description: 'Who pays, in what order, and what breaks the model.',
  },
  {
    title: 'Data and software',
    slug: 'data-and-software',
    description: 'Tools, licensing, and data products that did not become a company.',
  },
]

type SeedFile = {
  name: string
  mimetype: string
  data: Buffer
}

const uploadFile = async (payload: Payload, uploadedBy: number, file: SeedFile) => {
  const created = await payload.create({
    collection: 'files',
    data: {
      uploadedBy,
      status: 'draft',
      visibility: 'invited',
    },
    file: {
      data: file.data,
      mimetype: file.mimetype,
      name: file.name,
      size: file.data.length,
    },
    overrideAccess: true,
  })
  return created.id
}

export const seed = async (payload: Payload) => {
  payload.logger.info('Seeding NYCE knowledge hub demo…')

  const student = await payload.create({
    collection: 'users',
    data: {
      name: 'Amina Ruiz',
      email: 'student@nyce.demo',
      password: DEMO_PASSWORD,
      role: 'student',
      university: 'Stony Brook University',
    },
    overrideAccess: true,
  })

  const professor = await payload.create({
    collection: 'users',
    data: {
      name: 'Dr. Priya Raman',
      email: 'professor@nyce.demo',
      password: DEMO_PASSWORD,
      role: 'professor',
      university: 'Stony Brook University',
    },
    overrideAccess: true,
  })

  await payload.create({
    collection: 'users',
    data: {
      name: 'Leo Park',
      email: 'member@nyce.demo',
      password: DEMO_PASSWORD,
      role: 'member',
      university: 'City University of New York',
    },
    overrideAccess: true,
  })

  const reviewer = await payload.create({
    collection: 'users',
    data: {
      name: 'Jordan Ellis',
      email: 'reviewer@nyce.demo',
      password: DEMO_PASSWORD,
      role: 'reviewer',
      university: 'The New York Climate Exchange',
    },
    overrideAccess: true,
  })

  const topicIds: Record<string, number> = {}
  for (const topic of topics) {
    const created = await payload.create({
      collection: 'topics',
      data: topic,
      overrideAccess: true,
    })
    topicIds[topic.slug] = created.id
  }

  const studio = await payload.create({
    collection: 'projects',
    data: {
      title: 'Climate Venture Studio',
      slug: 'climate-venture-studio',
      kind: 'course',
      university: 'Stony Brook University',
      semester: 'Fall 2025',
      summary:
        'A semester studio for students who tried to turn climate research into a venture, then chose to leave the work behind for the next class.',
    },
    overrideAccess: true,
  })

  const cohort = await payload.create({
    collection: 'projects',
    data: {
      title: 'Exchange Founders Cohort',
      slug: 'exchange-founders-cohort',
      kind: 'cohort',
      university: 'The New York Climate Exchange',
      semester: 'Spring 2026',
      summary:
        'Invited founders and researchers who paused a company idea and filed the research so later cohorts could pick it up.',
    },
    overrideAccess: true,
  })

  const lab = await payload.create({
    collection: 'projects',
    data: {
      title: 'Harbor Edge Lab',
      slug: 'harbor-edge-lab',
      kind: 'lab',
      university: 'City University of New York',
      semester: '2025–26',
      summary:
        'Field notes from oyster restoration, bulkheads, and salt-air materials on the New York Harbor edge.',
    },
    overrideAccess: true,
  })

  const agreed = {
    agreed: true,
    agreementVersion: AGREEMENT_VERSION,
    agreedAt: '2026-04-12T15:04:00.000Z',
    notTakingForward: true,
  }

  const oysterPdf = makePdf('Leaving the reef to breathe', [
    'Sample research for the NYCE knowledge hub prototype. Not a real study.',
    'A low-cost dissolved-oxygen logger for restored oyster cages in New York Harbor. The team stopped when a commercial sensor dropped in price. The enclosure drawing and the field protocol are the useful leftover.',
  ])
  const microgridDeck = makePptx('Rooftop microgrid for a SUNY dorm', [
    'Sample pitch leftover. Not a live venture.',
    '40 kW rooftop plus battery on a Stony Brook dorm.',
    'Load model and tariff assumptions are the part to reuse.',
  ])
  const bulkheadSheet = makeXlsx('Who pays for the bulkhead', [
    ['Source', 'Amount', 'Note'],
    ['City capital', '0.40', 'Bond timing is the risk'],
    ['State grant', '0.35', 'Needs a shovel-ready design'],
    ['Philanthropy', '0.15', 'One-time only'],
    ['Gap', '0.10', 'This is why the team stopped'],
  ])
  const methanePdf = makePdf('Counting methane without a Ferrari', [
    'Sample method note. Not a certified protocol.',
    'Two handheld sensors and a walking route instead of a truck-mounted analyzer. Shelved after the team could not get insurance for campus vehicles.',
  ])
  const timberPdf = makePdf('Mass timber joint in salt air', [
    'Sample materials note from Harbor Edge Lab.',
    'Fastener specification for a mass-timber joint that will sit in salt air. The team will not patent this. Next semester can test it.',
  ])
  const termsPdf = makePdf('Term sheet language we were handed', [
    'Sample invited memo. Partner-sensitive in a real hub. Fictional here.',
    'Notes on data licensing language from a partner conversation. Marked invited so only signed-in members can open the file.',
  ])
  const ferryPdf = makePdf('Charging at the ferry slip', [
    'Sample student submission waiting for review.',
    'A charging layout for a Governors Island ferry slip. The team is not taking it forward. They want a reviewer to publish the load table.',
  ])
  const compostPdf = makePdf('Cold-chain for a hub farm', [
    'Sample submission sent back for a clearer attribution of USDA numbers.',
    'A small cold-chain loop for a community farm. Reviewer asked who owns the yield table.',
  ])

  const oysterFile = await uploadFile(payload, professor.id, {
    name: 'oyster-reef-protocol.pdf',
    mimetype: 'application/pdf',
    data: oysterPdf,
  })
  const microgridFile = await uploadFile(payload, professor.id, {
    name: 'rooftop-microgrid-dorm.pptx',
    mimetype: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    data: microgridDeck,
  })
  const bulkheadFile = await uploadFile(payload, professor.id, {
    name: 'bulkhead-capital-stack.xlsx',
    mimetype: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    data: bulkheadSheet,
  })
  const methaneFile = await uploadFile(payload, professor.id, {
    name: 'methane-method-note.pdf',
    mimetype: 'application/pdf',
    data: methanePdf,
  })
  const timberFile = await uploadFile(payload, professor.id, {
    name: 'mass-timber-salt-air.pdf',
    mimetype: 'application/pdf',
    data: timberPdf,
  })
  const termsFile = await uploadFile(payload, professor.id, {
    name: 'partner-term-sheet-notes.pdf',
    mimetype: 'application/pdf',
    data: termsPdf,
  })
  const ferryFile = await uploadFile(payload, student.id, {
    name: 'ferry-slip-charging.pdf',
    mimetype: 'application/pdf',
    data: ferryPdf,
  })
  const compostFile = await uploadFile(payload, student.id, {
    name: 'hub-farm-cold-chain.pdf',
    mimetype: 'application/pdf',
    data: compostPdf,
  })

  const submissions: {
    title: string
    slug: string
    summary: string
    project: number
    topics: number[]
    format: 'memo' | 'deck' | 'spreadsheet' | 'paper' | 'video'
    stage: 'concept' | 'lab_result' | 'prototype' | 'shelved'
    visibility: 'public' | 'invited'
    status: 'draft' | 'in_review' | 'changes_requested' | 'published'
    authors: string
    attributionUniversity: string
    files: number[]
    submittedBy: number
    agreedBy: number
    agreed: boolean
    agreementVersion: string
    agreedAt: string
    notTakingForward: boolean
    reviewerNote?: string
  }[] = [
    {
      title: 'Leaving the reef to breathe',
      slug: 'leaving-the-reef-to-breathe',
      summary:
        'A cheap dissolved-oxygen logger for restored oyster cages. The team stopped when a commercial sensor dropped in price. The enclosure and the field protocol are the leftover.',
      project: lab.id,
      topics: [topicIds['water-and-coasts']],
      format: 'memo',
      stage: 'prototype',
      visibility: 'public',
      status: 'published',
      authors: 'Maya Chen, Harbor Edge Lab',
      attributionUniversity: 'City University of New York',
      files: [oysterFile],
      submittedBy: professor.id,
      agreedBy: professor.id,
      ...agreed,
    },
    {
      title: 'Rooftop microgrid for a SUNY dorm',
      slug: 'rooftop-microgrid-for-a-suny-dorm',
      summary:
        'A 40 kW rooftop and battery model for a Stony Brook dorm. They are not taking it forward. The load model and tariff assumptions are what next semester should reuse.',
      project: studio.id,
      topics: [topicIds.energy],
      format: 'deck',
      stage: 'concept',
      visibility: 'public',
      status: 'published',
      authors: 'Chris Alvarez, Priya Raman',
      attributionUniversity: 'Stony Brook University',
      files: [microgridFile],
      submittedBy: professor.id,
      agreedBy: professor.id,
      ...agreed,
    },
    {
      title: 'Who pays for the bulkhead',
      slug: 'who-pays-for-the-bulkhead',
      summary:
        'A capital-stack model for a coastal flood retrofit. The team paused after legal review. The gap is the point of the leftover, not a company.',
      project: cohort.id,
      topics: [topicIds['climate-finance'], topicIds['water-and-coasts']],
      format: 'spreadsheet',
      stage: 'shelved',
      visibility: 'public',
      status: 'published',
      authors: 'Noor Haddad',
      attributionUniversity: 'The New York Climate Exchange',
      files: [bulkheadFile],
      submittedBy: professor.id,
      agreedBy: professor.id,
      ...agreed,
    },
    {
      title: 'Counting methane without a Ferrari',
      slug: 'counting-methane-without-a-ferrari',
      summary:
        'A walking protocol using two handheld sensors instead of a truck-mounted analyzer. Shelved when campus vehicle insurance blocked the original design.',
      project: studio.id,
      topics: [topicIds['carbon-and-measurement']],
      format: 'paper',
      stage: 'lab_result',
      visibility: 'public',
      status: 'published',
      authors: 'Sam Okonkwo, Priya Raman',
      attributionUniversity: 'Stony Brook University',
      files: [methaneFile],
      submittedBy: professor.id,
      agreedBy: professor.id,
      ...agreed,
    },
    {
      title: 'Mass timber joint in salt air',
      slug: 'mass-timber-joint-in-salt-air',
      summary:
        'Fastener notes for a mass-timber joint that will sit in harbor air. Not patented. Next semester can test the spec on a mock-up.',
      project: lab.id,
      topics: [topicIds['buildings-and-materials']],
      format: 'memo',
      stage: 'lab_result',
      visibility: 'public',
      status: 'published',
      authors: 'Elena Voss',
      attributionUniversity: 'City University of New York',
      files: [timberFile],
      submittedBy: professor.id,
      agreedBy: professor.id,
      ...agreed,
    },
    {
      title: 'Term sheet language we were handed',
      slug: 'term-sheet-language-we-were-handed',
      summary:
        'Notes on data-licensing language from a partner conversation. Marked invited. Logged-out visitors can see that it exists. They cannot open the file or the body.',
      project: cohort.id,
      topics: [topicIds['data-and-software']],
      format: 'memo',
      stage: 'shelved',
      visibility: 'invited',
      status: 'published',
      authors: 'Priya Raman',
      attributionUniversity: 'Stony Brook University',
      files: [termsFile],
      submittedBy: professor.id,
      agreedBy: professor.id,
      ...agreed,
    },
    {
      title: 'Charging at the ferry slip',
      slug: 'charging-at-the-ferry-slip',
      summary:
        'A charging layout for a Governors Island ferry slip. Waiting on review. Amina is not taking this forward and wants the load table published for the next studio.',
      project: studio.id,
      topics: [topicIds.mobility, topicIds.energy],
      format: 'deck',
      stage: 'concept',
      visibility: 'public',
      status: 'in_review',
      authors: 'Amina Ruiz',
      attributionUniversity: 'Stony Brook University',
      files: [ferryFile],
      submittedBy: student.id,
      agreedBy: student.id,
      agreedAt: '2026-09-18T14:22:00.000Z',
      agreed: true,
      agreementVersion: AGREEMENT_VERSION,
      notTakingForward: true,
    },
    {
      title: 'Cold-chain for a hub farm',
      slug: 'cold-chain-for-a-hub-farm',
      summary:
        'A small refrigeration loop for a community farm. Sent back so the USDA yield table is attributed clearly before anyone else builds on it.',
      project: cohort.id,
      topics: [topicIds['food-and-agriculture']],
      format: 'memo',
      stage: 'prototype',
      visibility: 'public',
      status: 'changes_requested',
      authors: 'Amina Ruiz, Leo Park',
      attributionUniversity: 'Stony Brook University',
      files: [compostFile],
      submittedBy: student.id,
      agreedBy: student.id,
      reviewerNote:
        'Please name the USDA series on the yield table and say whether those numbers are yours or theirs. Then resubmit.',
      agreedAt: '2026-09-10T11:08:00.000Z',
      agreed: true,
      agreementVersion: AGREEMENT_VERSION,
      notTakingForward: true,
    },
  ]

  for (const submission of submissions) {
    await payload.create({
      collection: 'submissions',
      data: submission,
      overrideAccess: true,
      user: reviewer,
    })
  }

  payload.logger.info('Demo library is ready. Sign in with nyce-demo-2026.')
}
