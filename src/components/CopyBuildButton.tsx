'use client'

import { useState } from 'react'
import { Build } from '@/types/types'

interface CopyBuildButtonProps {
  build: Build
  buildId: string
}

export default function CopyBuildButton({ build, buildId }: CopyBuildButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      const url = `${window.location.origin}/builds/${buildId}`
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy build:', error)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 
        rounded-lg text-white transition-colors duration-200"
    >
      <span>{copied ? '✓ Copied!' : 'Copy URL'}</span>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-5 w-5" 
        viewBox="0 0 20 20" 
        fill="currentColor"
      >
        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
      </svg>
    </button>
  )
}
