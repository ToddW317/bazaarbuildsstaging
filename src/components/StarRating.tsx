'use client'

import { useState } from 'react'

interface StarRatingProps {
  initialRating?: number
  totalStars?: number
  onChange?: (rating: number) => void
  readonly?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export default function StarRating({
  initialRating = 0,
  totalStars = 5,
  onChange,
  readonly = false,
  size = 'md'
}: StarRatingProps) {
  const [rating, setRating] = useState(initialRating)
  const [hover, setHover] = useState(0)

  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  }

  const handleClick = (value: number) => {
    if (readonly) return
    setRating(value)
    onChange?.(value)
  }

  return (
    <div className="flex items-center">
      {[...Array(totalStars)].map((_, index) => {
        const value = index + 1
        return (
          <button
            key={index}
            type="button"
            onClick={() => handleClick(value)}
            onMouseEnter={() => !readonly && setHover(value)}
            onMouseLeave={() => !readonly && setHover(0)}
            className={`${sizeClasses[size]} ${
              readonly ? 'cursor-default' : 'cursor-pointer'
            } ${
              (hover || rating) >= value
                ? 'text-yellow-400'
                : 'text-gray-300'
            } transition-colors`}
            disabled={readonly}
          >
            ★
          </button>
        )
      })}
    </div>
  )
} 