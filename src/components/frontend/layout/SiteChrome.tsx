'use client'

import React from 'react'
import styled from 'styled-components'

import type { SessionUser } from '@/lib/session'
import { PrototypeBanner } from '@/components/frontend/layout/PrototypeBanner'
import { SiteFooter } from '@/components/frontend/layout/SiteFooter'
import { SiteHeader } from '@/components/frontend/layout/SiteHeader'

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const Main = styled.main`
  flex: 1;
`

type ChromeProps = {
  user: SessionUser | null
  children: React.ReactNode
}

const SiteChromeComponent = ({ user, children }: ChromeProps) => (
  <Page>
    <PrototypeBanner />
    <SiteHeader user={user} />
    <Main>{children}</Main>
    <SiteFooter />
  </Page>
)

export const SiteChrome = React.memo(SiteChromeComponent)
SiteChrome.displayName = 'SiteChrome'
