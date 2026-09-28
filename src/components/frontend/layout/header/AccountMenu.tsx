'use client'

import React from 'react'
import Link from 'next/link'
import { SignOut } from '@phosphor-icons/react'
import styled from 'styled-components'

import { Button } from '@/components/frontend/ui/Button'
import type { SessionUser } from '@/lib/session'
import { sessionFlags } from '@/lib/session'
import { theme } from '@/theme/theme'

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(5)};
`

const Ghost = styled.button`
  background: transparent;
  border: 0;
  color: ${({ theme }) => theme.colors.content.inverse};
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  font-size: ${({ theme }) => theme.typography.fontSizes.nav};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  cursor: pointer;
  transition: color ${({ theme }) => theme.motion.fade} ${({ theme }) => theme.motion.out};

  &:hover {
    color: ${({ theme }) => theme.colors.surface.gold};
  }
`

const Quiet = styled(Link)`
  color: ${({ theme }) => theme.colors.content.inverse};
  font-size: ${({ theme }) => theme.typography.fontSizes.nav};
  transition: color ${({ theme }) => theme.motion.fade} ${({ theme }) => theme.motion.out};

  &:hover {
    color: ${({ theme }) => theme.colors.surface.gold};
  }
`

type AccountMenuProps = {
  user: SessionUser | null
  onSignOut: () => void
}

const AccountMenuComponent = ({ user, onSignOut }: AccountMenuProps) => {
  const flags = sessionFlags(user)

  if (!user) {
    return (
      <Button href="/sign-in" size="lg" variant="ghost">
        Sign in
      </Button>
    )
  }

  return (
    <Row>
      {flags.canReview ? <Quiet href="/admin">Admin</Quiet> : null}
      <Ghost onClick={onSignOut} type="button">
        <SignOut size={theme.icons.sm} />
        {user.name}
      </Ghost>
    </Row>
  )
}

export const AccountMenu = React.memo(AccountMenuComponent)
AccountMenu.displayName = 'AccountMenu'
