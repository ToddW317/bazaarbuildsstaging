'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getBuilds } from '@/lib/buildService'
import { Build, BuildSortOption } from '@/types/types'
import BuildsGrid from '@/components/BuildsGrid'
import BuildsFilterSidebar from '@/components/BuildsFilterSidebar'
import BuildsNavigation from '@/components/BuildsNavigation'
import GoogleAd from '@/components/GoogleAd'
import BuildsDisabledBanner from '@/components/BuildsDisabledBanner'
import { trackEvent } from '@/lib/analytics'

export default function BuildsPage() {
  const [allBuilds, setAllBuilds] = useState<Build[]>([])
  const [filteredBuilds, setFilteredBuilds] = useState<Build[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  // Filter states
  const [selectedHero, setSelectedHero] = useState<string | null>(null)
  const [selectedBuildType, setSelectedBuildType] = useState<string | null>(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null)
  const [searchTag, setSearchTag] = useState<string>('')
  const [currentSort, setCurrentSort] = useState<BuildSortOption>('newest')

  // Load initial builds
  useEffect(() => {
    const loadBuilds = async () => {
      try {
        setIsLoading(true)
        const builds = await getBuilds()
        setAllBuilds(builds)
        applyFilters(builds)
        trackEvent('view_builds_page')
      } catch (error) {
        console.error('Error loading builds:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadBuilds()
  }, [])

  const applyFilters = (builds: Build[]) => {
    let filtered = [...builds]

    // Apply hero filter
    if (selectedHero) {
      filtered = filtered.filter(build => build.heroId === selectedHero)
      trackEvent('filter_by_hero', { hero: selectedHero })
    }

    // Apply build type filter
    if (selectedBuildType) {
      filtered = filtered.filter(build => build.buildType === selectedBuildType)
      trackEvent('filter_by_build_type', { type: selectedBuildType })
    }

    // Apply difficulty filter
    if (selectedDifficulty) {
      filtered = filtered.filter(build => build.difficulty === selectedDifficulty)
      trackEvent('filter_by_difficulty', { difficulty: selectedDifficulty })
    }

    // Apply tag filter
    if (searchTag) {
      filtered = filtered.filter(build => 
        build.tags?.some(tag => 
          tag.toLowerCase().includes(searchTag.toLowerCase())
        )
      )
      trackEvent('filter_by_tag', { tag: searchTag })
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (currentSort) {
        case 'popular':
          return (b.likes?.length || 0) - (a.likes?.length || 0)
        case 'mostViewed':
          return (b.views || 0) - (a.views || 0)
        case 'topRated':
          return (b.rating?.average || 0) - (a.rating?.average || 0)
        default: // 'newest'
          return b.createdAt.getTime() - a.createdAt.getTime()
      }
    })

    setFilteredBuilds(filtered)
  }

  const handleSortChange = (sort: BuildSortOption) => {
    setCurrentSort(sort)
    trackEvent('sort_builds', { sort_by: sort })
    applyFilters(allBuilds)
  }

  const handleTagSearch = (tag: string) => {
    setSearchTag(tag)
    applyFilters(allBuilds)
  }

  const handleHeroFilter = (hero: string | null) => {
    setSelectedHero(hero)
    applyFilters(allBuilds)
  }

  const handleBuildTypeFilter = (type: string | null) => {
    setSelectedBuildType(type)
    applyFilters(allBuilds)
  }

  const handleDifficultyFilter = (difficulty: string | null) => {
    setSelectedDifficulty(difficulty)
    applyFilters(allBuilds)
  }

  const clearFilters = () => {
    setSelectedHero(null)
    setSelectedBuildType(null)
    setSelectedDifficulty(null)
    setSearchTag('')
    setCurrentSort('newest')
    trackEvent('clear_filters')
    applyFilters(allBuilds)
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <BuildsDisabledBanner />
      {/* Top ad */}
      <GoogleAd slot="YOUR_AD_SLOT_1" />

      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Community Builds</h1>
          <p className="text-gray-400">Discover and share the best builds for The Bazaar</p>
        </div>
        
        <Link 
          href="/builds/new"
          className="mt-4 md:mt-0 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Submit Build
        </Link>
      </div>

      <BuildsNavigation />
      
      <div className="flex flex-col md:flex-row gap-6 mt-6">
        <BuildsFilterSidebar 
          className="md:w-64 flex-shrink-0"
          onSortChange={handleSortChange}
          onTagSearch={handleTagSearch}
          onHeroFilter={handleHeroFilter}
          onBuildTypeFilter={handleBuildTypeFilter}
          onDifficultyFilter={handleDifficultyFilter}
          activeFilters={{
            hero: selectedHero,
            buildType: selectedBuildType,
            difficulty: selectedDifficulty,
            tag: searchTag,
            sort: currentSort
          }}
        />

        <div className="flex-grow">
          {/* Ad before content */}
          <GoogleAd slot="YOUR_AD_SLOT_2" />

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-400">Loading builds...</p>
            </div>
          ) : filteredBuilds.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">No builds found matching your filters</p>
              <button
                onClick={clearFilters}
                className="mt-4 text-blue-400 hover:text-blue-300 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              <BuildsGrid initialBuilds={filteredBuilds} />
              {/* Ad after content */}
              <GoogleAd slot="YOUR_AD_SLOT_3" />
            </>
          )}

          {/* Bottom ad */}
          <GoogleAd slot="YOUR_AD_SLOT_4" />
        </div>
      </div>
    </div>
  )
}