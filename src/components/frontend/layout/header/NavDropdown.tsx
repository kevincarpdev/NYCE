'use client'

import React, { useEffect, useId, useRef, useState } from 'react'
import Link from 'next/link'
import { CaretDown } from '@phosphor-icons/react'
import styled from 'styled-components'

import type { NavGroup } from '@/lib/navigation'
import { theme } from '@/theme/theme'

const Item = styled.div`
  position: relative;
`

const Trigger = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  background: transparent;
  border: 0;
  color: ${({ theme }) => theme.colors.content.inverse};
  font-size: ${({ theme }) => theme.typography.fontSizes.nav};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  cursor: pointer;
  padding-block: ${({ theme }) => theme.spacing(2)};
  transition: color ${({ theme }) => theme.motion.fade} ${({ theme }) => theme.motion.out};

  &:hover,
  &[aria-expanded='true'] {
    color: ${({ theme }) => theme.colors.surface.gold};
  }
`

const Panel = styled.div<{ $open: boolean }>`
  display: ${({ $open }) => ($open ? 'grid' : 'none')};
  position: absolute;
  top: 100%;
  right: 0;
  min-width: ${({ theme }) => theme.layout.dropdownMin};
  background: ${({ theme }) => theme.colors.surface.brand};
  border: 1px solid ${({ theme }) => theme.colors.surface.canvas};
  padding: ${({ theme }) => theme.spacing(3)};
  z-index: ${({ theme }) => theme.zIndex.nav};
`

const Entry = styled(Link)`
  color: ${({ theme }) => theme.colors.content.inverse};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  padding: ${({ theme }) => theme.spacing(3)};
  transition: background-color ${({ theme }) => theme.motion.fade} ${({ theme }) => theme.motion.out};

  &:hover {
    background: ${({ theme }) => theme.colors.surface.ink};
  }
`

type NavDropdownProps = {
  group: NavGroup
}

const NavDropdownComponent = ({ group }: NavDropdownProps) => {
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const menuId = useId()

  useEffect(() => {
    const onPointer = (event: MouseEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <Item
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false)
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      ref={root}
    >
      <Trigger
        aria-controls={menuId}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        {group.label}
        <CaretDown size={theme.icons.sm} />
      </Trigger>
      <Panel $open={open} id={menuId} role="menu">
        {group.items.map((item) => (
          <Entry href={item.href} key={item.href} role="menuitem">
            {item.label}
          </Entry>
        ))}
      </Panel>
    </Item>
  )
}

export const NavDropdown = React.memo(NavDropdownComponent)
NavDropdown.displayName = 'NavDropdown'
