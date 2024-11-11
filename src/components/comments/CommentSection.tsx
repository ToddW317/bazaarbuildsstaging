'use client'

import { useAuth } from '@/contexts/AuthContext'
import { Comment } from '@/types/types'
import { useState, useEffect } from 'react'
import { subscribeToComments, addComment } from '@/lib/commentService'
import CommentList from './CommentList'
import CommentForm from './CommentForm'

interface CommentSectionProps {
  buildId: string
}

export default function CommentSection({ buildId }: CommentSectionProps) {
  const { user } = useAuth()
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = subscribeToComments(buildId, (updatedComments) => {
      setComments(updatedComments)
      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [buildId])

  const handleAddComment = async (content: string, parentId?: string | null) => {
    if (!user) return

    try {
      await addComment(
        buildId,
        user.uid,
        user.displayName || 'Anonymous',
        content,
        parentId
      )
    } catch (error) {
      console.error('Error adding comment:', error)
      alert('Failed to add comment. Please try again.')
    }
  }

  if (isLoading) {
    return <div className="text-gray-300">Loading comments...</div>
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Comments</h2>
      
      {user ? (
        <CommentForm onSubmit={handleAddComment} />
      ) : (
        <p className="text-gray-400">Please sign in to comment</p>
      )}

      <div className="mt-8">
        <CommentList 
          buildId={buildId}
          comments={comments}
          onReply={handleAddComment}
        />
      </div>
    </div>
  )
} 