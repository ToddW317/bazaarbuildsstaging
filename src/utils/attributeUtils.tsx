import React from 'react';
import { 
  Crown, 
  Maximize2,
  Swords,
  Shield,
  Heart,
  Clock,
  DollarSign,
  Sparkles,
  Flame,
  Skull,
  Zap,
  Snowflake,
  Activity,
  Droplet,
  Timer,
  BadgeAlert,
  Coins
} from 'lucide-react';

export function getAttributeIcon(key: string): React.ReactNode {
  switch(key.toLowerCase()) {
    // Economy
    case 'buyprice':
      return <DollarSign className="w-4 h-4 text-red-400" />;
    case 'sellprice':
      return <DollarSign className="w-4 h-4 text-green-400" />;
    
    // Combat
    case 'damage':
      return <Swords className="w-4 h-4 text-red-400" />;
    case 'shield':
      return <Shield className="w-4 h-4 text-yellow-400" />;
    case 'healing':
    case 'heal':
      return <Heart className="w-4 h-4 text-green-400" />;
    case 'poison':
      return <Skull className="w-4 h-4 text-purple-400" />;
    case 'burn':
      return <Flame className="w-4 h-4 text-orange-400" />;
    case 'freeze':
      return <Snowflake className="w-4 h-4 text-cyan-400" />;
    
    // Timing
    case 'duration':
      return <Clock className="w-4 h-4 text-yellow-400" />;
    case 'cooldown':
    case 'cooldownmax':
      return <Timer className="w-4 h-4 text-cyan-400" />;
    case 'casttime':
    case 'castspeed':
      return <Clock className="w-4 h-4 text-cyan-400" />;
    case 'haste':
      return <Zap className="w-4 h-4 text-yellow-400" />;
    
    // Special
    case 'multicast':
      return <Sparkles className="w-4 h-4 text-purple-400" />;
    case 'critchance':
      return <BadgeAlert className="w-4 h-4 text-red-400" />;
    case 'slow':
      return <Droplet className="w-4 h-4 text-blue-400" />;
    case 'income':
      return <Coins className="w-4 h-4 text-yellow-400" />;
    default:
      return null;
  }
}

export function getAttributeLabel(key: string): string {
  const labels: { [key: string]: string } = {
    // Economy
    BuyPrice: "Buy",
    SellPrice: "Sell",
    Income: "Income",
    
    // Combat
    Damage: "Damage",
    Shield: "Shield",
    Healing: "Heal",
    Heal: "Heal",
    Poison: "Poison",
    Burn: "Burn",
    Freeze: "Freeze",
    
    // Timing
    Duration: "Duration",
    Cooldown: "Cooldown",
    CooldownMax: "Cooldown",
    CastTime: "Cast Time",
    CastSpeed: "Cast Speed",
    Haste: "Haste",
    
    // Special
    Multicast: "Multicast",
    CritChance: "Crit",
    Slow: "Slow"
  }
  return labels[key] || key;
}

export function shouldShowAttribute(key: string, value: any): boolean {
  // Don't show multicast if it's 1
  if (key.toLowerCase() === 'multicast' && value === 1) return false;
  // Don't show zero values
  if (value === 0) return false;
  // Don't show null/undefined
  if (value === null || value === undefined) return false;
  return true;
} 