'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { updateBuildRating } from '@/lib/buildService'

interface BuildRatingProps {
  buildId: string
  initialRating: {
    average: number
    count: number
  }
}

export default function BuildRating({ buildId, initialRating }: BuildRatingProps) {
  const { user } = useAuth()
  const [rating, setRating] = useState(initialRating)
  const [userRating, setUserRating] = useState(0)
  const [isHovering, setIsHovering] = useState(0)
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    // Show hint after 2 seconds if user is logged in and hasn't rated
    if (user && !userRating) {
      const timer = setTimeout(() => {
        setShowHint(true)
      }, 2000)

      // Hide hint after 5 seconds
      const hideTimer = setTimeout(() => {
        setShowHint(false)
      }, 7000)

      return () => {
        clearTimeout(timer)
        clearTimeout(hideTimer)
      }
    }
  }, [user, userRating])

  const handleRate = async (score: number) => {
    if (!user) return

    try {
      const updatedRating = await updateBuildRating(buildId, user.uid, score)
      setRating(updatedRating)
      setUserRating(score)
      setShowHint(false)
    } catch (error) {
      console.error('Error updating rating:', error)
    }
  }

  return (
    <div className="flex flex-col items-end relative">
      {showHint && (
        <div className="absolute -left-48 top-1/2 -translate-y-1/2 flex items-center animate-pulse">
          <span className="text-yellow-400 mr-2">Rate this build!</span>
          <svg 
            className="w-6 h-6 text-yellow-400 animate-bounce"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </div>
      )}
      <div className="flex items-center mb-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onMouseEnter={() => setIsHovering(star)}
            onMouseLeave={() => setIsHovering(0)}
            onClick={() => handleRate(star)}
            className={`text-2xl ${
              star <= (isHovering || userRating || rating.average) 
                ? 'text-yellow-400' 
                : 'text-gray-600'
            } hover:text-yellow-400 transition-colors`}
          >
            ★
          </button>
        ))}
      </div>
      <div className="text-sm text-gray-400">
        {rating.average.toFixed(1)} ({rating.count} {rating.count === 1 ? 'rating' : 'ratings'})
      </div>
    </div>
  )
} 