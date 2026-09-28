import React from 'react'
import { Onest } from 'next/font/google'
import type { Metadata } from 'next'

import { SiteChrome } from '@/components/frontend/layout/SiteChrome'
import { getSessionUser } from '@/lib/payload'
import { StyledComponentsRegistry } from '@/theme/registry'

const onest = Onest({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-onest',
  display: 'swap',
})

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Knowledge Hub — The New York Climate Exchange',
  description:
    'A prototype library where professors and students leave climate-tech research they are not taking forward, so next semester can find it.',
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser()

  return (
    <html className={onest.variable} lang="en">
      <body>
        <StyledComponentsRegistry>
          <SiteChrome user={user}>{children}</SiteChrome>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
