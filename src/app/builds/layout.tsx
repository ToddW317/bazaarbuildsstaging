import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Community Builds | BazaarBuilds',
  description: 'Discover and share the best builds for The Bazaar.'
}

export default function BuildsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 