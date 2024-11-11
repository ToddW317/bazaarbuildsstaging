'use client'

import { useState } from 'react';
import { Item } from '@/types/encounters';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Crown, 
  Maximize2,
  Clock,
  DollarSign,
} from 'lucide-react';
import { getItemImagePath } from '@/utils/imageUtils';
import PlaceholderImage from '@/components/PlaceholderImage';
import { motion } from 'framer-motion';
import { parseTooltip } from '@/utils/tooltipFormatter';
import { getAttributeIcon } from '@/utils/attributeUtils';
import { useRouter } from 'next/navigation';
import encounterData from '@/data/out.json';

interface CardDetailsContentProps {
  item: Item;
  itemId: string;
}

interface EncounterInfo {
  name: string;
  image: string;
  dropRate: number;
}

const getEncounterInfo = (itemId: string): EncounterInfo[] => {
  const encounters: EncounterInfo[] = [];
  
  if (!encounterData?.monsters) {
    console.warn('No monsters data available');
    return encounters;
  }
  
  try {
    Object.entries(encounterData.monsters).forEach(([monsterName, monster]) => {
      if (monster?.Items) {
        const matchingItem = monster.Items.find(item => item.ItemID === itemId);
        if (matchingItem) {
          encounters.push({
            name: monsterName,
            image: `/encounters/${monsterName.toLowerCase()}.png`,
            dropRate: 1 / monster.Items.length
          });
        }
      }
    });
  } catch (error) {
    console.error('Error processing monster data:', error);
  }
  
  return encounters;
};

