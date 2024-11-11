'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import BuildsNavigation from '@/components/BuildsNavigation'
import LikedBuildsGrid from '@/components/LikedBuildsGrid'
import { useEffect, useState } from 'react'
import { Build } from '@/types/types'
import { getBuilds } from '@/lib/buildService'

export default function LikedBuildsPage() {
  const [builds, setBuilds] = useState<Build[]>([])

  useEffect(() => {
    const loadBuilds = async () => {
      const loadedBuilds = await getBuilds()
      setBuilds(loadedBuilds)
    }
    loadBuilds()
  }, [])

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Liked Builds</h1>
          <p className="text-gray-600">Builds you've marked as favorites</p>
        </div>
        
        <Link 
          href="/builds/new"
          className="mt-4 md:mt-0 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Create New Build
        </Link>
      </div>

      <BuildsNavigation />

      <Suspense fallback={<div>Loading liked builds...</div>}>
        <LikedBuildsGrid builds={builds} />
      </Suspense>
    </div>
  )
} 