'use client'

import React from 'react'
import styled from 'styled-components'

import { formatDate, formatTime } from '@/lib/dates'
import type { VersionCard } from '@/lib/queries'

const List = styled.ol`
  margin: 0;
  padding-left: ${({ theme }) => theme.spacing(5)};
  display: grid;
  gap: ${({ theme }) => theme.spacing(3)};
`

type ListProps = {
  versions: VersionCard[]
}

const VersionListComponent = ({ versions }: ListProps) => {
  if (!versions.length) return <p>Payload will keep versions here as people save.</p>
  return (
    <List>
      {versions.map((version) => (
        <li key={version.id}>
          {version.title}
          {version.revision ? ` · rev ${version.revision}` : ''}
          {version.updatedAt ? ` · ${formatDate(version.updatedAt)} ${formatTime(version.updatedAt)}` : ''}
        </li>
      ))}
    </List>
  )
}

export const VersionList = React.memo(VersionListComponent)
VersionList.displayName = 'VersionList'
