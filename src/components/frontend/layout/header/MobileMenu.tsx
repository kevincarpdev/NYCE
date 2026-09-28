'use client'

import React from 'react'
import Link from 'next/link'
import { X } from '@phosphor-icons/react'
import styled from 'styled-components'

import { Button } from '@/components/frontend/ui/Button'
import { hubNav } from '@/lib/navigation'
import type { SessionUser } from '@/lib/session'
import { sessionFlags } from '@/lib/session'
import { theme } from '@/theme/theme'

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.colors.surface.brand};
  color: ${({ theme }) => theme.colors.content.inverse};
  z-index: ${({ theme }) => theme.zIndex.menu};
  overflow: auto;
  padding: ${({ theme }) => theme.spacing(8)};
  display: grid;
  gap: ${({ theme }) => theme.spacing(8)};
  align-content: start;
`

const Top = styled.div`
  display: flex;
  justify-content: flex-end;
`

const Close = styled.button`
  background: transparent;
  border: 0;
  color: ${({ theme }) => theme.colors.content.inverse};
  cursor: pointer;
`

const Group = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(3)};
`

const Label = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.surface.gold};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`

const Entry = styled(Link)`
  font-size: ${({ theme }) => theme.typography.fontSizes.section};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  line-height: ${({ theme }) => theme.typography.lineHeights.tight};
`

type MobileMenuProps = {
  user: SessionUser | null
  onClose: () => void
  onSignOut: () => void
}

const MobileMenuComponent = ({ user, onClose, onSignOut }: MobileMenuProps) => {
  const flags = sessionFlags(user)

  return (
    <Overlay>
      <Top>
        <Close aria-label="Close menu" onClick={onClose} type="button">
          <X size={theme.icons.lg} />
        </Close>
      </Top>
      {hubNav.map((group) => (
        <Group key={group.label}>
          <Label>{group.label}</Label>
          {group.items.map((item) => (
            <Entry href={item.href} key={item.href} onClick={onClose}>
              {item.label}
            </Entry>
          ))}
        </Group>
      ))}
      {flags.canReview ? (
        <Entry href="/admin" onClick={onClose}>
          Admin
        </Entry>
      ) : null}
      {user ? (
        <Button onClick={onSignOut} size="lg" variant="ghost">
          Sign out {user.name}
        </Button>
      ) : (
        <Button href="/sign-in" size="lg" variant="gold">
          Sign in
        </Button>
      )}
    </Overlay>
  )
}

export const MobileMenu = React.memo(MobileMenuComponent)
MobileMenu.displayName = 'MobileMenu'
