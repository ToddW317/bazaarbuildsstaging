'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getBuilds } from '@/lib/buildService';
import { Build, BuildSortOption } from '@/types/types';
import BuildsGrid from '@/components/BuildsGrid';
import BuildsFilterSidebar from '@/components/BuildsFilterSidebar';
import BuildsNavigation from '@/components/BuildsNavigation';
import GoogleAd from '@/components/GoogleAd';
import { useAuth } from '@/contexts/AuthContext';

export default function BuildsPage() {
  const { user } = useAuth();
  const [builds, setBuilds] = useState<Build[]>([]);
  const [filteredBuilds, setFilteredBuilds] = useState<Build[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedHero, setSelectedHero] = useState<string | null>(null);
  const [selectedBuildType, setSelectedBuildType] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [searchTag, setSearchTag] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSort, setCurrentSort] = useState<BuildSortOption>('newest');

  useEffect(() => {
    async function loadBuilds() {
      try {
        setIsLoading(true);
        const fetchedBuilds = await getBuilds();
        setBuilds(fetchedBuilds);
        setFilteredBuilds(fetchedBuilds);
      } catch (error) {
        console.error('Error loading builds:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadBuilds();
  }, []);

  const handleSortChange = (sort: BuildSortOption) => {
    setCurrentSort(sort);
    applyFilters(builds);
  };

  const handleTagSearch = (tag: string) => {
    setSearchTag(tag);
    applyFilters(builds);
  };

  const handleHeroFilter = (hero: string | null) => {
    setSelectedHero(hero);
    applyFilters(builds);
  };

  const handleBuildTypeFilter = (type: string | null) => {
    setSelectedBuildType(type);
    applyFilters(builds);
  };

  const handleDifficultyFilter = (difficulty: string | null) => {
    setSelectedDifficulty(difficulty);
    applyFilters(builds);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyFilters(builds);
  };

  const applyFilters = (builds: Build[]) => {
    let filtered = [...builds];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(build => 
        build.title.toLowerCase().includes(query) ||
        build.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }

    if (selectedHero) {
      filtered = filtered.filter(build => build.heroId === selectedHero);
    }

    if (selectedBuildType) {
      filtered = filtered.filter(build => build.buildType === selectedBuildType);
    }

    if (selectedDifficulty) {
      filtered = filtered.filter(build => build.difficulty === selectedDifficulty);
    }

    if (searchTag) {
      filtered = filtered.filter(build => 
        build.tags?.some(tag => 
          tag.toLowerCase().includes(searchTag.toLowerCase())
        )
      );
    }

    filtered.sort((a, b) => {
      switch (currentSort) {
        case 'popular':
          return (b.likes?.length || 0) - (a.likes?.length || 0);
        case 'mostViewed':
          return (b.views || 0) - (a.views || 0);
        case 'topRated':
          return (b.rating?.average || 0) - (a.rating?.average || 0);
        default:
          return b.createdAt.getTime() - a.createdAt.getTime();
      }
    });

    setFilteredBuilds(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <GoogleAd slot="YOUR_AD_SLOT_1" />

        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Community Builds</h1>
            <p className="text-gray-400">Discover and share the best builds for The Bazaar</p>
          </div>
          
          <Link 
            href="/builds/new"
            className="mt-4 md:mt-0 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Submit Build
          </Link>
        </div>

        <div className="mb-6">
          <BuildsNavigation />
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <aside className="w-full md:w-64 flex-shrink-0">
            <BuildsFilterSidebar
              className="md:w-64 flex-shrink-0"
              onSortChange={handleSortChange}
              onTagSearch={handleTagSearch}
              onHeroFilter={handleHeroFilter}
              onBuildTypeFilter={handleBuildTypeFilter}
              onDifficultyFilter={handleDifficultyFilter}
              onSearch={handleSearch}
              searchValue={searchQuery}
              activeFilters={{
                hero: selectedHero,
                buildType: selectedBuildType,
                difficulty: selectedDifficulty,
                tag: searchTag,
                sort: currentSort
              }}
            />
          </aside>

          <main className="flex-grow">
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-gray-400">Loading builds...</p>
              </div>
            ) : filteredBuilds.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400">No builds found</p>
              </div>
            ) : (
              <div className="space-y-6">
                <GoogleAd slot="YOUR_AD_SLOT_2" />
                
                <BuildsGrid initialBuilds={filteredBuilds} />
                
                <GoogleAd slot="YOUR_AD_SLOT_3" />
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
} 