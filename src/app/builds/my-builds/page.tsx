import { myBuildsMetadata } from '../../metadata'
import { MyBuildsPageWrapper } from '@/components/ClientWrapper'

export const metadata = myBuildsMetadata

export default function Page() {
  return <MyBuildsPageWrapper />
} 