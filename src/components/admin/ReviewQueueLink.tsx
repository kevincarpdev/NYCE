export default function ReviewQueueLink() {
  return (
    <div className="nyce-review-queue">
      <a href="/admin/collections/submissions?where[status][equals]=in_review">
        Open review queue
      </a>
      <span> — status is In review</span>
    </div>
  )
}
