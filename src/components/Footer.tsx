'use client'

import { useState } from 'react'

export default function Footer() {
  const [isBookOpen, setIsBookOpen] = useState(false)
  const [showContact, setShowContact] = useState(false)

  const handleBookClick = () => {
    if (isBookOpen) {
      setShowContact(true)
    } else {
      setIsBookOpen(true)
      setTimeout(() => setIsBookOpen(false), 2000) // Reset after animation
    }
  }

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright and Legal Links */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="text-gray-400 text-sm">
              © 2024 The Bazaar Builds. All rights reserved.
            </div>
            <div className="flex gap-4 text-sm">
              <a 
                href="/privacy"
                className="text-gray-400 hover:text-gray-300 transition-colors"
              >
                Privacy Policy
              </a>
              <span className="text-gray-600">•</span>
              <a 
                href="/terms"
                className="text-gray-400 hover:text-gray-300 transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
          
          {/* Discord Link */}
          <div className="flex items-center gap-4">
            <a 
              href="https://discord.gg/fTDYsrkThG"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              <span>Join the Discord to report bugs, suggest features, and see the dev roadmap!</span>
            </a>

            {/* Easter Egg Book Button */}
            <button
              onClick={handleBookClick}
              className={`
                transition-all duration-700 text-lg opacity-30 hover:opacity-40
                ${isBookOpen ? 'animate-pulse text-yellow-300 shadow-[0_0_10px_rgba(253,224,71,0.3)]' : ''}
              `}
            >
              {isBookOpen ? '📖✨' : '📚'}
            </button>
          </div>
        </div>
        
        {/* Hidden Contact Info */}
        {showContact && (
          <div className="mt-4 text-center animate-fade-in">
            <p className="text-purple-300 text-sm">
              Want to get in touch with Book?{' '}
              <a 
                href="https://discord.com/users/.boook" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 underline"
              >
                Find them on Discord
              </a>
            </p>
          </div>
        )}
      </div>
    </footer>
  )
} 