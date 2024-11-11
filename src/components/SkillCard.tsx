'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Crown, Maximize2, Zap } from 'lucide-react'
import { parseCardTooltip } from '@/utils/cardTooltipFormatter'
import { getAttributeIcon, getAttributeLabel } from '@/utils/attributeUtils'

interface SkillCardProps {
  skill: {
    id: string;
    name: string;
    description: string;
    image: string;
    type: string;
    heroes: string[];
    unlockLevel: number;
    startingTier: string;
    tiers: {
      [key: string]: {
        Attributes: {
          Damage?: number;
          Shield?: number;
          Healing?: number;
          Duration?: number;
          Cooldown?: number;
          [key: string]: any;
        };
        Tooltips: string[];
        AbilityIds: string[];
      };
    };
    buyPrice: number;
  }
}

const formatAttributeValue = (key: string, value: any): string => {
  if (value === undefined || value === null) return '';
  
  if (typeof value !== 'number') return value.toString();
  
  if (key.toLowerCase().includes('cooldown') || key.toLowerCase().includes('duration')) {
    return `${(value / 1000).toFixed(1)}s`;
  }
  
  if (key.toLowerCase().includes('price')) {
    return `${value}g`;
  }
  
  return value.toString();
};

export default function SkillCard({ skill }: SkillCardProps) {
  const [selectedTier, setSelectedTier] = useState<string>(skill.startingTier);
  const [imageError, setImageError] = useState(false);

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

  const getTypeTagStyle = (type: string) => {
    return {
      bg: type === 'Active' ? 'bg-red-500/20' : 'bg-gray-500/20',
      text: type === 'Active' ? 'text-red-300' : 'text-gray-300',
      label: type || 'Passive'
    }
  }

  const currentTierData = skill.tiers[selectedTier];

  const renderTooltip = (tooltip: string) => {
    const segments = parseCardTooltip(tooltip, currentTierData?.Attributes || {});

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

  return (
    <div className="w-[300px] px-2 mb-4">
      <div className="transform scale-[0.85] origin-top">
        <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500/50 
          transition-all duration-300 cursor-pointer h-full flex flex-col">
          <div className="relative">
            <div className="relative aspect-[4/3] w-full bg-gray-700">
              <Image
                src={imageError ? '/skills/default-skill.png' : skill.image}
                alt={skill.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain p-4"
                onError={() => setImageError(true)}
                priority={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="text-lg font-bold text-white drop-shadow-lg">
                  {skill.name}
                </h3>
              </div>
            </div>
          </div>

          <div className="p-4 space-y-4 flex-1 flex flex-col">
            <div className="flex gap-1">
              {Object.keys(skill.tiers).map((tier) => (
                <button
                  key={tier}
                  onClick={() => setSelectedTier(tier)}
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

            <div className="flex flex-wrap gap-2">
              {(() => {
                const typeStyle = getTypeTagStyle(skill.type)
                return (
                  <span className={`px-3 py-1 ${typeStyle.bg} rounded flex items-center gap-1.5 text-sm ${typeStyle.text} font-medium`}>
                    <Zap className="w-4 h-4" />
                    {typeStyle.label}
                  </span>
                )
              })()}

              {skill.heroes.length > 0 && (
                <span className="px-3 py-1 bg-purple-500/20 rounded flex items-center gap-1.5 text-sm text-purple-300">
                  <Crown className="w-4 h-4" />
                  {skill.heroes[0]}
                </span>
              )}
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto">
              <div className="space-y-3">
                {currentTierData?.Tooltips?.map((tooltip, index) => (
                  <div key={index} className="border-b border-gray-600/50 last:border-0 pb-3 last:pb-0 pt-3 first:pt-0">
                    {renderTooltip(tooltip)}
                  </div>
                ))}
              </div>
            </div>

            {currentTierData?.Attributes && Object.keys(currentTierData.Attributes).length > 0 && (
              <div className="sticky bottom-0 bg-gray-800 pt-2 border-t border-gray-700">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {Object.entries(currentTierData.Attributes)
                    .filter(([key, value]) => {
                      return value != null && !key.startsWith('Custom_');
                    })
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
                            {formatAttributeValue(key, value)}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 