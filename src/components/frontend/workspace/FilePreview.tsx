'use client'

import React from 'react'
import { DownloadSimple } from '@phosphor-icons/react'
import styled from 'styled-components'

import type { FileCard } from '@/lib/queries'
import { fileKindLabels } from '@/lib/labels'
import { theme } from '@/theme/theme'

const Stage = styled.div`
  background: ${({ theme }) => theme.colors.surface.raised};
  border: 1px solid ${({ theme }) => theme.colors.border.subtle};
  display: grid;
  gap: ${({ theme }) => theme.spacing(3)};
  padding: ${({ theme }) => theme.spacing(4)};
`

const Frame = styled.iframe`
  width: 100%;
  height: ${({ theme }) => theme.layout.previewHeight};
  border: 0;
  background: ${({ theme }) => theme.colors.surface.paper};
`

const Media = styled.video`
  width: 100%;
  max-height: ${({ theme }) => theme.layout.previewHeight};
`

const Picture = styled.img`
  width: 100%;
  max-height: ${({ theme }) => theme.layout.previewHeight};
  object-fit: contain;
`

const Meta = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.content.muted};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`

const FileLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.content.accent};
  text-underline-offset: ${({ theme }) => theme.spacing(1)};
  transition: color ${({ theme }) => theme.motion.fade} ${({ theme }) => theme.motion.out};

  &:hover {
    color: ${({ theme }) => theme.colors.surface.ink};
    text-decoration: underline;
  }
`

type PreviewProps = {
  file: FileCard
}

const FilePreviewComponent = ({ file }: PreviewProps) => {
  const href = file.url || `/api/files/file/${file.filename}`
  const mime = file.mimeType || ''
  const isPdf = mime.includes('pdf') || file.filename.endsWith('.pdf')
  const isVideo = mime.startsWith('video/')
  const isImage = mime.startsWith('image/')

  return (
    <Stage>
      <div>
        <strong>{file.filename}</strong>
        <Meta>
          {fileKindLabels[file.kind || ''] || 'File'}
          {file.pageCount ? ` · ${file.pageCount} pp` : ''}
          {file.revision ? ` · rev ${file.revision}` : ''}
        </Meta>
        {file.caption ? <Meta>{file.caption}</Meta> : null}
      </div>
      {isPdf ? <Frame src={href} title={file.filename} /> : null}
      {isVideo ? <Media controls src={href} /> : null}
      {isImage ? <Picture alt={file.caption || file.filename} src={href} /> : null}
      <FileLink href={href} rel="noreferrer">
        <DownloadSimple size={theme.icons.md} />
        Download
      </FileLink>
    </Stage>
  )
}

export const FilePreview = React.memo(FilePreviewComponent)
FilePreview.displayName = 'FilePreview'
