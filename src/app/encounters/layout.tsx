import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PvE Encounters | BazaarBuilds',
  description: 'Browse all PvE encounters and their rewards in The Bazaar.'
}

export default function EncountersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 