import { likedBuildsMetadata } from '../../metadata'
import { LikedBuildsPageWrapper } from '@/components/ClientWrapper'

export const metadata = likedBuildsMetadata

export default function Page() {
  return <LikedBuildsPageWrapper />
} 