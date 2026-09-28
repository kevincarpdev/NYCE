'use client'

import React from 'react'
import { LockSimple } from '@phosphor-icons/react'
import styled from 'styled-components'

import { Badge } from '@/components/frontend/ui/Badge'
import { Button } from '@/components/frontend/ui/Button'
import { PageSection, SectionWrapper } from '@/components/frontend/layout/Containers'
import { FilePreview } from '@/components/frontend/workspace/FilePreview'
import { formatDate } from '@/lib/dates'
import { formatLabels, reuseLabels, sectionLabels, stageLabels, visibilityLabels } from '@/lib/labels'
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

const Note = styled.aside`
  background: ${({ theme }) => theme.colors.surface.gold};
  color: ${({ theme }) => theme.colors.surface.ink};
  padding: ${({ theme }) => theme.spacing(5)};
`

const Block = styled.article`
  background: ${({ theme }) => theme.colors.surface.raised};
  padding: ${({ theme }) => theme.spacing(5)};
  display: grid;
  gap: ${({ theme }) => theme.spacing(2)};
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
          {item.reuseLevel ? <Badge>{reuseLabels[item.reuseLevel]}</Badge> : null}
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
            {item.writeup && item.writeup !== item.summary ? <p>{item.writeup}</p> : null}
            {item.handoff ? (
              <Block>
                <strong>Handoff</strong>
                <p>{item.handoff}</p>
              </Block>
            ) : null}
            {item.leftoverSections.map((section) => (
              <Block key={section.id || section.heading}>
                <strong>
                  {sectionLabels[section.blockType] || section.blockType} · {section.heading}
                </strong>
                <p>{section.body}</p>
              </Block>
            ))}
            {item.files.map((file) => (
              <FilePreview file={file} key={file.id} />
            ))}
            {signedIn ? (
              <Button href={`/library/${item.slug}/workspace`} variant="ink">
                Open workspace
              </Button>
            ) : null}
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
