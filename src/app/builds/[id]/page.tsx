'use client'

import { getBuildById, incrementBuildViews } from '@/lib/buildService'
import { notFound, useParams } from 'next/navigation'
import BuildDetailsContent from '@/components/BuildDetailsContent'
import { useState, useEffect } from 'react'
import { Build } from '@/types/types'
import GoogleAd from '@/components/GoogleAd'

export default function BuildDetailsPage() {
  const params = useParams()
  const id = params.id as string
  const [build, setBuild] = useState<Build | null>(null)
  const [loading, setLoading] = useState(true)
  const [copySuccess, setCopySuccess] = useState(false)
  const [pageUrl, setPageUrl] = useState('')

  useEffect(() => {
    async function fetchBuild() {
      try {
        const buildData = await getBuildById(id)
        if (!buildData) {
          notFound()
        }
        setBuild(buildData)
        incrementBuildViews(id)
      } catch (error) {
        console.error('Error fetching build:', error)
        notFound()
      } finally {
        setLoading(false)
      }
    }

    setPageUrl(window.location.href)
    fetchBuild()
  }, [id])

  const handleCopyBuild = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl)
      setCopySuccess(true)
      
      setTimeout(() => {
        setCopySuccess(false)
      }, 2000)
    } catch (err) {
      console.error('Failed to copy build URL:', err)
      // Fallback for browsers that don't support clipboard API
      const textarea = document.createElement('textarea')
      textarea.value = pageUrl
      document.body.appendChild(textarea)
      textarea.select()
      try {
        document.execCommand('copy')
        setCopySuccess(true)
        setTimeout(() => {
          setCopySuccess(false)
        }, 2000)
      } catch (err) {
        console.error('Fallback copy failed:', err)
      }
      document.body.removeChild(textarea)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-white">Loading...</div>
        </div>
      </div>
    )
  }

  if (!build) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top ad */}
        <GoogleAd slot="YOUR_AD_SLOT_5" />

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">{build.title}</h1>
          <button
            onClick={handleCopyBuild}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 
              text-gray-200 rounded-lg transition-colors"
          >
            {copySuccess ? (
              <>
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Copied!</span>
              </>
            ) : (
              <>
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                  />
                </svg>
                <span>Copy Build URL</span>
              </>
            )}
          </button>
        </div>

        {/* Ad before content */}
        <GoogleAd slot="YOUR_AD_SLOT_6" />

        <BuildDetailsContent build={build} buildId={id} />

        {/* Bottom ad */}
        <GoogleAd slot="YOUR_AD_SLOT_7" />
      </div>
    </div>
  )
} 