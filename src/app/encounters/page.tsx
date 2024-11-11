'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import encounterData from '@/data/out.json'
import EncounterDisplay from '@/components/EncounterDisplay'
import EncounterFilters from '@/components/EncounterFilters'

// Add a function to filter out test encounters
const isTestEncounter = (name: string) => {
  const testPatterns = [
    /template/i,
    /beta/i,
    /test/i,
    /dev/i,
    /debug/i,
    /example/i,
    /dummy/i
  ];
  
  return testPatterns.some(pattern => pattern.test(name));
};

export default function EncountersPage() {
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [expandedEncounter, setExpandedEncounter] = useState(searchParams.get('expand') || '')
  const [filteredEncounters, setFilteredEncounters] = useState<[string, any][]>([])

  // Initialize and sort encounters by level, excluding test encounters
  useEffect(() => {
    const sortedEncounters = Object.entries(encounterData.monsters || {})
      .filter(([name]) => !isTestEncounter(name))
      .sort((a, b) => (a[1].Level || 0) - (b[1].Level || 0));
    setFilteredEncounters(sortedEncounters);
  }, []);

  // Handle search parameter on mount and updates
  useEffect(() => {
    const searchQuery = searchParams.get('search')
    const expandQuery = searchParams.get('expand')
    
    if (searchQuery) {
      setSearch(searchQuery)
      handleSearch(searchQuery)
    }
    
    if (expandQuery) {
      setExpandedEncounter(expandQuery)
    }
  }, [searchParams])

  const handleSearch = (value: string) => {
    setSearch(value)
    if (!value) {
      // If no search, show all encounters sorted by level (excluding test encounters)
      const sortedEncounters = Object.entries(encounterData.monsters || {})
        .filter(([name]) => !isTestEncounter(name))
        .sort((a, b) => (a[1].Level || 0) - (b[1].Level || 0));
      setFilteredEncounters(sortedEncounters);
      return;
    }

    // Filter and maintain sort order
    const filtered = Object.entries(encounterData.monsters || {})
      .filter(([name]) => 
        !isTestEncounter(name) && name.toLowerCase().includes(value.toLowerCase())
      )
      .sort((a, b) => (a[1].Level || 0) - (b[1].Level || 0));
    
    setFilteredEncounters(filtered);
  }

  return (
    <main className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-[2000px] mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Encounters</h1>
          <EncounterFilters 
            search={search}
            onSearchChange={handleSearch}
          />
        </div>
        
        <div className="space-y-4">
          {filteredEncounters.map(([name, monster]) => (
            <EncounterDisplay
              key={name}
              name={name}
              monster={monster}
              isExpanded={name === expandedEncounter}
              onToggle={() => setExpandedEncounter(name === expandedEncounter ? '' : name)}
            />
          ))}
          
          {filteredEncounters.length === 0 && (
            <div className="text-center text-gray-400 py-8">
              No encounters found matching your search.
            </div>
          )}
        </div>
      </div>
    </main>
  )
}