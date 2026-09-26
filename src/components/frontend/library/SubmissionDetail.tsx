'use client'

import React from 'react'
import { DownloadSimple, LockSimple } from '@phosphor-icons/react'
import styled from 'styled-components'

import { Badge } from '@/components/frontend/ui/Badge'
import { Button } from '@/components/frontend/ui/Button'
import { PageSection, SectionWrapper } from '@/components/frontend/layout/Containers'
import { formatDate } from '@/lib/dates'
import { formatLabels, stageLabels, visibilityLabels } from '@/lib/labels'
import type { SubmissionCard as Item } from '@/lib/queries'
import { theme } from '@/theme/theme'

const Title = styled.h1`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSizes.xxl};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
`

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(2)};
`

const Body = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  max-width: 46rem;
`

const Lock = styled.div`
  background: ${({ theme }) => theme.colors.surface.brand};
  color: ${({ theme }) => theme.colors.content.inverse};
  padding: ${({ theme }) => theme.spacing(8)};
  display: grid;
  gap: ${({ theme }) => theme.spacing(4)};
`

const Files = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: ${({ theme }) => theme.spacing(3)};
`

const FileLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.content.accent};
`

const Note = styled.aside`
  background: ${({ theme }) => theme.colors.surface.gold};
  color: ${({ theme }) => theme.colors.surface.ink};
  padding: ${({ theme }) => theme.spacing(5)};
`

type DetailProps = {
  item: Item
  signedIn: boolean
}

const SubmissionDetailComponent = ({ item, signedIn }: DetailProps) => {
  const locked = item.visibility === 'invited' && !signedIn

  return (
    <PageSection>
      <SectionWrapper>
        <Tags>
          <Badge tone={item.visibility === 'invited' ? 'invited' : 'public'}>
            {item.visibility === 'invited' ? <LockSimple size={theme.icons.sm} /> : null}
            {visibilityLabels[item.visibility]}
          </Badge>
          <Badge>{formatLabels[item.format]}</Badge>
          <Badge>{stageLabels[item.stage]}</Badge>
          {item.project ? <Badge>{item.project.title}</Badge> : null}
        </Tags>
        <Title>{item.title}</Title>
        <p>
          {item.authors}
          {item.attributionUniversity ? ` · ${item.attributionUniversity}` : ''}
          {item.agreedAt ? ` · Agreed ${formatDate(item.agreedAt)}` : ''}
        </p>
        {item.reviewerNote ? <Note>Reviewer note: {item.reviewerNote}</Note> : null}
        {locked ? (
          <Lock>
            <strong>Invited readers only</strong>
            <p>
              This work is published for invited professors and students. Sign in to read the body
              and open the file. Drafts and in-review items never appear here.
            </p>
            <Button href={`/sign-in?next=/library/${item.slug}`} variant="gold">
              Sign in as next semester
            </Button>
          </Lock>
        ) : (
          <>
            {item.summary ? <Body>{item.summary}</Body> : null}
            <Files>
              {item.files.map((file) => (
                <li key={file.id}>
                  <FileLink href={file.url || `/api/files/file/${file.filename}`} rel="noreferrer">
                    <DownloadSimple size={theme.icons.md} />
                    {file.filename}
                  </FileLink>
                </li>
              ))}
            </Files>
          </>
        )}
        <Tags>
          {item.topics.map((topic) => (
            <Badge key={topic.id}>{topic.title}</Badge>
          ))}
        </Tags>
      </SectionWrapper>
    </PageSection>
  )
}

export const SubmissionDetail = React.memo(SubmissionDetailComponent)
SubmissionDetail.displayName = 'SubmissionDetail'
