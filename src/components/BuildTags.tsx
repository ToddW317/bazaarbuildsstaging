'use client'

import { useState } from 'react'

interface BuildTagsProps {
  tags: string[]
  onTagClick?: (tag: string) => void
  className?: string
}

export default function BuildTags({ tags, onTagClick, className = '' }: BuildTagsProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map(tag => (
        <button
          key={tag}
          onClick={() => onTagClick?.(tag)}
          className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
        >
          #{tag}
        </button>
      ))}
    </div>
  )
} 