'use client'

import dynamic from 'next/dynamic'

const BuildsPage = dynamic(() => import('@/components/pages/BuildsPage'), {
  ssr: false
})

const NewBuildPage = dynamic(() => import('@/components/pages/NewBuildPage'), {
  ssr: false
})

const MyBuildsPage = dynamic(() => import('@/components/pages/MyBuildsPage'), {
  ssr: false
})

const LikedBuildsPage = dynamic(() => import('@/components/pages/LikedBuildsPage'), {
  ssr: false
})

const ProfilePage = dynamic(() => import('@/components/pages/ProfilePage'), {
  ssr: false
})

export function BuildsPageWrapper() {
  return <BuildsPage />
}

export function NewBuildPageWrapper() {
  return <NewBuildPage />
}

export function MyBuildsPageWrapper() {
  return <MyBuildsPage />
}

export function LikedBuildsPageWrapper() {
  return <LikedBuildsPage />
}

export function ProfilePageWrapper() {
  return <ProfilePage />
} 