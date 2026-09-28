'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import styled from 'styled-components'

import type { SessionUser } from '@/lib/session'
import { AnnouncementBar } from '@/components/frontend/layout/AnnouncementBar'
import { SiteFooter } from '@/components/frontend/layout/SiteFooter'
import { SiteHeader } from '@/components/frontend/layout/SiteHeader'

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const Main = styled.main<{ $auth: boolean }>`
  flex: 1;
  display: ${({ $auth }) => ($auth ? 'flex' : 'block')};
  flex-direction: column;
`

type ChromeProps = {
  user: SessionUser | null
  children: React.ReactNode
}

const SiteChromeComponent = ({ user, children }: ChromeProps) => {
  const pathname = usePathname()
  const isAuth = pathname === '/sign-in'

  return (
    <Page>
      <AnnouncementBar />
      {isAuth ? null : <SiteHeader user={user} />}
      <Main $auth={isAuth}>{children}</Main>
      {isAuth ? null : <SiteFooter />}
    </Page>
  )
}

export const SiteChrome = React.memo(SiteChromeComponent)
SiteChrome.displayName = 'SiteChrome'
