'use client'

import { useAuth } from '@/contexts/AuthContext'
import { Build } from '@/types/types'
import BuildsGrid from './BuildsGrid'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function MyBuildsGrid({ builds }: { builds: Build[] }) {
  const { user, signInWithGoogle } = useAuth()
  const [myBuilds, setMyBuilds] = useState<Build[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      setMyBuilds([])
      setIsLoading(false)
      return
    }

    const userBuilds = builds.filter(build => build.userId === user.uid)
    userBuilds.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    
    setMyBuilds(userBuilds)
    setIsLoading(false)
  }, [user, builds])

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Please sign in to see your builds</p>
        <button
          onClick={() => signInWithGoogle()}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Sign In
        </button>
      </div>
    )
  }

  if (isLoading) {
    return <div className="text-center py-12">Loading your builds...</div>
  }

  return <BuildsGrid initialBuilds={myBuilds} />
} 