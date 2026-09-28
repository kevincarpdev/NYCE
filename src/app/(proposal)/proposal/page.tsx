import fs from 'fs'
import path from 'path'
import type { Metadata } from 'next'

import { ProposalDoc } from '@/components/proposal/ProposalDoc'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Knowledge Hub proposal',
  robots: { index: false, follow: false },
}

const captions: Record<string, string> = {
  'home.png': 'Home: leftover library beside nyce.org',
  'library.png': 'Library: browse, search, taxonomy',
  'signin.png': 'Sign in: pick a role and continue',
  'leftover.png': 'A leftover: attribution on the record',
  'admin.png': 'Reviewer admin in Payload',
}

const order = ['home.png', 'library.png', 'signin.png', 'leftover.png', 'admin.png']

export default function ProposalPage() {
  const dir = path.join(process.cwd(), 'proposal', 'shots')
  const shots = fs.existsSync(dir)
    ? order
        .filter((name) => fs.existsSync(path.join(dir, name)))
        .map((name) => {
          const file = fs.readFileSync(path.join(dir, name))
          return {
            src: `data:image/png;base64,${file.toString('base64')}`,
            caption: captions[name] || name,
          }
        })
    : []

  return <ProposalDoc shots={shots} />
}
