"use client"

import Image from 'next/image'
import { Skill } from '@/types/skills'
import { useState } from 'react'
import { 
  Crown,
  Swords,
  Shield,
  Heart,
  Clock,
  DollarSign,
  Sparkles,
  Maximize2,
  Flame,
  Skull,
  Zap,
  Snowflake,
  Activity,
  Droplet,
  Timer,
  BadgeAlert,
  Coins
} from 'lucide-react'
import { parseTooltip, formatValue } from '@/utils/tooltipFormatter'

interface SkillCardProps {
  skill: Skill
}

export default function SkillCard({ skill }: SkillCardProps) {
  const [imageError, setImageError] = useState(false)
  const [selectedTier, setSelectedTier] = useState<string>(skill.startingTier)

  const imagePath = skill.image.startsWith('/') 
    ? skill.image 
    : `/skills/${skill.image}`

  const handleImageError = () => {
    console.error(
      `[Missing Skill Image] 
      Name: "${skill.name}"
      ID: "${skill.id}"
      Failed Path: "${imagePath}"
      Image Property: "${skill.image}"`
    );
    setImageError(true);
  };

  const currentTier = skill.tiers[selectedTier]
  const hasAdditionalContent = currentTier?.AbilityIds && currentTier.AbilityIds.length > 0

  const getAttributeDetails = (key: string) => {
    switch(key) {
      case 'BuyPrice':
        return { icon: <DollarSign className="w-4 h-4 text-red-400" />, label: "Buy" };
      case 'SellPrice':
        return { icon: <DollarSign className="w-4 h-4 text-green-400" />, label: "Sell" };
      case 'Damage':
        return { icon: <Swords className="w-4 h-4 text-red-400" />, label: "Damage" };
      case 'Shield':
        return { icon: <Shield className="w-4 h-4 text-yellow-400" />, label: "Shield" };
      case 'Healing':
        return { icon: <Heart className="w-4 h-4 text-green-400" />, label: "Heal" };
      case 'Health':
        return { icon: <Activity className="w-4 h-4 text-green-400" />, label: "Health" };
      case 'Duration':
        return { icon: <Clock className="w-4 h-4 text-yellow-400" />, label: "Duration" };
      case 'Cooldown':
        return { icon: <Timer className="w-4 h-4 text-cyan-400" />, label: "Cooldown" };
      case 'Burn':
        return { icon: <Flame className="w-4 h-4 text-orange-400" />, label: "Burn" };
      case 'Poison':
        return { icon: <Skull className="w-4 h-4 text-purple-400" />, label: "Poison" };
      case 'Haste':
        return { icon: <Zap className="w-4 h-4 text-cyan-400" />, label: "Haste" };
      case 'Multicast':
        return { icon: <Sparkles className="w-4 h-4 text-purple-400" />, label: "Multicast" };
      case 'Freeze':
        return { icon: <Snowflake className="w-4 h-4 text-cyan-400" />, label: "Freeze" };
      case 'Slow':
        return { icon: <Droplet className="w-4 h-4 text-amber-700" />, label: "Slow" };
      case 'Crit':
        return { icon: <BadgeAlert className="w-4 h-4 text-red-400" />, label: "Crit" };
      case 'Income':
        return { icon: <Coins className="w-4 h-4 text-yellow-400" />, label: "Income" };
      case 'Weapon':
      case 'Weapons':
        return { icon: null, label: "Weapon", color: "text-indigo-300" };
      case 'Friend':
        return { icon: null, label: "Friend", color: "text-indigo-300" };
      case 'Tool':
        return { icon: null, label: "Tool", color: "text-indigo-300" };
      case 'Core':
        return { icon: null, label: "Core", color: "text-indigo-300" };
      case 'Unsellable':
        return { icon: null, label: "Unsellable", color: "text-indigo-300" };
      default:
        return null;
    }
  };

  const formatAttributeValue = (key: string, value: any) => {
    if (typeof value !== 'number') return value;
    
    if (key.toLowerCase().includes('price')) {
      return `${value}g`;
    }
    if (value > 1000) {
      return `${(value / 1000).toFixed(1)}s`;
    }
    return value;
  };

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

  const shouldShowAttribute = (key: string, value: any) => {
    if (key === 'Multicast' && value === 1) return false;
    return true;
  };

  const renderTooltip = (tooltip: string, attributes: Record<string, any>) => {
    const segments = parseTooltip(tooltip, attributes)

    return (
      <div className="flex flex-wrap items-center gap-1.5 text-base leading-relaxed">
        {segments.map(({ id, text, color, Icon }) => (
          <span key={id} className="flex items-center gap-1.5">
            {Icon && <Icon className={`w-5 h-5 ${color}`} />}
            <span className={color ? `font-semibold ${color}` : 'text-gray-300'}>
              {text}
            </span>
          </span>
        ))}
      </div>
    )
  }

  const getTypeTagStyle = (type: string) => {
    if (type.toLowerCase() === 'active') {
      return {
        bg: 'bg-red-500/20',
        text: 'text-red-300',
        icon: <Zap className="w-4 h-4" />
      }
    }
    return {
      bg: 'bg-gray-500/20',
      text: 'text-gray-300',
      icon: <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500/50 
      transition-all duration-300 cursor-pointer h-full flex flex-col">
      {/* Header with Image */}
      <div className="relative">
        <div className="relative aspect-video w-full bg-gray-700">
          {!imageError ? (
            <Image
              src={imagePath}
              alt={skill.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              onError={handleImageError}
              priority={false}
            />
          ) : (
            <Image
              src="/skills/default-skill.png"
              alt="Default skill icon"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              priority={false}
            />
          )}
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
          
          {/* Skill Name Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <h3 className="text-lg font-bold text-white drop-shadow-lg">
              {skill.name.replace(/^(DOO|JUL|PYG|STE|VAN)_/, '')}
            </h3>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4 flex-1 flex flex-col">
        {/* Tier Selection */}
        <div className="flex gap-1">
          {Object.keys(skill.tiers).map((tier) => (
            <button
              key={tier}
              onClick={(e) => {
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
          {/* Type Tag */}
          {(() => {
            const typeStyle = getTypeTagStyle(skill.type || "Passive")
            return (
              <span className={`px-3 py-1 ${typeStyle.bg} rounded flex items-center gap-1.5 text-sm ${typeStyle.text} font-medium`}>
                {typeStyle.icon}
                {skill.type || "Passive"}
              </span>
            )
          })()}

          {/* Hero Tag */}
          {skill.heroes.length > 0 && (
            <span className="px-3 py-1 bg-purple-500/20 rounded flex items-center gap-1.5 text-sm text-purple-300">
              <Crown className="w-4 h-4" />
              {skill.heroes[0]}
            </span>
          )}
        </div>

        {/* Description */}
        <div className="space-y-3">
          {currentTier?.Tooltips?.map((tooltip, index) => (
            <div key={index}>
              {renderTooltip(tooltip, currentTier.Attributes)}
            </div>
          ))}
        </div>

        {/* Attributes Grid */}
        {currentTier?.Attributes && Object.keys(currentTier.Attributes).length > 0 && (
          <div className="sticky bottom-0 bg-gray-800 pt-2 border-t border-gray-700 mt-auto">
            <div className="grid grid-cols-2 gap-2 text-sm">
              {Object.entries(currentTier.Attributes).map(([key, value]) => {
                const details = getAttributeDetails(key);
                if (!details || !shouldShowAttribute(key, value)) return null;

                return (
                  <div 
                    key={key}
                    className="flex items-center gap-2 bg-gray-700/30 rounded p-2"
                  >
                    {details.icon && details.icon}
                    <span className={`text-sm ${details.color || 'text-gray-400'}`}>
                      {details.label}:
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
  );
} 