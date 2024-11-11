'use client'

import { Build } from '@/types/types'
import { HEROES } from '@/config/heroes'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import CommentSection from './comments/CommentSection'
import CommentErrorBoundary from './comments/CommentErrorBoundary'
import BuildRating from './BuildRating'
import ImageModal from './ImageModal'
import { useAuth } from '@/contexts/AuthContext'
import { toggleBuildLike } from '@/lib/buildService'
import CopyBuildButton from './CopyBuildButton'

interface BuildDetailsContentProps {
  build: Build
  buildId: string
}

export default function BuildDetailsContent({ build, buildId }: BuildDetailsContentProps) {
  const { user } = useAuth()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isLiked, setIsLiked] = useState(user ? build.likedBy?.includes(user.uid) : false)
  const [likeCount, setLikeCount] = useState(build.likes || 0)
  const hero = HEROES.find(h => h.id === build.heroId)

  const handleLike = async () => {
    if (!user) return

    try {
      const liked = await toggleBuildLike(buildId, user.uid)
      setIsLiked(liked)
      setLikeCount(prev => Math.max(0, liked ? prev + 1 : prev - 1))
    } catch (error) {
      console.error('Error toggling like:', error)
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <Link 
        href="/builds"
        className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6"
      >
        ← Back to Builds
      </Link>

      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
        {/* Hero Section - Updated for mobile */}
        <div className="bg-gray-900 p-4 md:p-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-4 text-white">{build.title}</h1>
              <div className="flex flex-wrap gap-3 text-gray-300">
                <div className="flex items-center">
                  <span className="font-medium">Hero:</span>
                  <span className="ml-2">{hero?.name}</span>
                </div>
                <div className="hidden md:block">•</div>
                <div className="flex items-center">
                  <span className="font-medium">Build Type:</span>
                  <span className="ml-2">{build.buildType}</span>
                </div>
                <div className="hidden md:block">•</div>
                <div className="flex items-center">
                  <span className="font-medium">Difficulty:</span>
                  <span className="ml-2">{build.difficulty}</span>
                </div>
              </div>
            </div>
            <div className="md:text-right">
              <div className="flex items-center space-x-4 mb-6">
                <BuildRating buildId={buildId} initialRating={build.rating} />
                <CopyBuildButton build={build} buildId={buildId} />
              </div>
            </div>
          </div>
        </div>

        {/* Screenshots Gallery - Updated grid for mobile */}
        <div className="p-4 md:p-8 border-t border-gray-700">
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-white">Screenshots</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {build.screenshots.map((screenshot, index) => (
              <div 
                key={index} 
                className="relative h-48 rounded-lg overflow-hidden cursor-pointer
                  transition-transform hover:scale-[1.02]"
                onClick={() => setSelectedImage(screenshot)}
              >
                <Image
                  src={screenshot}
                  alt={`Screenshot ${index + 1}`}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <ImageModal
            src={selectedImage}
            alt="Build screenshot"
            onClose={() => setSelectedImage(null)}
          />
        )}

        {/* Video Clip - Responsive container */}
        {build.videoClip && (
          <div className="p-4 md:p-8 border-t border-gray-700">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-white">Gameplay Clip</h2>
            <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-900">
              <video
                src={build.videoClip}
                controls
                className="w-full h-full"
                poster={build.screenshots[0]}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        )}

        {/* Description - Adjusted padding */}
        <div className="p-4 md:p-8 border-t border-gray-700">
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-white">Build Description</h2>
          <p className="text-gray-300 whitespace-pre-wrap">{build.description}</p>
        </div>

        {/* Tags - Responsive layout */}
        {build.tags && build.tags.length > 0 && (
          <div className="px-4 md:px-8 pb-4">
            <div className="flex flex-wrap gap-2">
              {build.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Metadata - Mobile-friendly layout */}
        <div className="bg-gray-900 p-4 md:p-8 border-t border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between gap-4 text-sm text-gray-400">
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-1 ${
                  isLiked ? 'text-red-400' : 'text-gray-400 hover:text-red-400'
                } transition-colors`}
              >
                <span>{isLiked ? '❤️' : '🤍'}</span>
                <span>{likeCount} likes</span>
              </button>
              <div className="flex items-center space-x-2">
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
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <span>{build.views || 0} views</span>
              </div>
              <div className="hidden sm:block">•</div>
              <span>Created by {build.creatorName || 'Anonymous User'}</span>
            </div>
            <div className="text-sm">
              Posted on {build.createdAt.toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Comments Section - Adjusted padding */}
        <div className="mt-4 md:mt-8 bg-gray-800 rounded-lg p-4 md:p-8 border border-gray-700">
          <CommentErrorBoundary>
            <CommentSection buildId={buildId} />
          </CommentErrorBoundary>
        </div>
      </div>
    </div>
  )
} 