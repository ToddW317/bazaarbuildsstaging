import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Profile | BazaarBuilds',
  description: 'View and edit your BazaarBuilds profile.'
}

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 