'use client'

import React from 'react'
import Link from 'next/link'
import styled, { css } from 'styled-components'

const shared = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(2)};
  border-radius: ${({ theme }) => theme.radii.none};
  padding: ${({ theme }) => `${theme.spacing(3)} ${theme.spacing(5)}`};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  text-transform: uppercase;
  cursor: pointer;
  border: 1px solid transparent;
`

const primary = css`
  ${shared};
  background: ${({ theme }) => theme.colors.surface.brand};
  color: ${({ theme }) => theme.colors.content.inverse};
  border-color: ${({ theme }) => theme.colors.surface.brand};
`

const gold = css`
  ${shared};
  background: ${({ theme }) => theme.colors.surface.gold};
  color: ${({ theme }) => theme.colors.surface.ink};
  border-color: ${({ theme }) => theme.colors.surface.gold};
`

const ghost = css`
  ${shared};
  background: transparent;
  color: ${({ theme }) => theme.colors.content.inverse};
  border-color: ${({ theme }) => theme.colors.content.inverse};
`

const ink = css`
  ${shared};
  background: ${({ theme }) => theme.colors.surface.raised};
  color: ${({ theme }) => theme.colors.content.accent};
  border-color: ${({ theme }) => theme.colors.border.strong};
`

const variants = { primary, gold, ghost, ink }

const ButtonEl = styled.button<{ $variant: keyof typeof variants }>`
  ${({ $variant }) => variants[$variant]};
`

const LinkEl = styled(Link)<{ $variant: keyof typeof variants }>`
  ${({ $variant }) => variants[$variant]};
`

type ButtonProps = {
  children: React.ReactNode
  variant?: keyof typeof variants
  href?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  onClick?: () => void
}

const ButtonComponent = ({
  children,
  variant = 'primary',
  href,
  type = 'button',
  disabled,
  onClick,
}: ButtonProps) => {
  if (href) {
    return (
      <LinkEl $variant={variant} href={href}>
        {children}
      </LinkEl>
    )
  }
  return (
    <ButtonEl $variant={variant} disabled={disabled} onClick={onClick} type={type}>
      {children}
    </ButtonEl>
  )
}

export const Button = React.memo(ButtonComponent)
Button.displayName = 'Button'
