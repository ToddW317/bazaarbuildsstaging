export function getTierColor(tier: string) {
  switch (tier) {
    case 'Bronze': return 'text-amber-600'
    case 'Silver': return 'text-gray-400'
    case 'Gold': return 'text-yellow-400'
    case 'Diamond': return 'text-cyan-400'
    case 'Legendary': return 'text-purple-400'
    default: return 'text-white'
  }
}

export const tierStyles = {
  Bronze: 'border-amber-600 shadow-[0_0_15px_rgba(217,119,6,0.3)]',
  Silver: 'border-gray-400 shadow-[0_0_15px_rgba(156,163,175,0.3)]',
  Gold: 'border-yellow-400 shadow-[0_0_15px_rgba(251,191,36,0.3)]',
  Diamond: 'border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]',
  Legendary: 'border-purple-400 shadow-[0_0_15px_rgba(147,51,234,0.3)]'
} as const;
