export const heroColors = {
  'Jules': {
    bg: 'bg-orange-900/20',
    text: 'text-orange-300',
    ring: 'ring-orange-500/50'
  },
  'Dooley': {
    bg: 'bg-cyan-900/20',
    text: 'text-cyan-300',
    ring: 'ring-cyan-500/50'
  },
  'Stelle': {
    bg: 'bg-yellow-900/20',
    text: 'text-yellow-300',
    ring: 'ring-yellow-500/50'
  },
  'Pygmalien': {
    bg: 'bg-emerald-900/20',
    text: 'text-emerald-300',
    ring: 'ring-emerald-500/50'
  },
  'Vanessa': {
    bg: 'bg-blue-900/20',
    text: 'text-blue-300',
    ring: 'ring-blue-500/50'
  },
  'Common': {
    bg: 'bg-purple-900/20',
    text: 'text-purple-300',
    ring: 'ring-purple-500/50'
  }
} as const;

export const tierStyles = {
  Bronze: 'border-amber-600 shadow-[0_0_15px_rgba(217,119,6,0.3)]',
  Silver: 'border-gray-400 shadow-[0_0_15px_rgba(156,163,175,0.3)]',
  Gold: 'border-yellow-400 shadow-[0_0_15px_rgba(251,191,36,0.3)]',
  Diamond: 'border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]'
} as const;

export const getTierColor = (tier: string): string => {
  switch (tier) {
    case 'Bronze':
      return 'text-amber-400';
    case 'Silver':
      return 'text-gray-300';
    case 'Gold':
      return 'text-yellow-400';
    case 'Diamond':
      return 'text-cyan-400';
    default:
      return 'text-gray-400';
  }
};

export const sizeWidths = {
  Small: 'w-1/4',
  Medium: 'w-1/3',
  Large: 'w-2/5'
} as const;
