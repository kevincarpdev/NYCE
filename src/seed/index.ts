import type { Payload } from 'payload'

import { AGREEMENT_VERSION } from '@/lib/agreement'
import { DEMO_PASSWORD } from '@/lib/demo'
import { toLexical } from '@/lib/lexical'
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
      kind: 'primary',
      language: 'en',
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
      title: 'M.S. Climate Solutions',
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
      title: 'Studio instructor',
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
      title: 'Next-semester fellow',
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
      title: 'Knowledge hub reviewer',
    },
    overrideAccess: true,
  })

  const clusters: Record<string, 'systems' | 'place' | 'money' | 'tools'> = {
    energy: 'systems',
    'buildings-and-materials': 'systems',
    mobility: 'systems',
    'food-and-agriculture': 'systems',
    'water-and-coasts': 'place',
    'adaptation-and-resilience': 'place',
    'climate-finance': 'money',
    'carbon-and-measurement': 'tools',
    'data-and-software': 'tools',
  }

  const topicIds: Record<string, number> = {}
  for (const [index, topic] of topics.entries()) {
    const created = await payload.create({
      collection: 'topics',
      data: {
        ...topic,
        cluster: clusters[topic.slug],
        sortOrder: index,
        featured: ['water-and-coasts', 'energy', 'climate-finance'].includes(topic.slug),
        guidance: topic.description,
      },
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
      standing: 'term',
      active: true,
      seatCount: 24,
      startsOn: '2025-09-02',
      endsOn: '2025-12-12',
      summary:
        'A semester studio for students who tried to turn climate research into a venture, then chose to leave the work behind for the next class.',
      faculty: [{ name: 'Dr. Priya Raman', role: 'instructor', email: 'professor@nyce.demo' }],
      leads: [professor.id],
      campus: { neighborhood: 'Stony Brook', latitude: 40.912, longitude: -73.123 },
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
      standing: 'recurring',
      active: true,
      seatCount: 16,
      startsOn: '2026-01-20',
      endsOn: '2026-05-15',
      summary:
        'Invited founders and researchers who paused a company idea and filed the research so later cohorts could pick it up.',
      faculty: [{ name: 'Jordan Ellis', role: 'coordinator', email: 'reviewer@nyce.demo' }],
      leads: [reviewer.id],
      campus: { neighborhood: 'Governors Island', latitude: 40.691, longitude: -74.016 },
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
      standing: 'recurring',
      active: true,
      seatCount: 12,
      summary:
        'Field notes from oyster restoration, bulkheads, and salt-air materials on the New York Harbor edge.',
      faculty: [{ name: 'Elena Voss', role: 'lab_lead' }],
      campus: { neighborhood: 'New York Harbor', latitude: 40.701, longitude: -74.013 },
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
    handoff?: string
    leftoverSections?: {
      blockType: 'finding' | 'method' | 'caveat' | 'reuse'
      heading: string
      body: string
    }[]
    authorList?: { name: string; role?: 'student' | 'professor' | 'researcher' | 'lab'; affiliation?: string }[]
    collaborators?: number[]
    reuseLevel?: 'skim' | 'reuse_method' | 'reuse_data' | 'rebuild'
    estimatedHours?: number
    workStart?: string
    workEnd?: string
    writeup?: ReturnType<typeof toLexical>
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
      reuseLevel: 'reuse_method',
      estimatedHours: 40,
      workStart: '2025-06-01',
      workEnd: '2025-08-20',
      handoff:
        'Reuse the enclosure drawing and the dissolved-oxygen walking protocol. Do not rebuild the logger. A commercial sensor now costs less than the print.',
      leftoverSections: [
        {
          blockType: 'finding',
          heading: 'Cheap is no longer the point',
          body: 'The enclosure worked. The commercial drop in sensor price is why the team stopped, not a failed field test.',
        },
        {
          blockType: 'method',
          heading: 'Cage-mounted logger',
          body: 'Print the housing, pot the sensor, zip-tie to the cage. Walk the same three stations at slack tide.',
        },
        {
          blockType: 'reuse',
          heading: 'What to pick up',
          body: 'The protocol PDF and the station list. Next lab can swap in the cheaper sensor and keep the route.',
        },
      ],
      authorList: [
        { name: 'Maya Chen', role: 'researcher', affiliation: 'Harbor Edge Lab' },
        { name: 'Dr. Priya Raman', role: 'professor', affiliation: 'Stony Brook University' },
      ],
      writeup: toLexical([
        'Sample leftover. Not a real study.',
        'A low-cost dissolved-oxygen logger for restored oyster cages in New York Harbor. The team stopped when a commercial sensor dropped in price. The enclosure drawing and the field protocol are the useful leftover.',
      ]),
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
      collaborators: [professor.id],
      reuseLevel: 'reuse_data',
      estimatedHours: 18,
      handoff:
        'Publish the ferry-slip load table. Next studio can size chargers from it. Do not restart the company.',
      leftoverSections: [
        {
          blockType: 'method',
          heading: 'Slip load walk',
          body: 'Count dwell by ferry and map kW at the piling. The drawing is in the PDF.',
        },
        {
          blockType: 'caveat',
          heading: 'Not a utility filing',
          body: 'These are studio numbers. A later cohort has to check them against the operator.',
        },
      ],
      authorList: [{ name: 'Amina Ruiz', role: 'student', affiliation: 'Stony Brook University' }],
      writeup: toLexical([
        'A charging layout for a Governors Island ferry slip. Amina is not taking this forward. She wants the load table published for the next studio.',
      ]),
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
      collaborators: [professor.id],
      reuseLevel: 'reuse_data',
      reviewerNote:
        'Please name the USDA series on the yield table and say whether those numbers are yours or theirs. Then resubmit.',
      agreedAt: '2026-09-10T11:08:00.000Z',
      agreed: true,
      agreementVersion: AGREEMENT_VERSION,
      notTakingForward: true,
    },
  ]

  const createdSubs = []
  for (const submission of submissions) {
    createdSubs.push(
      await payload.create({
        collection: 'submissions',
        data: submission,
        overrideAccess: true,
        user: reviewer,
      }),
    )
  }

  const reef = createdSubs.find((doc) => doc.slug === 'leaving-the-reef-to-breathe')
  const charging = createdSubs.find((doc) => doc.slug === 'charging-at-the-ferry-slip')

  if (reef) {
    await payload.update({
      collection: 'files',
      id: oysterFile,
      data: {
        caption: 'Field protocol and enclosure notes. Sample leftover, not a certified method.',
        pageCount: 2,
        kind: 'primary',
      },
      overrideAccess: true,
    })
    await payload.create({
      collection: 'comments',
      data: {
        submission: reef.id,
        channel: 'discussion',
        role: 'user',
        body: 'The protocol is the leftover. Do not send anyone back to print the old logger.',
        author: professor.id,
        authorName: 'Dr. Priya Raman',
      },
      overrideAccess: true,
    })
    await payload.create({
      collection: 'comments',
      data: {
        submission: reef.id,
        channel: 'discussion',
        role: 'user',
        body: 'Next harbor lab should keep the three stations and swap the sensor.',
        author: reviewer.id,
        authorName: 'Jordan Ellis',
      },
      overrideAccess: true,
    })
  }

  if (charging) {
    await payload.update({
      collection: 'files',
      id: ferryFile,
      data: {
        caption: 'Studio charging layout for a Governors Island slip. Waiting on review.',
        pageCount: 2,
        kind: 'primary',
      },
      overrideAccess: true,
    })
    await payload.create({
      collection: 'comments',
      data: {
        submission: charging.id,
        channel: 'discussion',
        role: 'user',
        body: 'Put the kW table in the handoff so the next studio does not hunt the PDF.',
        author: professor.id,
        authorName: 'Dr. Priya Raman',
      },
      overrideAccess: true,
    })
    await payload.create({
      collection: 'suggestions',
      data: {
        submission: charging.id,
        field: 'handoff',
        before:
          'Publish the ferry-slip load table. Next studio can size chargers from it. Do not restart the company.',
        after:
          'Next studio: take the kW-by-ferry table from the PDF, check it with the operator, then size chargers. Do not restart the company idea.',
        rationale: 'Make the reusable table the first sentence of the handoff.',
        status: 'proposed',
        proposedBy: professor.id,
        proposedByName: 'Dr. Priya Raman',
      },
      overrideAccess: true,
    })
  }

  payload.logger.info('Demo library is ready. Sign in with nyce-demo-2026.')
}