export default function CardDetailsContent({ item, itemId }: CardDetailsContentProps) {
  console.log('encounterData:', encounterData);
  console.log('itemId:', itemId);
  
  const router = useRouter();
  const encounters = getEncounterInfo(itemId);
  console.log('Found encounters:', encounters);

  const [selectedTier, setSelectedTier] = useState<string>(item?.StartingTier || 'Bronze');
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEncounterClick = (monsterName: string) => {
    router.push(`/encounters?search=${encodeURIComponent(monsterName)}&expanded=true`);
  };

  if (!item) {
    console.log('Item is null or undefined');
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-gray-800 rounded-lg">
        <p className="text-gray-400">Loading item details...</p>
      </div>
    );
  }

  const currentTierData = item.Tiers?.[selectedTier] || {};
  console.log('Current tier data:', currentTierData);

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Bronze':
        return 'bg-amber-700';
      case 'Silver':
        return 'bg-gray-400';
      case 'Gold':
        return 'bg-yellow-500';
      case 'Diamond':
        return 'bg-cyan-300';
      default:
        return 'bg-gray-600';
    }
  };

  const getAttributeLabel = (key: string): string => {
    switch (key) {
      case 'BuyPrice':
        return 'Buy';
      case 'SellPrice':
        return 'Sell';
      case 'DamageAmount':
        return 'Damage';
      case 'HealAmount':
        return 'Heal';
      case 'ShieldApplyAmount':
        return 'Shield';
      case 'CooldownMax':
        return 'Cooldown';
      case 'Custom_0':
        return 'Value';
      default:
        return key.replace(/([A-Z])/g, ' $1').trim();
    }
  };

  const formatAttributeValue = (key: string, value: any): string => {
    if (key === 'CooldownMax') {
      return `${(value / 1000).toFixed(1)}s`;
    }
    return value.toString();
  };

  const shouldShowAttribute = (key: string, value: any) => {
    if (key === 'Multicast' && value === 1) return false;
    if (key === 'CastTime' && value === 0) return false;
    if (key.startsWith('Custom_')) return false;
    return true;
  };

  const renderTooltip = (tooltip: string, attributes: Record<string, any>) => {
    const segments = parseTooltip(tooltip, attributes);

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
    );
  };

  const getAllTooltips = (tierData: any) => {
    if (!tierData) return [];
    
    const tooltips: string[] = [];
    
    // Main tooltips
    if (Array.isArray(tierData.tooltips)) {
      const validTooltips = tierData.tooltips
        .filter((t: unknown): t is string => typeof t === 'string')
        .filter((t: string) => t.trim() !== '');
      tooltips.push(...validTooltips);
    }
    
    // Additional tooltip arrays
    Object.entries(tierData).forEach(([key, value]) => {
      if (
        key.toLowerCase().includes('tooltip') && 
        Array.isArray(value) &&
        key !== 'tooltips' &&
        key !== 'TooltipIds'
      ) {
        const validTooltips = (value as unknown[])
          .filter((t: unknown): t is string => typeof t === 'string')
          .filter((t: string) => t.trim() !== '');
        tooltips.push(...validTooltips);
      }
    });

    return tooltips;
  };

  return (
    <div className="space-y-4">
      {/* Single Header Section */}
      <div className="flex flex-col space-y-4">
        <Link href="/cards" className="text-blue-400 hover:text-blue-300">
          ← Back to Cards
        </Link>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-5xl mx-auto">
        {/* Left Column - Image with Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative w-full max-w-[400px] mx-auto"
        >
          <h1 className="text-2xl font-bold text-white mb-4">{item.InternalName}</h1>
          <motion.div 
            className="relative aspect-[4/3] bg-gray-700 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300"
            whileHover={{ 
              scale: 1.01,
              rotate: 1,
              transition: { 
                type: "spring",
                stiffness: 400,
                damping: 10
              }
            }}
          >
            <Image
              src={getItemImagePath(item)}
              alt={item.InternalName}
              fill
              className={`object-cover ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
              onError={() => setImageError(true)}
              onLoadingComplete={() => setIsLoading(false)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
              priority
            />
            {isLoading && <PlaceholderImage />}
            
            {/* Optional: Add a subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
          </motion.div>
        </motion.div>

        {/* Right Column - Details */}
        <div className="space-y-4">
          {/* Tier Selection */}
          <div className="flex space-x-2">
            {Object.keys(item.Tiers).map((tier) => (
              <button
                key={tier}
                onClick={() => setSelectedTier(tier)}
                className={`px-4 py-2 rounded transition-colors ${
                  tier === selectedTier
                    ? `${getTierColor(tier)} text-white`
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {tier}
              </button>
            ))}
          </div>

          {/* Attributes */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h2 className="text-xl font-bold text-white mb-3">Attributes</h2>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(currentTierData.Attributes || {})
                .filter(([key, value]) => shouldShowAttribute(key, value))
                .map(([key, value]) => {
                  const icon = getAttributeIcon(key);
                  if (!icon) return null;

                  return (
                    <div key={key} className="flex items-center space-x-2">
                      {icon}
                      <span className="text-gray-400">{getAttributeLabel(key)}:</span>
                      <span className="text-white">{formatAttributeValue(key, value)}</span>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Description Section */}
          <div className="bg-gray-800/50 rounded-lg p-4">
            <h2 className="text-xl font-bold text-white mb-3">Description</h2>
            <div className="space-y-3">
              {currentTierData.tooltips?.map((tooltip: string, index: number) => (
                <div 
                  key={index} 
                  className="border-b border-gray-600/50 last:border-0 pb-3 last:pb-0 pt-3 first:pt-0"
                >
                  {renderTooltip(tooltip, currentTierData.Attributes)}
                </div>
              ))}
              {/* Additional tooltips from other arrays */}
              {Object.entries(currentTierData)
                .filter(([key, value]) => 
                  key.toLowerCase().includes('tooltip') && 
                  Array.isArray(value) &&
                  key !== 'tooltips' &&
                  key !== 'TooltipIds'
                )
                .flatMap(([_, tooltipArray]) => tooltipArray)
                .map((tooltip: string, index: number) => (
                  <div 
                    key={`additional-${index}`} 
                    className="border-b border-gray-600/50 last:border-0 pb-3 last:pb-0 pt-3 first:pt-0"
                  >
                    {renderTooltip(tooltip, currentTierData.Attributes)}
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>

      {/* Encounters Section */}
      {encounters.length > 0 && (
        <div className="max-w-5xl mx-auto w-full mt-8">
          <h2 className="text-xl font-bold text-white mb-4">Dropped By</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {encounters.map((encounter, index) => (
              <motion.button
                key={index}
                onClick={() => handleEncounterClick(encounter.name)}
                className="group relative overflow-hidden rounded-lg h-32"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
                
                {/* Content */}
                <div className="absolute inset-0 p-4 flex flex-col justify-between z-10">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                      {encounter.name}
                    </h3>
                    <span className="bg-yellow-500/90 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {(encounter.dropRate * 100).toFixed(1)}% chance
                    </span>
                  </div>
                  
                  <div className="flex items-center text-gray-300 text-sm">
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      View Details →
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
