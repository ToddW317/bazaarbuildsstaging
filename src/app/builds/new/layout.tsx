import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Build | BazaarBuilds',
  description: 'Create and share your own build for The Bazaar.'
}

export default function NewBuildLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 