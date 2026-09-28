'use client'

import styled, { css } from 'styled-components'

export const fieldControl = css`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.colors.border.subtle};
  background: ${({ theme }) => theme.colors.surface.raised};
  color: ${({ theme }) => theme.colors.content.primary};
  padding: ${({ theme }) => theme.spacing(3)};
  font: inherit;
  border-radius: ${({ theme }) => theme.radii.none};
  transition:
    border-color ${({ theme }) => theme.motion.fade} ${({ theme }) => theme.motion.out},
    box-shadow ${({ theme }) => theme.motion.fade} ${({ theme }) => theme.motion.out};

  &:hover:not(:disabled):not(:focus) {
    border-color: ${({ theme }) => theme.colors.border.strong};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.border.strong};
    box-shadow: 0 0 0 ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.colors.focus.ring};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.content.muted};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: ${({ theme }) => theme.opacity.disabled};
  }
`

export const fieldArea = css`
  ${fieldControl};
  min-height: ${({ theme }) => theme.layout.areaMin};
  resize: vertical;
`

export const Control = styled.input`
  ${fieldControl};
`

export const Area = styled.textarea`
  ${fieldArea};
`

export const Select = styled.select`
  ${fieldControl};
`
