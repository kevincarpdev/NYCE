'use client'

import React, { useState } from 'react'
import { Copy } from '@phosphor-icons/react'
import styled from 'styled-components'

import { hubCopy } from '@/lib/brand'
import { DEMO_PASSWORD } from '@/lib/demo'
import { theme } from '@/theme/theme'

const Note = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(3)};
`

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(3)};
  background: ${({ theme }) => theme.colors.surface.wash};
  border: 1px solid ${({ theme }) => theme.colors.border.subtle};
  padding: ${({ theme }) => theme.spacing(3)};
`

const Password = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.content.muted};
`

const Code = styled.code`
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.content.primary};
`

const CopyButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  background: transparent;
  border: 0;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.content.accent};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  text-transform: uppercase;
  transition: color ${({ theme }) => theme.motion.fade} ${({ theme }) => theme.motion.out};

  &:hover {
    color: ${({ theme }) => theme.colors.surface.ink};
  }
`

const Sso = styled.button`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1)};
  justify-items: start;
  background: ${({ theme }) => theme.colors.surface.raised};
  border: 1px solid ${({ theme }) => theme.colors.border.subtle};
  padding: ${({ theme }) => theme.spacing(3)};
  color: ${({ theme }) => theme.colors.content.muted};
  font: inherit;
  text-align: left;
  cursor: not-allowed;
`

const Hint = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  text-transform: uppercase;
`

const DemoAccessNoteComponent = () => {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(DEMO_PASSWORD)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <Note>
      <Row>
        <Password>
          Shared demo password <Code>{DEMO_PASSWORD}</Code>
        </Password>
        <CopyButton onClick={() => void copy()} type="button">
          <Copy size={theme.icons.sm} />
          {copied ? 'Copied' : 'Copy'}
        </CopyButton>
      </Row>
      <Sso disabled type="button">
        {hubCopy.ssoLabel}
        <Hint>{hubCopy.ssoHint}</Hint>
      </Sso>
    </Note>
  )
}

export const DemoAccessNote = React.memo(DemoAccessNoteComponent)
DemoAccessNote.displayName = 'DemoAccessNote'
