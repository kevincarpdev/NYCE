'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import styled from 'styled-components'

import { pageWidth } from '@/components/frontend/layout/Containers'
import { PresenceBar } from '@/components/frontend/workspace/PresenceBar'
import { WorkPanel } from '@/components/frontend/workspace/WorkPanel'
import { FilePreview } from '@/components/frontend/workspace/FilePreview'
import { DiscussionThread } from '@/components/frontend/workspace/DiscussionThread'
import { SuggestionList } from '@/components/frontend/workspace/SuggestionList'
import { AssistantChat } from '@/components/frontend/workspace/AssistantChat'
import { VersionList } from '@/components/frontend/workspace/VersionList'
import type {
  CommentCard,
  SubmissionCard,
  SuggestionCard,
  VersionCard,
} from '@/lib/queries'
import type { SessionUser } from '@/lib/session'

const Page = styled.div`
  ${pageWidth};
  margin-block: ${({ theme }) => theme.spacing(10)} ${({ theme }) => theme.spacing(16)};
  display: grid;
  gap: ${({ theme }) => theme.spacing(6)};
`

const Layout = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(6)};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr ${({ theme }) => theme.layout.asideWidth};
    align-items: start;
  }
`

const Pane = styled.section`
  background: ${({ theme }) => theme.colors.surface.raised};
  padding: ${({ theme }) => theme.spacing(6)};
  display: grid;
  gap: ${({ theme }) => theme.spacing(5)};
`

const Tabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(2)};
`

const Tab = styled.button<{ $active?: boolean }>`
  border: 1px solid ${({ theme }) => theme.colors.border.strong};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.surface.brand : theme.colors.surface.raised};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.content.inverse : theme.colors.content.accent};
  padding: ${({ theme }) => `${theme.spacing(2)} ${theme.spacing(3)}`};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  cursor: pointer;
  transition:
    background-color ${({ theme }) => theme.motion.fade} ${({ theme }) => theme.motion.out},
    color ${({ theme }) => theme.motion.fade} ${({ theme }) => theme.motion.out};

  &:hover {
    background: ${({ theme, $active }) =>
      $active ? theme.colors.surface.ink : theme.colors.surface.wash};
  }
`

const Title = styled.h1`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSizes.xxl};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
`

type BoardProps = {
  item: SubmissionCard
  comments: CommentCard[]
  suggestions: SuggestionCard[]
  versions: VersionCard[]
  user: SessionUser
  initialAside?: 'discuss' | 'edits' | 'assistant'
}

const WorkspaceBoardComponent = ({
  item,
  comments,
  suggestions,
  versions,
  user,
  initialAside = 'discuss',
}: BoardProps) => {
  const router = useRouter()
  const [current, setCurrent] = useState(item)
  const [main, setMain] = useState<'work' | 'files' | 'history'>('work')
  const [aside, setAside] = useState<'discuss' | 'edits' | 'assistant'>(initialAside)

  const openAside = (next: 'discuss' | 'edits' | 'assistant') => {
    setAside(next)
    router.replace(`?tab=${next}`)
  }

  const refreshEdits = () => {
    router.replace('?tab=edits')
    router.refresh()
  }

  return (
    <Page>
      <div>
        <Title>{current.title}</Title>
        <p>
          {current.authors} · {current.attributionUniversity}
        </p>
        <PresenceBar editing={current.canIterate} submissionId={current.id} user={user} />
      </div>
      <Layout>
        <Pane>
          <Tabs>
            <Tab $active={main === 'work'} onClick={() => setMain('work')} type="button">
              Work
            </Tab>
            <Tab $active={main === 'files'} onClick={() => setMain('files')} type="button">
              Files
            </Tab>
            <Tab $active={main === 'history'} onClick={() => setMain('history')} type="button">
              Versions
            </Tab>
          </Tabs>
          {main === 'work' ? <WorkPanel item={current} onSaved={setCurrent} /> : null}
          {main === 'files' ? (
            current.files.length ? (
              current.files.map((file) => <FilePreview file={file} key={file.id} />)
            ) : (
              <p>No file on this leftover yet.</p>
            )
          ) : null}
          {main === 'history' ? <VersionList versions={versions} /> : null}
        </Pane>
        <Pane>
          <Tabs>
            <Tab $active={aside === 'discuss'} onClick={() => openAside('discuss')} type="button">
              Notes
            </Tab>
            <Tab $active={aside === 'edits'} onClick={() => openAside('edits')} type="button">
              Suggested edits
            </Tab>
            <Tab $active={aside === 'assistant'} onClick={() => openAside('assistant')} type="button">
              Assistant
            </Tab>
          </Tabs>
          {aside === 'discuss' ? (
            <DiscussionThread comments={comments} submissionId={current.id} />
          ) : null}
          {aside === 'edits' ? (
            <SuggestionList
              canIterate={current.canIterate}
              onApplied={refreshEdits}
              suggestions={suggestions}
            />
          ) : null}
          {aside === 'assistant' ? (
            <AssistantChat history={comments} onProposed={refreshEdits} submissionId={current.id} />
          ) : null}
        </Pane>
      </Layout>
    </Page>
  )
}

export const WorkspaceBoard = React.memo(WorkspaceBoardComponent)
WorkspaceBoard.displayName = 'WorkspaceBoard'
