export interface Card {
  id: string;
  name: string;
  cardType: 'Item' | 'Skill' | string;
  size: 'Small' | 'Medium' | 'Large';
  tier: 'Bronze' | 'Silver' | 'Gold' | string;
  isLegendary: boolean;
  castTime?: number;
  stats?: {
    damage?: number;
    heal?: number;
    shield?: number;
    burn?: number;
    poison?: number;
    critChance?: number;
    cooldown?: number;
    ammo?: number;
  };
  effects?: string[];
} 