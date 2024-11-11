export const attributeIcons: Record<string, string> = {
  BuyPrice: '💰',
  SellPrice: '💵',
  DamageAmount: '⚔️',
  HealAmount: '💖',
  ShieldApplyAmount: '🛡️',
  SlowAmount: '🐌',
  SlowTargets: '🎯',
  FreezeAmount: '❄️',
  FreezeTargets: '🎯',
  Multicast: '🔄',
  Custom_0: '✨',
  PoisonAmount: '☠️',
  BurnAmount: '🔥'
}

export const tagIcons: Record<string, string> = {
  Vehicle: '🚗',
  Tool: '🔧',
  Weapon: '⚔️',
  // Add more as needed
}

export function decipherCustomAttribute(key: string): string {
  if (!key) return '';
  
  try {
    const words = key.split(/(?=[A-Z])/);
    return words.join(' ').trim();
  } catch (error) {
    console.error('Error deciphering attribute:', error);
    return key;
  }
} 