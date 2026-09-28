'use client'

import styled from 'styled-components'

import { Area, Control, Select } from '@/components/frontend/ui/controls'

export { Area, Control, Select }

export const Form = styled.form`
  display: grid;
  gap: ${({ theme }) => theme.spacing(10)};
`

export const Block = styled.fieldset`
  border: 0;
  margin: 0;
  padding: 0;
  display: grid;
  gap: ${({ theme }) => theme.spacing(4)};
`

export const Legend = styled.legend`
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`

export const Field = styled.label`
  display: grid;
  gap: ${({ theme }) => theme.spacing(2)};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
`

export const Legal = styled.pre`
  white-space: pre-wrap;
  background: ${({ theme }) => theme.colors.surface.wash};
  padding: ${({ theme }) => theme.spacing(4)};
  font-family: ${({ theme }) => theme.typography.fontFamily.sans};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  line-height: ${({ theme }) => theme.typography.lineHeights.body};
`

export const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.status.returned};
`

export const Row = styled.label`
  display: flex;
  gap: ${({ theme }) => theme.spacing(3)};
  align-items: flex-start;
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`
