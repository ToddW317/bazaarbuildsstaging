'use client'

import { Build } from '@/types/types'
import { useState, useEffect } from 'react'
import BuildCard from './BuildCard'
import { db } from '@/lib/firebase'
import { doc, onSnapshot } from 'firebase/firestore'

interface BuildsGridProps {
  initialBuilds: Build[]
}

export default function BuildsGrid({ initialBuilds }: BuildsGridProps) {
  const [builds, setBuilds] = useState<Build[]>(initialBuilds || [])

  // Update builds when initialBuilds changes
  useEffect(() => {
    console.log('BuildsGrid received builds:', initialBuilds)
    setBuilds(initialBuilds || [])
  }, [initialBuilds])

  // Set up individual subscriptions for each build to track view counts
  useEffect(() => {
    if (!builds || builds.length === 0) return

    const buildSubscriptions = builds.map(build => {
      const buildRef = doc(db, 'builds', build.id)
      return onSnapshot(buildRef, (doc) => {
        if (doc.exists()) {
          setBuilds(prevBuilds => 
            prevBuilds.map(prevBuild => 
              prevBuild.id === build.id 
                ? { ...prevBuild, ...doc.data(), id: doc.id } as Build
                : prevBuild
            )
          )
        }
      })
    })

    return () => {
      buildSubscriptions.forEach(unsubscribe => unsubscribe())
    }
  }, [builds])

  if (!builds || builds.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-300">No builds found</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {builds.map(build => (
        <BuildCard key={build.id} build={build} />
      ))}
    </div>
  )
} 