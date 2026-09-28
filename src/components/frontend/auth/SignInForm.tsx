'use client'

import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import styled from 'styled-components'

import { CredentialsFields } from '@/components/frontend/auth/CredentialsFields'
import { DemoAccessNote } from '@/components/frontend/auth/DemoAccessNote'
import { RolePicker } from '@/components/frontend/auth/RolePicker'
import { Button } from '@/components/frontend/ui/Button'
import { hubCopy } from '@/lib/brand'
import { DEMO_PASSWORD, demoAccounts, reviewerAccount, type DemoAccount } from '@/lib/demo'
import { isAdminPath } from '@/lib/safePath'
import type { SessionUser } from '@/lib/session'

const Title = styled.h1`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSizes.xxl};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
`

const Lead = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.content.muted};
`

const Notice = styled.p`
  margin: 0;
  background: ${({ theme }) => theme.colors.surface.wash};
  border: 1px solid ${({ theme }) => theme.colors.border.strong};
  padding: ${({ theme }) => theme.spacing(4)};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`

const SessionLine = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.content.muted};
`

const Form = styled.form`
  display: grid;
  gap: ${({ theme }) => theme.spacing(5)};
`

const Actions = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(3)};
`

const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.status.returned};
  margin: 0;
`

const Quiet = styled(Link)`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.content.accent};
  text-underline-offset: ${({ theme }) => theme.spacing(1)};
  transition: color ${({ theme }) => theme.motion.fade} ${({ theme }) => theme.motion.out};

  &:hover {
    color: ${({ theme }) => theme.colors.surface.ink};
    text-decoration: underline;
  }
`

const pickAccount = (reason?: string, user?: SessionUser | null, role?: string): DemoAccount => {
  if (reason === 'admin') return reviewerAccount
  if (role) {
    const match = demoAccounts.find((account) => account.email.startsWith(`${role}@`))
    if (match) return match
  }
  if (user) {
    const match = demoAccounts.find((account) => account.email === user.email)
    if (match) return match
  }
  return demoAccounts[0]
}

const resolveTarget = (account: DemoAccount, nextPath: string) => {
  if (isAdminPath(nextPath)) {
    return account.role === 'Reviewer' ? nextPath : account.href
  }
  if (nextPath && nextPath !== '/library') return nextPath
  return account.href
}

type SignInProps = {
  nextPath: string
  reason?: string
  role?: string
  user?: SessionUser | null
}

const SignInFormComponent = ({ nextPath, reason, role, user }: SignInProps) => {
  const router = useRouter()
  const initial = useMemo(() => pickAccount(reason, user, role), [reason, user, role])
  const [selected, setSelected] = useState<DemoAccount>(initial)
  const [email, setEmail] = useState<string>(initial.email)
  const [password, setPassword] = useState(DEMO_PASSWORD)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const choose = (account: DemoAccount) => {
    setSelected(account)
    setEmail(account.email)
    setPassword(DEMO_PASSWORD)
  }

  const submit = async (event?: React.FormEvent) => {
    event?.preventDefault()
    setBusy(true)
    setError('')
    const matched = demoAccounts.find((account) => account.email === email) ?? selected
    const response = await fetch('/api/users/login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    if (!response.ok) {
      setBusy(false)
      setError('That sign-in did not work. Pick a demo role above.')
      return
    }
    const target = resolveTarget(matched, nextPath)
    if (isAdminPath(target)) {
      window.location.assign(target)
      return
    }
    router.push(target)
    router.refresh()
  }

  return (
    <Form onSubmit={(event) => void submit(event)}>
      <Title>{hubCopy.formTitle}</Title>
      <Lead>{hubCopy.formLead}</Lead>
      {reason === 'admin' ? <Notice>{hubCopy.adminNotice}</Notice> : null}
      {user ? (
        <SessionLine>
          Signed in as {user.name}. Choose a role to switch account.
        </SessionLine>
      ) : null}
      <RolePicker disabled={busy} onSelect={choose} selected={selected} />
      <Actions>
        <Button disabled={busy} type="submit" variant="gold">
          Continue as {selected.name}
        </Button>
        {error ? <ErrorText>{error}</ErrorText> : null}
      </Actions>
      <DemoAccessNote />
      <CredentialsFields
        email={email}
        onEmail={setEmail}
        onPassword={setPassword}
        password={password}
      />
      <Quiet href="/library">{hubCopy.browse}</Quiet>
    </Form>
  )
}

export const SignInForm = React.memo(SignInFormComponent)
SignInForm.displayName = 'SignInForm'
