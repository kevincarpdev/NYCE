export const howItWorks = [
  {
    step: '01',
    title: 'Leave it',
    body: 'Professors and students send in climate-tech research they are not taking forward. Word, Excel, decks, PDF, and video.',
  },
  {
    step: '02',
    title: 'Agree',
    body: 'A clear step on IP, ownership, and attribution. The record keeps who agreed and when.',
  },
  {
    step: '03',
    title: 'Review',
    body: 'A light queue. Publish, or send it back. Drafts never get a public link.',
  },
  {
    step: '04',
    title: 'Find it',
    body: 'Next semester browses a tagging taxonomy. Invited work stays invited. Public work is open.',
  },
] as const

export const audiences = [
  {
    role: 'Professor',
    name: 'Dr. Priya Raman',
    body: 'Leave a leftover with a student. Attribution stays on the page.',
    href: '/sign-in?role=professor',
    action: 'Try as Priya',
  },
  {
    role: 'Student',
    name: 'Amina Ruiz',
    body: 'Submit, iterate, and see notes when a reviewer sends work back.',
    href: '/sign-in?role=student',
    action: 'Try as Amina',
  },
  {
    role: 'Next semester',
    name: 'Leo Park',
    body: 'Find what last semester left behind on a problem.',
    href: '/sign-in?role=member',
    action: 'Try as Leo',
  },
  {
    role: 'Reviewer',
    name: 'Jordan Ellis',
    body: 'Open the Payload admin. Publish, or send it back.',
    href: '/sign-in?role=reviewer&reason=admin&next=/admin',
    action: 'Try as Jordan',
  },
] as const

export const topicIcons = {
  energy: 'lightning',
  'buildings-and-materials': 'buildings',
  mobility: 'train',
  'food-and-agriculture': 'plant',
  'water-and-coasts': 'waves',
  'carbon-and-measurement': 'cloud',
  'adaptation-and-resilience': 'shield',
  'climate-finance': 'bank',
  'data-and-software': 'database',
} as const

export type TopicIcon = (typeof topicIcons)[keyof typeof topicIcons]

export const faqs = [
  {
    q: 'Who is this hub for?',
    a: 'Professors and students at universities who are building climate-tech startups. They are invited to submit knowledge and research they have developed but do not intend to take forward, so next semester’s students and aspiring founders can find it.',
  },
  {
    q: 'Is this a rebuild of nyce.org?',
    a: 'No. This hub sits next to the public site. It is how leftover research is left, classified, and found.',
  },
  {
    q: 'What can I send in?',
    a: 'Word, Excel, decks, PDF, and video. Memos, protocols, term-sheet notes, and similar files about climate-tech work. Large science datasets stay with the data team.',
  },
  {
    q: 'How does ownership and attribution work?',
    a: 'Submitters agree to draft terms before a file is stored. The leftover page keeps the authors, university, and the date of agreement. Month 1 locks the real legal text with The Exchange.',
  },
  {
    q: 'What is public, and what stays invited?',
    a: 'Published public work can be opened without signing in. Invited work is listed so people know it exists. The body and file stay closed until you are allowed in. Drafts never appear in the library.',
  },
  {
    q: 'How do I look at this prototype?',
    a: 'Pick a role on the sign-in page and click Continue. Shared password is already filled. A five-minute walkthrough is linked from the top bar.',
  },
  {
    q: 'Does the assistant change published pages?',
    a: 'No. It proposes field edits. A person accepts them. Published pages do not change on their own. This is not a public chatbot.',
  },
  {
    q: 'How do accounts work later?',
    a: 'The pilot keeps the account list in the hub. When partners need a university login, we can attach Microsoft Entra, since The Exchange already uses Microsoft 365.',
  },
] as const

export const guidelines = {
  include: [
    'Research, memos, protocols, and decks you are not taking forward as a startup.',
    'Work a next-semester student could actually reuse: methods, failed paths, open questions.',
    'Word, Excel, PDF, decks, and video, grouped in a course, cohort, or lab.',
  ],
  exclude: [
    'Work you still intend to take forward as a company.',
    'Huge science datasets. Those stay with the data team.',
    'Anything you cannot attribute, or that you have not agreed to share.',
  ],
  review: [
    'A reviewer publishes or sends it back. Light, not a large internal workflow.',
    'Sensitivity, ownership, and attribution sit on the leftover from the start.',
    'A tagging taxonomy is how next semester browses instead of hunting.',
  ],
} as const
