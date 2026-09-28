'use client'

import React from 'react'
import styled from 'styled-components'

import { AccountMenu } from '@/components/frontend/layout/header/AccountMenu'
import { NavDropdown } from '@/components/frontend/layout/header/NavDropdown'
import { hubNav } from '@/lib/navigation'
import type { SessionUser } from '@/lib/session'

const Row = styled.div`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: ${({ theme }) => theme.spacing(8)};
  }
`

type HeaderNavProps = {
  user: SessionUser | null
  onSignOut: () => void
}

const HeaderNavComponent = ({ user, onSignOut }: HeaderNavProps) => (
  <Row>
    {hubNav.map((group) => (
      <NavDropdown group={group} key={group.label} />
    ))}
    <AccountMenu onSignOut={onSignOut} user={user} />
  </Row>
)

export const HeaderNav = React.memo(HeaderNavComponent)
HeaderNav.displayName = 'HeaderNav'
