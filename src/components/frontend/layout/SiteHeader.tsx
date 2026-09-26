'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { List, SignOut, X } from '@phosphor-icons/react'
import styled from 'styled-components'

import type { SessionUser } from '@/lib/session'
import { sessionFlags } from '@/lib/session'
import { signOutAction } from '@/lib/logout'
import { theme } from '@/theme/theme'

const Header = styled.header`
  background: ${({ theme }) => theme.colors.surface.raised};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.subtle};
`

const Shell = styled.div`
  width: min(100% - ${({ theme }) => theme.spacing(8)}, ${({ theme }) => theme.layout.maxWidth});
  margin-inline: auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: ${({ theme }) => theme.spacing(6)};
  }
`

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(6)};
  padding-block: ${({ theme }) => theme.spacing(4)};
`

const Brand = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(4)};
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
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.content.accent};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`

const Nav = styled.nav<{ $open: boolean }>`
  display: ${({ $open }) => ($open ? 'flex' : 'none')};
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
  padding-bottom: ${({ theme }) => theme.spacing(6)};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 0;
  }
`

const NavLink = styled(Link)`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
`

const MenuButton = styled.button`
  background: transparent;
  border: 0;
  color: ${({ theme }) => theme.colors.content.accent};
  display: inline-flex;
  padding: ${({ theme }) => theme.spacing(2)};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`

const Ghost = styled.button`
  background: transparent;
  border: 0;
  color: inherit;
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  cursor: pointer;
`

type HeaderProps = {
  user: SessionUser | null
}

const SiteHeaderComponent = ({ user }: HeaderProps) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const flags = sessionFlags(user)

  const signOut = async () => {
    await signOutAction()
    router.refresh()
    router.push('/')
  }

  return (
    <Header>
      <Shell>
        <Row>
          <Brand href="/">
            <Logo alt="The New York Climate Exchange" src="/nyce-logo.png" />
            <Wordmark>Knowledge Hub</Wordmark>
          </Brand>
          <MenuButton aria-label="Menu" onClick={() => setOpen((value) => !value)} type="button">
            {open ? <X size={theme.icons.lg} /> : <List size={theme.icons.lg} />}
          </MenuButton>
        </Row>
        <Nav $open={open}>
          <NavLink href="/library">Library</NavLink>
          {flags.canSubmit ? <NavLink href="/submit">Submit</NavLink> : null}
          {flags.canSubmit ? <NavLink href="/mine">My submissions</NavLink> : null}
          <NavLink href="/walkthrough">Walkthrough</NavLink>
          {flags.canReview ? <NavLink href="/admin">Admin</NavLink> : null}
          {user ? (
            <Ghost onClick={signOut} type="button">
              <SignOut size={theme.icons.sm} />
              {user.name}
            </Ghost>
          ) : (
            <NavLink href="/sign-in">Sign in</NavLink>
          )}
        </Nav>
      </Shell>
    </Header>
  )
}

export const SiteHeader = React.memo(SiteHeaderComponent)
SiteHeader.displayName = 'SiteHeader'
