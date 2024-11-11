'use client'

import { useEffect } from 'react'

export default function GoogleAd() {
  useEffect(() => {
    try {
      // Only initialize Google Auto Ads once
      if (typeof window !== 'undefined' && !window.googletag) {
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      }
    } catch (err) {
      console.error('Error initializing Google Ads:', err)
    }
  }, [])

  // Don't render anything since we're using Auto Ads
  return null
} 