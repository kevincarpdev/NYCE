export const DEMO_PASSWORD = 'nyce-demo-2026'

export const demoAccounts = [
  {
    email: 'student@nyce.demo',
    name: 'Amina Ruiz',
    role: 'Student',
    hint: 'Iterate on leftover research',
    href: '/library/charging-at-the-ferry-slip/workspace',
    icon: 'graduation',
    destination: 'Workspace',
  },
  {
    email: 'professor@nyce.demo',
    name: 'Dr. Priya Raman',
    role: 'Professor',
    hint: 'Edit a leftover with a student',
    href: '/library/charging-at-the-ferry-slip/workspace',
    icon: 'chalkboard',
    destination: 'Workspace',
  },
  {
    email: 'member@nyce.demo',
    name: 'Leo Park',
    role: 'Next semester',
    hint: 'Find what last semester left behind',
    href: '/library',
    icon: 'compass',
    destination: 'Library',
  },
  {
    email: 'reviewer@nyce.demo',
    name: 'Jordan Ellis',
    role: 'Reviewer',
    hint: 'Open the Payload admin',
    href: '/admin/collections/submissions',
    icon: 'shield',
    destination: 'Admin review queue',
  },
] as const

export type DemoAccount = (typeof demoAccounts)[number]
export type DemoIcon = DemoAccount['icon']

export const reviewerAccount = demoAccounts.find((account) => account.role === 'Reviewer')!
