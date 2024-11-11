'use client'

import { useState, useRef, KeyboardEvent } from 'react'

interface TagInputProps {
  tags: string[]
  onChange: (tags: string[]) => void
  maxTags?: number
}

export default function TagInput({ tags, onChange, maxTags = 3 }: TagInputProps) {
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag()
    } else if (e.key === 'Backspace' && !input && tags.length > 0) {
      removeTag(tags.length - 1)
    }
  }

  const addTag = () => {
    const trimmedInput = input.trim().toLowerCase()
    if (trimmedInput && !tags.includes(trimmedInput) && tags.length < maxTags) {
      onChange([...tags, trimmedInput])
      setInput('')
    }
  }

  const removeTag = (index: number) => {
    onChange(tags.filter((_, i) => i !== index))
  }

  return (
    <div className="w-full">
      <div 
        className="flex flex-wrap gap-2 p-3 bg-gray-700 border border-gray-600 rounded-lg 
          focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500"
        onClick={() => inputRef.current?.focus()}
      >
        {tags.map((tag, index) => (
          <span
            key={index}
            className="flex items-center gap-1 px-3 py-1 bg-gray-800 text-gray-200 
              rounded-full border border-gray-600"
          >
            {tag}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                removeTag(index)
              }}
              className="text-gray-400 hover:text-gray-200 transition-colors"
            >
              ×
            </button>
          </span>
        ))}
        
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addTag}
          placeholder={
            tags.length < maxTags 
              ? "Add tags (press enter or comma to add)" 
              : "Maximum tags reached"
          }
          disabled={tags.length >= maxTags}
          className="flex-grow min-w-[150px] bg-transparent border-none outline-none 
            text-gray-200 placeholder-gray-400"
        />
      </div>
      <div className="mt-1 text-sm text-gray-400 flex justify-between">
        <span>{tags.length}/{maxTags} tags used</span>
        {tags.length >= maxTags && (
          <span className="text-yellow-400">Maximum tags reached</span>
        )}
      </div>
    </div>
  )
} 