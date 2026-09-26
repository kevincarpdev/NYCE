'use client'

import React, { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import styled from 'styled-components'

import { Button } from '@/components/frontend/ui/Button'
import { DEMO_PASSWORD, demoAccounts } from '@/lib/demo'

const Grid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(4)};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
  }
`

const Account = styled.button`
  text-align: left;
  background: ${({ theme }) => theme.colors.surface.raised};
  border: 1px solid ${({ theme }) => theme.colors.border.subtle};
  padding: ${({ theme }) => theme.spacing(5)};
  cursor: pointer;
  color: inherit;
`

const Role = styled.span`
  display: block;
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.content.accent};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
`

const Form = styled.form`
  display: grid;
  gap: ${({ theme }) => theme.spacing(4)};
  margin-top: ${({ theme }) => theme.spacing(8)};
`

const Field = styled.label`
  display: grid;
  gap: ${({ theme }) => theme.spacing(2)};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
`

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.border.strong};
  padding: ${({ theme }) => theme.spacing(3)};
  background: ${({ theme }) => theme.colors.surface.raised};
`

const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.status.returned};
  margin: 0;
`

const Hint = styled.p`
  color: ${({ theme }) => theme.colors.content.muted};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`

type SignInProps = {
  nextPath: string
}

const SignInFormComponent = ({ nextPath }: SignInProps) => {
  const router = useRouter()
  const [email, setEmail] = useState<string>(demoAccounts[0].email)
  const [password, setPassword] = useState(DEMO_PASSWORD)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const destinations = useMemo(
    () => Object.fromEntries(demoAccounts.map((account) => [account.email, account.href])),
    [],
  )

  const submit = async (
    event?: React.FormEvent,
    destination?: string,
    credentials?: { email: string; password: string },
  ) => {
    event?.preventDefault()
    const loginEmail = credentials?.email ?? email
    const loginPassword = credentials?.password ?? password
    setBusy(true)
    setError('')
    const response = await fetch('/api/users/login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: loginEmail, password: loginPassword }),
    })
    if (!response.ok) {
      setBusy(false)
      setError('That sign-in did not work. Use a demo account below.')
      return
    }
        const target = destination || destinations[loginEmail] || nextPath || '/library'
    router.push(target)
    router.refresh()
  }

  return (
    <>
      <Hint>Prototype accounts. Shared password {DEMO_PASSWORD}.</Hint>
      <Grid>
        {demoAccounts.map((account) => (
          <Account
            key={account.email}
            onClick={() => {
              setEmail(account.email)
              setPassword(DEMO_PASSWORD)
              void submit(undefined, nextPath && nextPath !== '/library' ? nextPath : account.href, {
                email: account.email,
                password: DEMO_PASSWORD,
              })
            }}
            type="button"
          >
            <Role>{account.role}</Role>
            <strong>{account.name}</strong>
            <Hint>{account.hint}</Hint>
            <Hint>{account.email}</Hint>
          </Account>
        ))}
      </Grid>
      <Form onSubmit={(event) => void submit(event)}>
        <Field>
          Email
          <Input onChange={(event) => setEmail(event.target.value)} type="email" value={email} />
        </Field>
        <Field>
          Password
          <Input
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            value={password}
          />
        </Field>
        {error ? <ErrorText>{error}</ErrorText> : null}
        <Button disabled={busy} type="submit">
          Sign in
        </Button>
      </Form>
    </>
  )
}

export const SignInForm = React.memo(SignInFormComponent)
SignInForm.displayName = 'SignInForm'
