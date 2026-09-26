export const DEMO_PASSWORD = 'nyce-demo-2026'

export const demoAccounts = [
  {
    email: 'student@nyce.demo',
    name: 'Amina Ruiz',
    role: 'Student',
    hint: 'Submit leftover research',
    href: '/submit',
  },
  {
    email: 'professor@nyce.demo',
    name: 'Dr. Priya Raman',
    role: 'Professor',
    hint: 'Browse and submit with a lab',
    href: '/library',
  },
  {
    email: 'member@nyce.demo',
    name: 'Leo Park',
    role: 'Next semester',
    hint: 'Find what last semester left behind',
    href: '/library',
  },
  {
    email: 'reviewer@nyce.demo',
    name: 'Jordan Ellis',
    role: 'Reviewer',
    hint: 'Open the Payload admin',
    href: '/admin/collections/submissions',
  },
] as const
