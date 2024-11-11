'use client'

import { Suspense } from 'react'
import { getBuilds } from '@/lib/buildService'
import BuildsGrid from '@/components/BuildsGrid'
import Link from 'next/link'
import BuildsNavigation from '@/components/BuildsNavigation'
import MyBuildsGrid from '@/components/MyBuildsGrid'
import { useEffect, useState } from 'react'
import { Build } from '@/types/types'

export default function MyBuildsPage() {
  const [builds, setBuilds] = useState<Build[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadBuilds = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const loadedBuilds = await getBuilds()
        console.log('Loaded builds:', loadedBuilds.length)
        setBuilds(loadedBuilds)
      } catch (err) {
        console.error('Error loading builds:', err)
        setError('Failed to load builds')
      } finally {
        setIsLoading(false)
      }
    }
    loadBuilds()
  }, [])

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Builds</h1>
          <p className="text-gray-600">Builds you've created</p>
        </div>
        
        <Link 
          href="/builds/new"
          className="mt-4 md:mt-0 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Create New Build
        </Link>
      </div>

      <BuildsNavigation />

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-gray-300">Loading builds...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-400">{error}</p>
        </div>
      ) : (
        <MyBuildsGrid builds={builds} />
      )}
    </div>
  )
} 