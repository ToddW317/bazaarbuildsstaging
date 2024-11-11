'use client'

import { useState } from 'react';
import { Item } from '@/types/encounters';
import Image from 'next/image';
import Link from 'next/link';
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
  Coins,
  Wrench,
  Package,
  Ban,
  Tags,
  Gem,
  Car,
  Beaker,
  Home,
} from 'lucide-react';
import { parseCardTooltip } from '@/utils/cardTooltipFormatter';
import { formatCardValue } from '@/utils/formatters';
import { getItemImagePath } from '@/utils/imageUtils';
import PlaceholderImage from '@/components/PlaceholderImage';
import EnchantmentBadge from './EnchantmentBadge';
import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ENCHANTMENTS } from './EnchantmentsDisplay';
import type { EnchantmentType } from './EnchantmentsDisplay';

interface CardDisplayProps {
  item: Item;
  itemId: string;
}

type EnchantmentTooltipProps = {
  enchantName: string;
  enchantData: EnchantmentType;
};

interface TierData {
  Attributes?: Record<string, any>;
  Tooltips?: string[];
  [key: string]: any;
}

type ItemTag = {
  type: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  borderColor: string;
};

const getItemTags = (item: Item): ItemTag[] => {
  const tags: ItemTag[] = [];
  
  // Add tags from the item's Tags array
  if (item.Tags && Array.isArray(item.Tags)) {
    item.Tags.forEach(tag => {
      switch(tag) {
        case 'Friend':
          tags.push({
            type: "Friend",
            icon: Crown,
            color: "#f472b6", // pink-400
            bgColor: "rgba(244, 114, 182, 0.1)",
            borderColor: "rgba(244, 114, 182, 0.2)"
          });
          break;
        case 'Tool':
          tags.push({
            type: "Tool",
            icon: Wrench,
            color: "#60a5fa", // blue-400
            bgColor: "rgba(96, 165, 250, 0.1)",
            borderColor: "rgba(96, 165, 250, 0.2)"
          });
          break;
        case 'Core':
          tags.push({
            type: "Core",
            icon: Gem,
            color: "#c084fc", // purple-400
            bgColor: "rgba(192, 132, 252, 0.1)",
            borderColor: "rgba(192, 132, 252, 0.2)"
          });
          break;
        case 'Weapon':
          tags.push({
            type: "Weapon",
            icon: Swords,
            color: "#ef4444", // red-500
            bgColor: "rgba(239, 68, 68, 0.1)",
            borderColor: "rgba(239, 68, 68, 0.2)"
          });
          break;
        case 'Aquatic':
          tags.push({
            type: "Aquatic",
            icon: Droplet,
            color: "#38bdf8", // sky-400
            bgColor: "rgba(56, 189, 248, 0.1)",
            borderColor: "rgba(56, 189, 248, 0.2)"
          });
          break;
        case 'Vehicle':
          tags.push({
            type: "Vehicle",
            icon: Car,
            color: "#a78bfa", // violet-400
            bgColor: "rgba(167, 139, 250, 0.1)",
            borderColor: "rgba(167, 139, 250, 0.2)"
          });
          break;
        case 'Potion':
          tags.push({
            type: "Potion",
            icon: Beaker,
            color: "#4ade80", // green-400
            bgColor: "rgba(74, 222, 128, 0.1)",
            borderColor: "rgba(74, 222, 128, 0.2)"
          });
          break;
        case 'Property':
          tags.push({
            type: "Property",
            icon: Home,
            color: "#fbbf24", // amber-400
            bgColor: "rgba(251, 191, 36, 0.1)",
            borderColor: "rgba(251, 191, 36, 0.2)"
          });
          break;
      }
    });
  }
  
  // Add special attribute-based tags
  if (item.Tiers?.[item.StartingTier || 'Bronze']?.sellPrice === 0) {
    tags.push({
      type: "Unsellable",
      icon: Ban,
      color: "#ef4444", // red-500
      bgColor: "rgba(239, 68, 68, 0.1)",
      borderColor: "rgba(239, 68, 68, 0.2)"
    });
  }

  // If no tags, add default Item tag
  if (tags.length === 0) {
    tags.push({
      type: "Item",
      icon: Package,
      color: "#4ade80", // green-400
      bgColor: "rgba(74, 222, 128, 0.1)",
      borderColor: "rgba(74, 222, 128, 0.2)"
    });
  }

  return tags;
};

