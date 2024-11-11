'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export default function BuildsNavigation() {
  const pathname = usePathname()
  const { user } = useAuth()

  const tabs = [
    { name: 'All Builds', href: '/builds' },
    { name: 'My Builds', href: '/builds/my-builds', requiresAuth: true },
    { name: 'Liked Builds', href: '/builds/liked', requiresAuth: true },
  ]

  return (
    <div className="border-b border-gray-700">
      <nav className="-mb-px flex space-x-8">
        {tabs.map((tab) => {
          if (tab.requiresAuth && !user) return null;
          
          const isActive = pathname === tab.href
          
          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`
                whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
                ${isActive 
                  ? 'border-blue-500 text-blue-500'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'}
              `}
            >
              {tab.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
} 