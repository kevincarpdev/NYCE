'use client'

import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

import { Badge } from '@/components/frontend/ui/Badge'
import { kindLabels } from '@/lib/labels'
import type { ProjectCard } from '@/lib/queries'
import { libraryHref } from '@/lib/libraryHref'

const Grid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(4)};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const Card = styled(Link)`
  background: ${({ theme }) => theme.colors.surface.raised};
  padding: ${({ theme }) => theme.spacing(6)};
  display: grid;
  gap: ${({ theme }) => theme.spacing(3)};
  height: 100%;
  transition: box-shadow ${({ theme }) => theme.motion.fade} ${({ theme }) => theme.motion.out};

  &:hover {
    box-shadow: 0 ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(4)}
      ${({ theme }) => theme.colors.focus.ring};
  }
`

const Title = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
`

const Copy = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.content.muted};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`

type ListProps = {
  projects: ProjectCard[]
}

const ProjectGridComponent = ({ projects }: ListProps) => (
  <Grid>
    {projects.map((project) => (
      <Card href={libraryHref({ project: project.slug })} key={project.slug}>
        <Badge>{kindLabels[project.kind] || project.kind}</Badge>
        <Title>{project.title}</Title>
        <Copy>
          {project.university}
          {project.semester ? ` · ${project.semester}` : ''}
        </Copy>
        <Copy>{project.summary}</Copy>
      </Card>
    ))}
  </Grid>
)

export const ProjectGrid = React.memo(ProjectGridComponent)
ProjectGrid.displayName = 'ProjectGrid'
