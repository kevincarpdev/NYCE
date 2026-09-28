import type { ServerProps } from 'payload'

import { brandPhotos } from '@/lib/brand'

export default function BeforeDashboard({ user }: ServerProps) {
  const first = user?.name?.split(' ')[0] || 'reviewer'

  return (
    <section className="nyce-welcome">
      <div className="nyce-welcome__photo">
        <img alt={brandPhotos.campusAerial.alt} src={brandPhotos.campusAerial.src} />
      </div>
      <div className="nyce-welcome__body">
        <p className="nyce-welcome__eyebrow">Knowledge Hub</p>
        <h2>Welcome back, {first}</h2>
        <p>
          Professors and students submit leftover climate-tech research. Classify it, publish it, or
          send it back.
        </p>
        <div className="nyce-welcome__actions">
          <a href="/admin/collections/submissions?where[status][equals]=in_review">
            Open review queue
          </a>
          <a href="/library">View public library</a>
          <a href="/walkthrough">How to demo</a>
        </div>
        <details>
          <summary>How this admin works</summary>
          <ul>
            <li>
              <strong>Submissions</strong> — the queue. Open the review queue, then Publish or Send
              back.
            </li>
            <li>
              <strong>Projects</strong> — a course, a cohort, or a lab.
            </li>
            <li>
              <strong>Topics</strong> — a starting taxonomy. Month 1 with Shaina and Megha replaces
              this set.
            </li>
            <li>
              <strong>Files</strong> — private until the parent submission is published.
            </li>
            <li>
              <strong>Iterate</strong> — comments, suggested edits, and who is on the leftover. The
              hub assistant proposes field changes.
            </li>
          </ul>
          <p>
            Not in this prototype: university SSO and the final IP / attribution text.
          </p>
        </details>
      </div>
    </section>
  )
}
