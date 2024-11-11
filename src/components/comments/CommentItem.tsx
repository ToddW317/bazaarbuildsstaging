'use client'

import { useAuth } from '@/contexts/AuthContext'
import { Comment } from '@/types/types'
import { useState } from 'react'
import { toggleCommentLike } from '@/lib/commentService'
import CommentForm from './CommentForm'

interface CommentItemProps {
  buildId: string
  comment: Comment
  replies: Comment[]
  onReply: (content: string, parentId: string) => Promise<void>
  depth?: number
}

export default function CommentItem({ 
  buildId, 
  comment, 
  replies, 
  onReply,
  depth = 0 
}: CommentItemProps) {
  const { user } = useAuth()
  const [isReplying, setIsReplying] = useState(false)
  
  console.log('Comment data:', comment)
  
  const initialLikedBy = Array.isArray(comment?.likedBy) ? comment.likedBy : []
  const [isLiked, setIsLiked] = useState(user ? initialLikedBy.includes(user.uid) : false)
  const [likeCount, setLikeCount] = useState(comment?.likes || 0)

  const handleLike = async () => {
    if (!user || !buildId || !comment?.id) {
      console.log('Missing required data:', { user, buildId, commentId: comment?.id })
      return
    }

    try {
      const liked = await toggleCommentLike(buildId, comment.id, user.uid)
      setIsLiked(liked)
      setLikeCount(prev => Math.max(0, liked ? prev + 1 : prev - 1))
    } catch (error) {
      console.error('Error toggling like:', error)
    }
  }

  if (!comment) {
    console.error('Comment is undefined')
    return null
  }

  return (
    <div 
      className={`${depth > 0 ? 'border-l-2 border-gray-700 pl-4' : ''} mb-4`}
      style={{ marginLeft: depth > 0 ? '1rem' : '0' }}
    >
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="font-medium text-gray-200">{comment.userName}</div>
          <div className="text-sm text-gray-400">
            {new Date(comment.createdAt).toLocaleDateString()}
          </div>
        </div>

        <div className="text-gray-300 mb-3">
          {comment.content}
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={handleLike}
            className={`text-sm flex items-center space-x-1 ${
              isLiked ? 'text-blue-400' : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <span>{isLiked ? '❤️' : '🤍'}</span>
            <span>{likeCount}</span>
          </button>
          
          {user && (
            <button
              onClick={() => setIsReplying(!isReplying)}
              className="text-sm text-gray-400 hover:text-gray-300"
            >
              Reply
            </button>
          )}
        </div>

        {isReplying && (
          <div className="mt-4">
            <CommentForm 
              onSubmit={(content) => {
                onReply(content, comment.id)
                setIsReplying(false)
              }}
              placeholder="Write a reply..."
              submitLabel="Reply"
            />
          </div>
        )}
      </div>

      {replies && replies.length > 0 && (
        <div className="mt-2">
          {replies.map(reply => (
            <CommentItem
              key={reply.id}
              buildId={buildId}
              comment={reply}
              replies={[]}
              onReply={onReply}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
} 