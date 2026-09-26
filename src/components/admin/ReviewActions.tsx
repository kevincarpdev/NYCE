'use client'

import React, { useCallback, useState } from 'react'
import { Button, toast, useDocumentInfo } from '@payloadcms/ui'

const ReviewActionsComponent = () => {
  const { id, collectionSlug } = useDocumentInfo()
  const [note, setNote] = useState('')
  const [busy, setBusy] = useState(false)
  const [askingNote, setAskingNote] = useState(false)

  const patch = useCallback(
    async (body: Record<string, unknown>, success: string) => {
      if (!id || !collectionSlug) return
      setBusy(true)
      try {
        const response = await fetch(`/api/${collectionSlug}/${id}`, {
          method: 'PATCH',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        if (!response.ok) {
          const payload = await response.json().catch(() => ({}))
          throw new Error(payload.errors?.[0]?.message || 'Could not update this submission.')
        }
        toast.success(success)
        window.location.reload()
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Could not update this submission.')
      } finally {
        setBusy(false)
      }
    },
    [collectionSlug, id],
  )

  if (!id) return null

  return (
    <div className="nyce-review-actions">
      <Button buttonStyle="primary" disabled={busy} onClick={() => patch({ status: 'published' }, 'Published. It is in the library.')} size="small">
        Publish
      </Button>
      {!askingNote ? (
        <Button buttonStyle="secondary" disabled={busy} onClick={() => setAskingNote(true)} size="small">
          Send back
        </Button>
      ) : (
        <div className="nyce-review-note">
          <textarea
            onChange={(event) => setNote(event.target.value)}
            placeholder="What should they fix?"
            rows={3}
            value={note}
          />
          <Button
            buttonStyle="primary"
            disabled={busy || !note.trim()}
            onClick={() =>
              patch(
                { status: 'changes_requested', reviewerNote: note.trim() },
                'Sent back with a note.',
              )
            }
            size="small"
          >
            Send back
          </Button>
        </div>
      )}
    </div>
  )
}

const ReviewActions = React.memo(ReviewActionsComponent)
ReviewActions.displayName = 'ReviewActions'

export default ReviewActions
