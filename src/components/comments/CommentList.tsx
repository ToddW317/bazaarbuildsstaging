'use client'

import { Comment } from '@/types/types'
import CommentItem from './CommentItem'

interface CommentListProps {
  buildId: string
  comments: Comment[]
  onReply: (content: string, parentId: string) => Promise<void>
}

export default function CommentList({ buildId, comments, onReply }: CommentListProps) {
  return (
    <div className="space-y-4">
      {comments.map(comment => (
        <CommentItem
          key={comment.id}
          buildId={buildId}
          comment={comment}
          replies={[]}
          onReply={onReply}
        />
      ))}
    </div>
  )
} 