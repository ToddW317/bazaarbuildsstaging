'use client'

import { useEffect, useCallback } from 'react'
import Image from 'next/image'

interface ImageModalProps {
  src: string
  alt: string
  onClose: () => void
}

export default function ImageModal({ src, alt, onClose }: ImageModalProps) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }, [onClose])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden' // Prevent scrolling when modal is open
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'auto' // Restore scrolling when modal closes
    }
  }, [handleKeyDown])

  return (
    <div 
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="relative max-w-7xl w-full max-h-[90vh] aspect-video"
        onClick={e => e.stopPropagation()}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          sizes="100vw"
          priority
        />
      </div>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 
          transition-colors text-4xl"
        aria-label="Close modal"
      >
        ×
      </button>
    </div>
  )
} 