export default function CardDisplay({ item, itemId }: CardDisplayProps) {
  const [selectedTier, setSelectedTier] = useState<string>(item.StartingTier || 'Bronze');
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState(getItemImagePath(item));

  const currentTierData = item.Tiers[selectedTier] || {};

  const getTierColor = (tier: string) => {
    switch(tier) {
      case 'Bronze':
        return 'text-amber-600';
      case 'Silver':
        return 'text-gray-400';
      case 'Gold':
        return 'text-yellow-400';
      case 'Diamond':
        return 'text-cyan-400';
      case 'Legendary':
        return 'text-purple-400';
      default:
        return 'text-gray-400';
    }
  };

  const getTypeTagStyle = (size: string) => {
    return {
      bg: 'bg-indigo-500/20',
      text: 'text-indigo-300',
      label: size || 'Unknown'
    }
  }

  const renderTooltip = (tooltip: string, attributes: Record<string, any> | undefined) => {
    const segments = parseCardTooltip(tooltip, attributes || {})

    return (
      <div className="flex flex-wrap items-start gap-x-1.5 gap-y-1 text-base leading-relaxed">
        {segments.map(({ id, text, color, Icon }) => (
          <span key={id} className="inline-flex items-center gap-1.5 whitespace-normal">
            {Icon && <Icon className={`w-5 h-5 flex-shrink-0 ${color}`} />}
            <span className={`${color ? `font-semibold ${color}` : 'text-gray-300'} break-words`}>
              {text}
            </span>
          </span>
        ))}
      </div>
    )
  }

  const getAllTooltips = (tierData: TierData) => {
    const tooltips: string[] = [];
    
    // Main tooltips
    if (Array.isArray(tierData.Tooltips)) {
      tooltips.push(...tierData.Tooltips.filter(t => typeof t === 'string' && t.trim() !== ''));
    }
    
    // Additional tooltip arrays
    Object.entries(tierData).forEach(([key, value]) => {
      if (key.toLowerCase().includes('tooltip') && 
          key !== 'Tooltips' && 
          Array.isArray(value)) {
        tooltips.push(...value.filter(t => typeof t === 'string' && t.trim() !== ''));
      }
    });

    return tooltips;
  };

  const handleImageError = () => {
    console.error(
      `[Missing Card Image]
      Name: "${item.InternalName}"
      ID: "${itemId}"
      Failed Path: "${imageSrc}"
      Size: "${item.Size}"
      Heroes: "${item.Heroes}"`
    );
    setImageError(true);
  };

  return (
    <Link href={`/cards/${itemId}`} className="block">
      <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500/50 
        transition-all duration-300 cursor-pointer h-full flex flex-col">
        {/* Header with Image */}
        <div className="relative">
          <div className="relative aspect-[16/12] w-full bg-gray-700">
            {!imageError ? (
              <Image
                src={imageSrc}
                alt={item.InternalName}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                onError={handleImageError}
                onLoad={() => setIsLoading(false)}
                priority={true}
              />
            ) : (
              <Image
                src="/items/default-item.png"
                alt="Default card image"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                priority={true}
              />
            )}
            {isLoading && <PlaceholderImage />}
            
            {/* Card Name Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <h3 className="text-lg font-bold text-white drop-shadow-lg">
                {item.InternalName}
              </h3>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4 flex-1 flex flex-col" onClick={(e) => e.preventDefault()}>
          {/* Tier Selection */}
          <div className="flex gap-1">
            {Object.keys(item.Tiers).map((tier) => (
              <button
                key={tier}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelectedTier(tier);
                }}
                className={`
                  px-2 py-1.5 rounded text-sm font-medium flex-1 transition-all
                  ${tier === selectedTier 
                    ? `${getTierColor(tier)} ring-1 ring-current` 
                    : 'text-gray-400 hover:text-gray-200'
                  }
                `}
              >
                {tier}
              </button>
            ))}
          </div>

          {/* Tags Section */}
          <div className="flex flex-wrap gap-2">
            {/* Size Tag */}
            {(() => {
              const typeStyle = getTypeTagStyle(item.Size)
              return (
                <span className={`px-3 py-1 ${typeStyle.bg} rounded flex items-center gap-1.5 text-sm ${typeStyle.text} font-medium`}>
                  <Maximize2 className="w-4 h-4" />
                  {typeStyle.label}
                </span>
              )
            })()}

            {/* Hero Tag */}
            {item.Heroes.length > 0 && (
              <span className="px-3 py-1 bg-purple-500/20 rounded flex items-center gap-1.5 text-sm text-purple-300">
                <Crown className="w-4 h-4" />
                {item.Heroes[0]}
              </span>
            )}

            {/* Item Type Tags */}
            {(() => {
              const itemTags = getItemTags(item);
              if (itemTags.length <= 1) {
                // If only one tag, show it directly
                const tag = itemTags[0];
                return (
                  <span 
                    className="px-3 py-1 rounded flex items-center gap-1.5 text-sm font-medium"
                    style={{ 
                      backgroundColor: tag.bgColor,
                      color: tag.color
                    }}
                  >
                    <tag.icon className="w-4 h-4" />
                    {tag.type}
                  </span>
                );
              }
              
              // If multiple tags, show them in a dropdown
              return (
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="px-3 py-1 bg-gray-500/20 rounded flex items-center gap-1.5 text-sm text-gray-300 hover:bg-gray-500/30 transition-colors">
                        <Tags className="w-4 h-4" />
                        {itemTags.length} Tags
                      </div>
                    </TooltipTrigger>
                    <TooltipContent 
                      side="bottom" 
                      className="bg-gray-800/95 border border-gray-700 p-2"
                    >
                      <div className="flex flex-col gap-2">
                        {itemTags.map((tag) => (
                          <div 
                            key={tag.type}
                            className="flex items-center gap-2 p-2 rounded border"
                            style={{
                              backgroundColor: tag.bgColor,
                              borderColor: tag.borderColor
                            }}
                          >
                            <tag.icon 
                              style={{ color: tag.color }} 
                              className="w-4 h-4 flex-shrink-0" 
                            />
                            <span 
                              style={{ color: tag.color }} 
                              className="font-medium"
                            >
                              {tag.type}
                            </span>
                          </div>
                        ))}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })()}

            {/* Enchantments Dropdown */}
            {item.Enchantments && typeof item.Enchantments === 'object' && Object.keys(item.Enchantments).length > 0 && (
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger>
                    <div className="px-3 py-1 bg-purple-500/20 rounded flex items-center gap-1.5 text-sm text-purple-300 hover:bg-purple-500/30 transition-colors">
                      <Sparkles className="w-4 h-4" />
                      {Object.keys(item.Enchantments).length} Enchant{Object.keys(item.Enchantments).length !== 1 ? 's' : ''}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent 
                    side="bottom" 
                    className="bg-gray-800/95 border border-gray-700 p-2 w-[500px]"
                  >
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(item.Enchantments).map(([enchantName]) => {
                        const enchantData = ENCHANTMENTS[enchantName];
                        if (!enchantData) return null;
                        
                        return (
                          <div 
                            key={enchantName}
                            className="flex items-start gap-2 p-2 rounded border"
                            style={{
                              backgroundColor: enchantData.bgColor,
                              borderColor: enchantData.borderColor
                            }}
                          >
                            <enchantData.Icon 
                              style={{ color: enchantData.color }} 
                              className="w-4 h-4 flex-shrink-0 mt-0.5" 
                            />
                            <div className="flex-1">
                              <span 
                                style={{ color: enchantData.color }} 
                                className="font-medium block text-sm"
                              >
                                {enchantData.Name}
                              </span>
                              {enchantData.Tooltips.map((tooltip: string, i: number) => (
                                <span key={i} className="text-xs text-gray-300 block">
                                  {tooltip}
                                </span>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>

          {/* Description/Tooltips Section with Scrolling */}
          <div className="flex-1 min-h-0 overflow-y-auto">
            <div className="space-y-3">
              {getAllTooltips(currentTierData).map((tooltip: string, index: number) => (
                <div 
                  key={index} 
                  className="border-b border-gray-600/50 last:border-0 pb-3 last:pb-0 pt-3 first:pt-0"
                >
                  {renderTooltip(tooltip, currentTierData.Attributes)}
                </div>
              ))}
            </div>
          </div>

          {/* Attributes Grid */}
          {currentTierData.Attributes && Object.keys(currentTierData.Attributes).length > 0 && (
            <div className="sticky bottom-0 bg-gray-800 pt-2 border-t border-gray-700">
              <div className="grid grid-cols-2 gap-2 text-sm">
                {Object.entries(currentTierData.Attributes)
                  .filter(([key]) => !key.startsWith('Custom_'))
                  .filter(([key, value]) => shouldShowAttribute(key, value))
                  .map(([key, value]) => {
                    const icon = getAttributeIcon(key);
                    if (!icon) return null;

                    return (
                      <div 
                        key={key}
                        className="flex items-center gap-2 bg-gray-700/30 rounded p-2"
                      >
                        {icon}
                        <span className="text-sm text-gray-400">
                          {getAttributeLabel(key)}:
                        </span>
                        <span className="text-white">
                          {formatCardValue(value as number, key)}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

// Helper functions
function getAttributeIcon(key: string) {
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

function getAttributeLabel(key: string): string {
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

function shouldShowAttribute(key: string, value: any): boolean {
  // Don't show multicast if it's 1
  if (key.toLowerCase() === 'multicast' && value === 1) return false;
  // Don't show zero values
  if (value === 0) return false;
  // Don't show null/undefined
  if (value === null || value === undefined) return false;
  return true;
}