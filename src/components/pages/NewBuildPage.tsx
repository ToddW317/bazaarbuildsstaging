'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useAuth } from '@/contexts/AuthContext'
import { createBuild } from '@/lib/buildService'
import { HEROES } from '@/config/heroes'
import { BuildType } from '@/types/types'
import TagInput from '@/components/TagInput'

export default function NewBuildPage() {
  // Copy all the content from builds/new/page.tsx here
  // Remove the metadata export
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Your existing JSX */}
    </div>
  )
} 