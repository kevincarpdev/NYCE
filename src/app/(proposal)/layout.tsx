import React from 'react'
import type { Metadata } from 'next'
import { Onest } from 'next/font/google'
import { notFound } from 'next/navigation'

import { StyledComponentsRegistry } from '@/theme/registry'

const onest = Onest({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-onest',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Knowledge Hub proposal — The New York Climate Exchange',
  robots: { index: false, follow: false },
}

const ProposalLayout = ({ children }: { children: React.ReactNode }) => {
  if (process.env.NODE_ENV === 'production') notFound()

  return (
    <html className={onest.variable} lang="en">
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  )
}

export default ProposalLayout
