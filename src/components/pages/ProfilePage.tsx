'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { getBuildsByUserId, getBuildById } from '@/lib/buildService'
import { Build } from '@/types/types'
import Link from 'next/link'
import { updateProfile } from 'firebase/auth'
import { getUserStats } from '@/lib/statsService'

export default function ProfilePage() {
  const { user } = useAuth()
  const [userBuilds, setUserBuilds] = useState<Build[]>([])
  const [likedBuilds, setLikedBuilds] = useState<Build[]>([])
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [newDisplayName, setNewDisplayName] = useState('')
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [updateError, setUpdateError] = useState('')
  const [showEmail, setShowEmail] = useState(false)

  // Stats
  const [stats, setStats] = useState({
    totalBuilds: 0,
    totalLikes: 0,
    totalViews: 0,
    averageViewsPerBuild: 0,
    averageLikesPerBuild: 0,
    mostLikedBuild: null as Build | null,
    mostViewedBuild: null as Build | null,
    recentlyViewedBuild: null as Build | null,
    engagementRate: 0, // likes/views ratio
  })

  useEffect(() => {
    async function fetchUserData() {
      if (!user) return

      try {
        // Fetch user's builds
        const builds = await getBuildsByUserId(user.uid)
        setUserBuilds(builds)

        // Calculate stats
        const totalLikes = builds.reduce((sum, build) => sum + (build.likes || 0), 0)
        const totalViews = builds.reduce((sum, build) => sum + (build.views || 0), 0)
        const avgViews = builds.length > 0 ? totalViews / builds.length : 0
        const avgLikes = builds.length > 0 ? totalLikes / builds.length : 0
        const engagementRate = totalViews > 0 ? (totalLikes / totalViews) * 100 : 0

        const mostLiked = builds.reduce((prev, curr) => 
          (curr.likes || 0) > (prev?.likes || 0) ? curr : prev, builds[0])
        const mostViewed = builds.reduce((prev, curr) => 
          (curr.views || 0) > (prev?.views || 0) ? curr : prev, builds[0])
        
        // Sort by last viewed/updated
        const recentlyViewed = [...builds]
          .sort((a, b) => (b.lastViewed || 0) - (a.lastViewed || 0))[0]

        setStats({
          totalBuilds: builds.length,
          totalLikes,
          totalViews,
          averageViewsPerBuild: Math.round(avgViews * 10) / 10,
          averageLikesPerBuild: Math.round(avgLikes * 10) / 10,
          mostLikedBuild: mostLiked || null,
          mostViewedBuild: mostViewed || null,
          recentlyViewedBuild: recentlyViewed || null,
          engagementRate: Math.round(engagementRate * 100) / 100,
        })

        // Set initial display name
        setNewDisplayName(user.displayName || '')

      } catch (error) {
        console.error('Error fetching user data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [user])

  const handleUpdateProfile = async () => {
    if (!user) return

    try {
      await updateProfile(user, {
        displayName: newDisplayName,
      })
      setUpdateSuccess(true)
      setIsEditing(false)
      setTimeout(() => setUpdateSuccess(false), 3000)
    } catch (error) {
      console.error('Error updating profile:', error)
      setUpdateError('Failed to update profile')
      setTimeout(() => setUpdateError(''), 3000)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-8">Profile</h1>
          <p className="text-gray-400">Please sign in to view your profile.</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-8">Profile</h1>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Profile Header */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              {user.photoURL && (
                <img 
                  src={user.photoURL} 
                  alt={user.displayName || 'User'} 
                  className="w-16 h-16 rounded-full"
                />
              )}
              <div>
                {isEditing ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={newDisplayName}
                      onChange={(e) => setNewDisplayName(e.target.value)}
                      className="bg-gray-700 text-white px-3 py-1 rounded"
                      placeholder="Enter new username"
                    />
                    <button
                      onClick={handleUpdateProfile}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <h1 className="text-2xl font-bold text-white">
                        {user.displayName || 'Anonymous User'}
                      </h1>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="text-gray-400 hover:text-white"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      {showEmail ? (
                        <p className="text-gray-400">{user.email}</p>
                      ) : (
                        <button
                          onClick={() => setShowEmail(true)}
                          className="text-gray-400 hover:text-white text-sm"
                        >
                          Show Email
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">Total Builds</h3>
              <p className="text-3xl font-bold text-blue-400">{stats.totalBuilds}</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">Total Likes</h3>
              <p className="text-3xl font-bold text-red-400">{stats.totalLikes}</p>
              <p className="text-sm text-gray-400">Avg: {stats.averageLikesPerBuild}/build</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">Total Views</h3>
              <p className="text-3xl font-bold text-green-400">{stats.totalViews}</p>
              <p className="text-sm text-gray-400">Avg: {stats.averageViewsPerBuild}/build</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">Engagement Rate</h3>
              <p className="text-3xl font-bold text-purple-400">{stats.engagementRate}%</p>
              <p className="text-sm text-gray-400">Likes per 100 views</p>
            </div>
          </div>

          {updateSuccess && (
            <div className="mt-4 text-green-400">Profile updated successfully!</div>
          )}
          {updateError && (
            <div className="mt-4 text-red-400">{updateError}</div>
          )}
        </div>

        {/* Recent Builds */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Recent Builds</h2>
            <Link 
              href="/builds/new"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create New Build
            </Link>
          </div>
          
          {userBuilds.length === 0 ? (
            <p className="text-gray-400">You haven't created any builds yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userBuilds.map(build => (
                <Link 
                  key={build.id} 
                  href={`/builds/${build.id}`}
                  className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors"
                >
                  <h3 className="text-xl font-bold text-white mb-2">{build.title}</h3>
                  <p className="text-gray-400 mb-4">{build.description}</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">👁️ {build.views || 0}</span>
                    <span className="text-gray-500">❤️ {build.likes || 0}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 