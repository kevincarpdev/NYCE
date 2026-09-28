'use client'

import React from 'react'
import {
  ChalkboardTeacher,
  Check,
  Compass,
  GraduationCap,
  ShieldCheck,
} from '@phosphor-icons/react'
import styled from 'styled-components'

import type { DemoAccount, DemoIcon } from '@/lib/demo'
import { demoAccounts } from '@/lib/demo'
import { theme } from '@/theme/theme'

const icons: Record<DemoIcon, typeof GraduationCap> = {
  graduation: GraduationCap,
  chalkboard: ChalkboardTeacher,
  compass: Compass,
  shield: ShieldCheck,
}

const Group = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(3)};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
  }
`

const Tile = styled.button<{ $selected: boolean }>`
  position: relative;
  display: grid;
  gap: ${({ theme }) => theme.spacing(1)};
  text-align: left;
  background: ${({ theme }) => theme.colors.surface.raised};
  border: 1px solid
    ${({ theme, $selected }) =>
      $selected ? theme.colors.border.strong : theme.colors.border.subtle};
  padding: ${({ theme }) => theme.spacing(4)};
  cursor: pointer;
  color: inherit;
  transition:
    border-color ${({ theme }) => theme.motion.fade} ${({ theme }) => theme.motion.out},
    background-color ${({ theme }) => theme.motion.fade} ${({ theme }) => theme.motion.out};

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.border.strong};
    background: ${({ theme }) => theme.colors.surface.wash};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: ${({ theme }) => theme.opacity.disabled};
  }
`

const Role = styled.span`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.content.accent};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
`

const Hint = styled.span`
  color: ${({ theme }) => theme.colors.content.muted};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`

const Dest = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.content.muted};
`

const Mark = styled.span`
  position: absolute;
  top: ${({ theme }) => theme.spacing(3)};
  right: ${({ theme }) => theme.spacing(3)};
  color: ${({ theme }) => theme.colors.surface.gold};
`

type RolePickerProps = {
  selected: DemoAccount
  onSelect: (account: DemoAccount) => void
  disabled?: boolean
}

const RolePickerComponent = ({ selected, onSelect, disabled }: RolePickerProps) => (
  <Group aria-label="Demo role" role="radiogroup">
    {demoAccounts.map((account) => {
      const Icon = icons[account.icon]
      const isSelected = account.email === selected.email
      return (
        <Tile
          $selected={isSelected}
          aria-checked={isSelected}
          disabled={disabled}
          key={account.email}
          onClick={() => onSelect(account)}
          role="radio"
          type="button"
        >
          <Role>
            <Icon size={theme.icons.md} />
            {account.role}
          </Role>
          <strong>{account.name}</strong>
          <Hint>{account.hint}</Hint>
          <Dest>Takes you to {account.destination}</Dest>
          {isSelected ? (
            <Mark>
              <Check size={theme.icons.md} weight="bold" />
            </Mark>
          ) : null}
        </Tile>
      )
    })}
  </Group>
)

export const RolePicker = React.memo(RolePickerComponent)
RolePicker.displayName = 'RolePicker'
