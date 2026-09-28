export const proposal = {
  title: 'Knowledge Hub',
  client: 'The New York Climate Exchange',
  preparedFor: 'Shaina Horowitz, Director of Program Innovation and Acceleration',
  preparedBy: 'Kevin Carpenter',
  date: '28 September 2026',
  demo: 'https://hub.2.29.15.99.sslip.io',
  fee: '$42,000',
  feeNumber: 42000,
  launch: '18 December 2026',
  supportThrough: 'July 2027',
  kickoff: 'week of 5 October 2026',
  validDays: 30,
  password: 'nyce-demo-2026',
} as const

export const glance = [
  { label: 'Flat fee', value: '$42,000' },
  { label: 'Live leftovers', value: '18 December 2026' },
  { label: 'Support through', value: 'July 2027' },
  { label: 'Prototype', value: 'https://hub.2.29.15.99.sslip.io' },
] as const

export const postingMap = [
  {
    item: 'Front-end platform to browse, search, and filter',
    status: 'Shown',
    note: 'Library, topic chips, search, project grouping. Live at /library.',
  },
  {
    item: 'Backend schema The Exchange can access',
    status: 'Shown',
    note: 'Payload collections for leftovers, files, topics, projects, users. Reviewer admin at /admin.',
  },
  {
    item: 'Submission portal with large files and IP acknowledgement',
    status: 'Shown',
    note: 'Form for Word, Excel, decks, PDF, and video. Draft agreement with a stored record of who agreed and when.',
  },
  {
    item: 'Lightweight review routing',
    status: 'Shown',
    note: 'Publish or send back in Payload. Status appears in the library.',
  },
  {
    item: 'Roles, permissions, and secure login',
    status: 'Shown',
    note: 'Student, professor, next-semester member, reviewer. Invited leftovers stay closed. Drafts have no public link.',
  },
  {
    item: 'Search by tagging or AI',
    status: 'Shown',
    note: 'Starting taxonomy of nine topics. An assistant that proposes edits, off the critical path.',
  },
  {
    item: 'Recommendations and rough costs for what comes next',
    status: 'Month 10',
    note: 'Written note at the end of the engagement, with running costs.',
  },
] as const

export const emailMap = [
  {
    item: 'Professors and students, not an internal Exchange tool',
    status: 'Shown',
    note: 'Sign-in roles and leftover copy match the 8 September note.',
  },
  {
    item: 'Sensitivity, ownership, and attribution',
    status: 'Partly shown',
    note: 'Agreement step and attribution on the leftover. Final legal text is a Month 1 decision.',
  },
  {
    item: 'Tagging taxonomy',
    status: 'Shown',
    note: 'Nine topics on the prototype. Month 1 locks names with you and Megha.',
  },
] as const

export const timeline = [
  {
    when: 'Weeks 1–2',
    title: 'Lock the list',
    body: 'Sample files, what is in and out, public vs invited, the agreement text, the taxonomy starting point, and Amazon or Microsoft for the $200 credit.',
  },
  {
    when: 'Weeks 3–8',
    title: 'Build on the prototype',
    body: 'Iterate the library, the form, review, accounts, and the first real files. Weekly check-ins, Eastern time.',
  },
  {
    when: 'Weeks 9–10',
    title: 'QA and training',
    body: 'Load the first real batch. Fix what only real Excel and PDFs break. Show staff how to run it.',
  },
  {
    when: 'By 18 December',
    title: 'Live',
    body: 'Professors can leave end-of-semester work. Spring students can find it in January.',
  },
  {
    when: 'January–May',
    title: 'Light on-call',
    body: 'As in the posting. Several hours only if something breaks.',
  },
  {
    when: 'May–July',
    title: 'Go-live help',
    body: 'More files, workflow tweaks, and a short written note on what to build next, with rough costs.',
  },
] as const

export const alreadyShows = [
  'Browse and search with a starting taxonomy',
  'Submit with a draft IP and attribution agreement',
  'Light review in Payload: publish or send back',
  'Files grouped in a course, a cohort, or a lab',
  'Public vs invited. Unpublished files have no public link',
  'Workspace: file preview, notes, suggested edits, versions',
  'The Exchange brand on the pages people see',
] as const

export const tenMonthsAdd = [
  'The real in/out list, taxonomy, and agreement language',
  'The first real batch of leftover files',
  'University sign-in (Microsoft Entra) when you want it',
  'US hosting, backups, and a bill cap',
  'Staff training so the hub runs without me',
  'Light support through the academic year',
  'A written note on the next build, with costs',
] as const

export const included = [
  'The platform described in the posting, as a 10-month engagement',
  'A working prototype now, iterated with you instead of a long Figma phase',
  'Weekly check-ins in Eastern time during the build',
  'Training and a short written handoff',
] as const

export const notIncluded = [
  'A rebuild of nyce.org',
  'University SSO until Month 1 chooses the credit and the front door',
  'Hosting beyond the $20–60/month envelope already quoted',
  'A public chatbot',
] as const

export const running = [
  { item: 'Payload CMS', cost: '$0' },
  { item: 'Small server, database, and documents after the $200 credit', cost: '$20–60 / month' },
  { item: 'Staff assistant, only if turned on', cost: '$20–100 / month' },
  { item: 'Pilot login', cost: '$0' },
] as const

export const about = [
  'Independent developer. Government, health, and regulated work.',
  'Available in Eastern time. Can start the week of 5 October.',
  'I built the attached prototype in a few hours from our call and your notes.',
] as const

export const terms = [
  'The Exchange owns the work produced under this engagement.',
  'Unpublished leftovers, agreements, and personal stories stay confidential.',
  'Either party may end the work with 14 days’ written notice. Paid milestones stand for work already delivered.',
  'This page is an offer. I am happy to sign The Exchange’s own consultant agreement instead.',
] as const

export const teamTime = [
  'Weeks 1–2: sample files and the agreement text you want people to agree to.',
  'After that: about an hour a week, Eastern time, to react to the working hub.',
] as const
