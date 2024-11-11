'use client'

import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export default function Navbar() {
  const { user, signOut } = useAuth()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const isActive = (path: string) => {
    return pathname === path ? 'text-white' : 'text-gray-300 hover:text-white'
  }

  const navItems = [
    { path: '/builds', label: 'Builds' },
    { path: '/cards', label: 'Cards' },
    { path: '/skills', label: 'Skills' },
    { path: '/encounters', label: 'Encounters' },
  ]

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Desktop Navigation */}
          <div className="flex">
            <motion.div 
              className="flex-shrink-0 flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link href="/" className="flex items-center font-bold text-xl">
                <span className="text-white">Bazaar</span>
                <span className="text-blue-500">Builds</span>
                <span className="text-gray-400 text-sm translate-y-1 ml-1">.com</span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              {navItems.map((item) => (
                <Link 
                  key={item.path}
                  href={item.path} 
                  className={`inline-flex items-center px-1 pt-1 border-b-2 ${
                    pathname === item.path
                      ? 'border-blue-500 text-white'
                      : 'border-transparent text-gray-300 hover:text-white hover:border-gray-300'
                  } transition-colors`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Support Links - Hidden on mobile */}
            <div className="hidden sm:flex items-center gap-2">
              <motion.a
                href="https://www.buymeacoffee.com/twopercent"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-yellow-500/10 text-yellow-300 
                  hover:bg-yellow-500/20 rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-lg">☕</span>
                <span className="text-sm">Support</span>
              </motion.a>

              <motion.a
                href="https://discord.gg/fTDYsrkThG"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 text-indigo-300 
                  hover:bg-indigo-500/20 rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                <span className="text-sm">Discord</span>
              </motion.a>
            </div>

            {/* Auth Buttons */}
            <div className="hidden sm:flex items-center gap-2">
              {user ? (
                <div className="flex items-center gap-4">
                  <Link 
                    href="/profile"
                    className={`inline-flex items-center px-1 pt-1 ${isActive('/profile')}`}
                  >
                    Profile
                  </Link>
                  <motion.button
                    onClick={() => signOut()}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Sign Out
                  </motion.button>
                </div>
              ) : (
                <motion.button
                  onClick={() => {
                    handleGoogleSignIn();
                    setIsOpen(false);
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign In with Google
                </motion.button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 
                  hover:text-white hover:bg-gray-700 focus:outline-none"
                whileTap={{ scale: 0.95 }}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-800">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === item.path
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile Support Links */}
              <div className="flex gap-2 px-3 py-2">
                <motion.a
                  href="https://www.buymeacoffee.com/twopercent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-2 bg-yellow-500/10 text-yellow-300 rounded-lg"
                  whileTap={{ scale: 0.95 }}
                >
                  Support
                </motion.a>
                <motion.a
                  href="https://discord.gg/fTDYsrkThG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-2 bg-indigo-500/10 text-indigo-300 rounded-lg"
                  whileTap={{ scale: 0.95 }}
                >
                  Discord
                </motion.a>
              </div>

              {/* Mobile Auth Buttons */}
              <div className="px-3 py-2">
                {user ? (
                  <div className="space-y-2">
                    <Link
                      href="/profile"
                      className="block text-center py-2 text-gray-300 hover:text-white"
                      onClick={() => setIsOpen(false)}
                    >
                      Profile
                    </Link>
                    <motion.button
                      onClick={() => {
                        signOut();
                        setIsOpen(false);
                      }}
                      className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      whileTap={{ scale: 0.95 }}
                    >
                      Sign Out
                    </motion.button>
                  </div>
                ) : (
                  <motion.button
                    onClick={() => {
                      handleGoogleSignIn();
                      setIsOpen(false);
                    }}
                    className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    whileTap={{ scale: 0.95 }}
                  >
                    Sign In with Google
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
} 