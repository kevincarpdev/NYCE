'use client'

import React from 'react'
import Link from 'next/link'
import styled, { css } from 'styled-components'

const shared = css<{ $size: 'md' | 'lg' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(2)};
  border-radius: ${({ theme }) => theme.radii.none};
  padding: ${({ theme, $size }) =>
    $size === 'lg'
      ? `${theme.spacing(6)} ${theme.spacing(9)}`
      : `${theme.spacing(3)} ${theme.spacing(5)}`};
  font-size: ${({ theme, $size }) =>
    $size === 'lg' ? theme.typography.fontSizes.button : theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  text-transform: uppercase;
  cursor: pointer;
  border: 1px solid transparent;
  transition:
    background-color ${({ theme }) => theme.motion.fade} ${({ theme }) => theme.motion.out},
    color ${({ theme }) => theme.motion.fade} ${({ theme }) => theme.motion.out},
    border-color ${({ theme }) => theme.motion.fade} ${({ theme }) => theme.motion.out},
    box-shadow ${({ theme }) => theme.motion.fade} ${({ theme }) => theme.motion.out};

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.colors.focus.ring};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: ${({ theme }) => theme.opacity.disabled};
  }
`

const primary = css`
  background: ${({ theme }) => theme.colors.surface.brand};
  color: ${({ theme }) => theme.colors.content.inverse};
  border-color: ${({ theme }) => theme.colors.surface.brand};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.surface.ink};
    border-color: ${({ theme }) => theme.colors.surface.ink};
  }
`

const gold = css`
  background: ${({ theme }) => theme.colors.surface.gold};
  color: ${({ theme }) => theme.colors.content.accent};
  border-color: ${({ theme }) => theme.colors.surface.gold};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.surface.brand};
    color: ${({ theme }) => theme.colors.content.inverse};
    border-color: ${({ theme }) => theme.colors.surface.brand};
  }
`

const ghost = css`
  background: transparent;
  color: ${({ theme }) => theme.colors.content.inverse};
  border-color: ${({ theme }) => theme.colors.content.inverse};
  border-width: ${({ theme }) => theme.layout.ctaBorder};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.surface.gold};
    color: ${({ theme }) => theme.colors.content.accent};
    border-color: ${({ theme }) => theme.colors.surface.gold};
  }
`

const ink = css`
  background: ${({ theme }) => theme.colors.surface.raised};
  color: ${({ theme }) => theme.colors.content.accent};
  border-color: ${({ theme }) => theme.colors.border.strong};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.surface.brand};
    color: ${({ theme }) => theme.colors.content.inverse};
    border-color: ${({ theme }) => theme.colors.surface.brand};
  }
`

const variants = { primary, gold, ghost, ink }

const ButtonEl = styled.button<{ $variant: keyof typeof variants; $size: 'md' | 'lg' }>`
  ${shared};
  ${({ $variant }) => variants[$variant]};
`

const LinkEl = styled(Link)<{ $variant: keyof typeof variants; $size: 'md' | 'lg' }>`
  ${shared};
  ${({ $variant }) => variants[$variant]};
`

const AnchorEl = styled.a<{ $variant: keyof typeof variants; $size: 'md' | 'lg' }>`
  ${shared};
  ${({ $variant }) => variants[$variant]};
`

type ButtonProps = {
  children: React.ReactNode
  variant?: keyof typeof variants
  size?: 'md' | 'lg'
  href?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  onClick?: () => void
}

const ButtonComponent = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  type = 'button',
  disabled,
  onClick,
}: ButtonProps) => {
  if (href) {
    if (href.startsWith('http') || href.startsWith('mailto:')) {
      return (
        <AnchorEl $size={size} $variant={variant} href={href} rel="noreferrer" target="_blank">
          {children}
        </AnchorEl>
      )
    }
    return (
      <LinkEl $size={size} $variant={variant} href={href}>
        {children}
      </LinkEl>
    )
  }
  return (
    <ButtonEl $size={size} $variant={variant} disabled={disabled} onClick={onClick} type={type}>
      {children}
    </ButtonEl>
  )
}

export const Button = React.memo(ButtonComponent)
Button.displayName = 'Button'
