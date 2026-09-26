'use client'

import React from 'react'
import Link from 'next/link'
import { LockSimple } from '@phosphor-icons/react'
import styled from 'styled-components'

import { Badge } from '@/components/frontend/ui/Badge'
import { formatLabels, stageLabels, visibilityLabels } from '@/lib/labels'
import type { SubmissionCard as Submission } from '@/lib/queries'
import { theme } from '@/theme/theme'

const Card = styled.article`
  background: ${({ theme }) => theme.colors.surface.raised};
  border-top: ${({ theme }) => `${theme.spacing(1)} solid ${theme.colors.surface.gold}`};
  padding: ${({ theme }) => theme.spacing(6)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
  height: 100%;
`

const Title = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  line-height: ${({ theme }) => theme.typography.lineHeights.tight};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
`

const Meta = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.content.muted};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(2)};
`

type CardProps = {
  item: Submission
}

const statusTone = (item: Submission) => {
  if (item.status === 'in_review') return 'review' as const
  if (item.status === 'changes_requested') return 'returned' as const
  if (item.visibility === 'invited') return 'invited' as const
  return 'public' as const
}

const SubmissionCardComponent = ({ item }: CardProps) => (
  <Card>
    <Tags>
      <Badge tone={statusTone(item)}>
        {item.visibility === 'invited' ? <LockSimple size={theme.icons.sm} /> : null}
        {item.status === 'published'
          ? visibilityLabels[item.visibility]
          : item.status === 'in_review'
            ? 'In review'
            : item.status === 'changes_requested'
              ? 'Sent back'
              : visibilityLabels[item.visibility]}
      </Badge>
      <Badge>{formatLabels[item.format] || item.format}</Badge>
      <Badge>{stageLabels[item.stage] || item.stage}</Badge>
    </Tags>
    <Title>
      <Link href={`/library/${item.slug}`}>{item.title}</Link>
    </Title>
    <Meta>
      {item.authors}
      {item.attributionUniversity ? ` · ${item.attributionUniversity}` : ''}
    </Meta>
    <Tags>
      {item.topics.map((topic) => (
        <Badge key={topic.id}>{topic.title}</Badge>
      ))}
    </Tags>
  </Card>
)

export const SubmissionCard = React.memo(SubmissionCardComponent)
SubmissionCard.displayName = 'SubmissionCard'
