'use client'

import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

import { libraryHref } from '@/lib/libraryHref'
import { formatLabels, stageLabels } from '@/lib/labels'
import type { ProjectCard, TopicCard } from '@/lib/queries'

const Wrap = styled.form`
  display: grid;
  gap: ${({ theme }) => theme.spacing(4)};
`

const Search = styled.input`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.border.strong};
  background: ${({ theme }) => theme.colors.surface.raised};
  color: ${({ theme }) => theme.colors.content.primary};
  padding: ${({ theme }) => theme.spacing(3)};
`

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(2)};
`

const Chip = styled(Link)<{ $active?: boolean }>`
  padding: ${({ theme }) => `${theme.spacing(2)} ${theme.spacing(3)}`};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.surface.brand : theme.colors.surface.raised};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.content.inverse : theme.colors.content.accent};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
`

type Filters = {
  q?: string
  topic?: string
  project?: string
  format?: string
  stage?: string
}

type FilterProps = {
  topics: TopicCard[]
  projects: ProjectCard[]
  current: Filters
}

const LibraryFiltersComponent = ({ topics, projects, current }: FilterProps) => {
  const next = (patch: Filters) => libraryHref({ ...current, ...patch })

  return (
    <Wrap action="/library" method="get">
      {current.topic ? <input name="topic" type="hidden" value={current.topic} /> : null}
      {current.project ? <input name="project" type="hidden" value={current.project} /> : null}
      {current.format ? <input name="format" type="hidden" value={current.format} /> : null}
      {current.stage ? <input name="stage" type="hidden" value={current.stage} /> : null}
      <Search defaultValue={current.q} name="q" placeholder="Search titles and authors" />
      <Chips>
        <Chip $active={!current.topic} href={next({ topic: undefined })}>
          All topics
        </Chip>
        {topics.map((topic) => (
          <Chip
            $active={current.topic === topic.slug}
            href={next({ topic: topic.slug })}
            key={topic.slug}
          >
            {topic.title}
          </Chip>
        ))}
      </Chips>
      <Chips>
        {projects.map((project) => (
          <Chip
            $active={current.project === project.slug}
            href={next({ project: current.project === project.slug ? undefined : project.slug })}
            key={project.slug}
          >
            {project.title}
          </Chip>
        ))}
        {Object.entries(formatLabels).map(([value, label]) => (
          <Chip
            $active={current.format === value}
            href={next({ format: current.format === value ? undefined : value })}
            key={value}
          >
            {label}
          </Chip>
        ))}
        {Object.entries(stageLabels).map(([value, label]) => (
          <Chip
            $active={current.stage === value}
            href={next({ stage: current.stage === value ? undefined : value })}
            key={value}
          >
            {label}
          </Chip>
        ))}
      </Chips>
    </Wrap>
  )
}

export const LibraryFilters = React.memo(LibraryFiltersComponent)
LibraryFilters.displayName = 'LibraryFilters'
