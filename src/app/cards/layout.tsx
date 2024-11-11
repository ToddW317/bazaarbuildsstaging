import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cards Database | BazaarBuilds',
  description: 'Browse and search all cards available in The Bazaar.'
}

export default function CardsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 