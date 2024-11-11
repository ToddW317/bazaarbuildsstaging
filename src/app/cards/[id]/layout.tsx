import { Metadata } from 'next'
import CreditBanner from '@/components/CreditBanner'
import WIPBadge from '@/components/WIPBadge'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Card Details | BazaarBuilds',
  description: 'View detailed information about this card.'
}

export default function CardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-900">
      <CreditBanner />
      <WIPBadge />
      <div className="max-w-[2000px] mx-auto px-4 py-4">
        <Link 
          href="/cards"
          className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-4"
        >
          ← Back to Cards
        </Link>
        {children}
      </div>
    </div>
  )
} 