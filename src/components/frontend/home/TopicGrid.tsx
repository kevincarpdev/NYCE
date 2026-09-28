'use client'

import React from 'react'
import Link from 'next/link'
import {
  Bank,
  Buildings,
  Cloud,
  Database,
  Lightning,
  Plant,
  Shield,
  Train,
  Waves,
} from '@phosphor-icons/react'
import styled from 'styled-components'

import { PageSection, SectionWrapper } from '@/components/frontend/layout/Containers'
import { Reveal } from '@/components/frontend/motion/Reveal'
import { topicIcons, type TopicIcon } from '@/lib/content'
import { libraryHref } from '@/lib/libraryHref'
import type { TopicCard } from '@/lib/queries'
import { theme } from '@/theme/theme'

const icons: Record<TopicIcon, typeof Lightning> = {
  lightning: Lightning,
  buildings: Buildings,
  train: Train,
  plant: Plant,
  waves: Waves,
  cloud: Cloud,
  shield: Shield,
  bank: Bank,
  database: Database,
}

const Intro = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(4)};
  max-width: 40rem;
`

const Grid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(4)};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const Card = styled(Link)`
  background: ${({ theme }) => theme.colors.surface.paper};
  padding: ${({ theme }) => theme.spacing(8)};
  display: grid;
  gap: ${({ theme }) => theme.spacing(4)};
  height: 100%;
  color: inherit;
  transition: box-shadow ${({ theme }) => theme.motion.fade} ${({ theme }) => theme.motion.out};

  &:hover {
    box-shadow: 0 ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(4)}
      ${({ theme }) => theme.colors.focus.ring};
  }
`

const IconWrap = styled.span`
  color: ${({ theme }) => theme.colors.content.accent};
`

const Meta = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.content.muted};
`

export type TopicWithCount = TopicCard & { count: number }

type TopicGridProps = {
  topics: TopicWithCount[]
}

const TopicGridComponent = ({ topics }: TopicGridProps) => (
  <PageSection tone="raised">
    <SectionWrapper>
      <Reveal>
        <Intro>
          <h2>Browse by topic</h2>
          <p>A starting taxonomy so leftover research can be found instead of hunted.</p>
        </Intro>
      </Reveal>
      <Grid>
        {topics.map((topic, index) => {
          const iconKey = topicIcons[topic.slug as keyof typeof topicIcons] ?? 'database'
          const Icon = icons[iconKey]
          return (
            <Reveal delay={index} key={topic.slug}>
              <Card href={libraryHref({ topic: topic.slug })}>
                <IconWrap>
                  <Icon size={theme.icons.lg} />
                </IconWrap>
                <h3>{topic.title}</h3>
                <p>{topic.description}</p>
                <Meta>
                  {topic.count === 1 ? '1 leftover' : `${topic.count} leftovers`}
                </Meta>
              </Card>
            </Reveal>
          )
        })}
      </Grid>
    </SectionWrapper>
  </PageSection>
)

export const TopicGrid = React.memo(TopicGridComponent)
TopicGrid.displayName = 'TopicGrid'
