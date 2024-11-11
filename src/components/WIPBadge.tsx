'use client'

import React from 'react'

export default function WIPBadge() {
  return (
    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 m-4 z-50">
      <div className="bg-yellow-500 text-black px-6 py-2 rounded-full font-bold text-lg shadow-lg 
        animate-pulse border-2 border-yellow-400 backdrop-blur-sm">
        WIP
      </div>
    </div>
  )
} 