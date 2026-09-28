'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { List } from '@phosphor-icons/react'
import styled from 'styled-components'

import { HeaderNav } from '@/components/frontend/layout/header/HeaderNav'
import { MobileMenu } from '@/components/frontend/layout/header/MobileMenu'
import { pageWidth } from '@/components/frontend/layout/Containers'
import type { SessionUser } from '@/lib/session'
import { signOutAction } from '@/lib/logout'
import { hubCopy } from '@/lib/brand'
import { theme } from '@/theme/theme'

const Header = styled.header`
  background: ${({ theme }) => theme.colors.surface.brand};
  color: ${({ theme }) => theme.colors.content.inverse};
`

const Shell = styled.div`
  ${pageWidth};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(8)};
  padding-block: ${({ theme }) => theme.spacing(6)};
`

const Brand = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(5)};
  min-width: 0;
`

const Logo = styled.img`
  width: ${({ theme }) => `${theme.layout.logoWidthMobile}px`};
  height: auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: ${({ theme }) => `${theme.layout.logoWidth}px`};
  }
`

const Wordmark = styled.span`
  display: none;
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.surface.gold};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`

const MenuButton = styled.button`
  background: transparent;
  border: 0;
  color: ${({ theme }) => theme.colors.content.inverse};
  display: inline-flex;
  padding: ${({ theme }) => theme.spacing(2)};
  cursor: pointer;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`

type HeaderProps = {
  user: SessionUser | null
}

const SiteHeaderComponent = ({ user }: HeaderProps) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const signOut = async () => {
    await signOutAction()
    setOpen(false)
    router.refresh()
    router.push('/')
  }

  return (
    <Header>
      <Shell>
        <Brand href="/">
          <Logo alt="The New York Climate Exchange" src="/nyce-logo.png" />
          <Wordmark>{hubCopy.wordmark}</Wordmark>
        </Brand>
        <HeaderNav onSignOut={() => void signOut()} user={user} />
        <MenuButton aria-label="Menu" onClick={() => setOpen(true)} type="button">
          <List size={theme.icons.lg} />
        </MenuButton>
      </Shell>
      {open ? (
        <MobileMenu onClose={() => setOpen(false)} onSignOut={() => void signOut()} user={user} />
      ) : null}
    </Header>
  )
}

export const SiteHeader = React.memo(SiteHeaderComponent)
SiteHeader.displayName = 'SiteHeader'
