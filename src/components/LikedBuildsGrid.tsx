'use client'

import { Build } from '@/types/types'
import { useAuth } from '@/contexts/AuthContext'
import BuildsGrid from './BuildsGrid'
import { useEffect, useState } from 'react'

interface LikedBuildsGridProps {
  builds: Build[]
}

export default function LikedBuildsGrid({ builds }: LikedBuildsGridProps) {
  const { user, signInWithGoogle } = useAuth()
  const [likedBuilds, setLikedBuilds] = useState<Build[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    if (!user || !builds) {
      setLikedBuilds([])
      setIsLoading(false)
      return
    }

    const filtered = builds.filter(build => 
      build && build.likedBy?.includes(user.uid)
    )
    setLikedBuilds(filtered)
    setIsLoading(false)
  }, [builds, user])
  
  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">Please sign in to see your liked builds</p>
        <button
          onClick={() => signInWithGoogle()}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Sign In
        </button>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Loading your liked builds...</p>
      </div>
    )
  }

  return <BuildsGrid initialBuilds={likedBuilds} />
} 