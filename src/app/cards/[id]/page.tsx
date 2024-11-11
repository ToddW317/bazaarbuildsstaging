import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import encounterData from '@/data/out.json'
import { Item } from '@/types/encounters'
import CardDetailsContent from '@/components/CardDetailsContent'

interface Props {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const items = encounterData.items as unknown as Record<string, Item>
  const item = items[params.id]

  if (!item) {
    return {
      title: 'Card Not Found | BazaarBuilds',
      description: 'The requested card could not be found.'
    }
  }

  return {
    title: `${item.InternalName} | BazaarBuilds`,
    description: `Details for ${item.InternalName} card in The Bazaar.`
  }
}

export default async function CardPage({ params }: Props) {
  const items = encounterData.items as unknown as Record<string, Item>
  const item = items[params.id]

  if (!item) {
    notFound()
  }

  return <CardDetailsContent item={item} itemId={params.id} />
} 