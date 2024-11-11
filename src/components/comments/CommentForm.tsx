'use client'

import { useState } from 'react'

interface CommentFormProps {
  onSubmit: (content: string) => Promise<void>
  placeholder?: string
  submitLabel?: string
  initialValue?: string
}

export default function CommentForm({
  onSubmit,
  placeholder = 'Write a comment...',
  submitLabel = 'Comment',
  initialValue = ''
}: CommentFormProps) {
  const [content, setContent] = useState(initialValue)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim() || isSubmitting) return

    try {
      setIsSubmitting(true)
      await onSubmit(content)
      setContent('')
    } catch (error) {
      console.error('Error submitting comment:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        className="w-full p-3 bg-gray-700 rounded-lg text-white placeholder-gray-400 
          focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={3}
      />
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={!content.trim() || isSubmitting}
          className={`px-4 py-2 rounded-lg text-white 
            ${!content.trim() || isSubmitting 
              ? 'bg-gray-600 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          {isSubmitting ? 'Submitting...' : submitLabel}
        </button>
      </div>
    </form>
  )
} 