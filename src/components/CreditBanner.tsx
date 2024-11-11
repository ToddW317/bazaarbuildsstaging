'use client'

import { useState } from 'react'

export default function CreditBanner() {
  const [isGlowing, setIsGlowing] = useState(false)

  return (
    <div className="bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 text-blue-300 px-4 py-3 border-b border-blue-500/30">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm md:text-base font-medium">
          A massive <span className="text-blue-200 font-bold">THANK YOU</span> to{' '}
          <button
            onClick={() => setIsGlowing(!isGlowing)}
            className={`
              transition-all duration-500 font-bold
              ${isGlowing 
                ? 'text-yellow-300 animate-pulse shadow-[0_0_15px_rgba(253,224,71,0.5)]' 
                : 'text-purple-300 hover:text-purple-200'
              }
            `}
          >
            {isGlowing ? '📖✨' : 'Book'}
          </button>{' '}
          for their incredible service with their item parser. This page would not be possible without them!
        </p>
      </div>
    </div>
  )
} 