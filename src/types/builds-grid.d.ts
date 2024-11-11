import { Build } from './types';

interface BuildsGridProps {
  builds: Build[];
}

declare module '@/components/BuildsGrid' {
  const BuildsGrid: React.FC<BuildsGridProps>;
  export default BuildsGrid;
} 