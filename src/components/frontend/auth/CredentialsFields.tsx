'use client'

import React from 'react'
import styled from 'styled-components'

import { Control } from '@/components/frontend/ui/controls'

const Details = styled.details`
  border-top: 1px solid ${({ theme }) => theme.colors.border.subtle};
  padding-top: ${({ theme }) => theme.spacing(4)};
`

const Summary = styled.summary`
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.content.accent};
  transition: color ${({ theme }) => theme.motion.fade} ${({ theme }) => theme.motion.out};

  &:hover {
    color: ${({ theme }) => theme.colors.surface.ink};
  }
`

const Fields = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(4)};
  margin-top: ${({ theme }) => theme.spacing(4)};
`

const Field = styled.label`
  display: grid;
  gap: ${({ theme }) => theme.spacing(2)};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
`

type CredentialsFieldsProps = {
  email: string
  password: string
  onEmail: (value: string) => void
  onPassword: (value: string) => void
}

const CredentialsFieldsComponent = ({
  email,
  password,
  onEmail,
  onPassword,
}: CredentialsFieldsProps) => (
  <Details>
    <Summary>Use email and password</Summary>
    <Fields>
      <Field>
        Email
        <Control
          autoComplete="username"
          id="field-email"
          name="email"
          onChange={(event) => onEmail(event.target.value)}
          type="email"
          value={email}
        />
      </Field>
      <Field>
        Password
        <Control
          autoComplete="current-password"
          id="field-password"
          name="password"
          onChange={(event) => onPassword(event.target.value)}
          type="password"
          value={password}
        />
      </Field>
    </Fields>
  </Details>
)

export const CredentialsFields = React.memo(CredentialsFieldsComponent)
CredentialsFields.displayName = 'CredentialsFields'
