import { 
  Swords, 
  Shield, 
  Heart, 
  Flame, 
  Skull, 
  Zap,
  Clock,
  Target,
  Repeat,
  Snowflake,
  Activity,
  Droplet,
  Timer,
  BadgeAlert,
  Coins,
  LucideIcon
} from 'lucide-react'

interface KeywordStyle {
  color: string
  icon?: LucideIcon
}

const keywordStyles: Record<string, KeywordStyle> = {
  'damage': {
    color: 'text-red-400',
    icon: Swords
  },
  'shield': {
    color: 'text-yellow-400',
    icon: Shield
  },
  'heal': {
    color: 'text-green-400',
    icon: Heart
  },
  'regeneration': {
    color: 'text-green-400',
    icon: Heart
  },
  'health': {
    color: 'text-green-400',
    icon: Activity
  },
  'burn': {
    color: 'text-orange-400',
    icon: Flame
  },
  'poison': {
    color: 'text-purple-400',
    icon: Skull
  },
  'haste': {
    color: 'text-cyan-400',
    icon: Zap
  },
  'duration': {
    color: 'text-cyan-400',
    icon: Clock
  },
  'cooldown': {
    color: 'text-cyan-400',
    icon: Timer
  },
  'cooldowns': {
    color: 'text-cyan-400',
    icon: Timer
  },
  'freeze': {
    color: 'text-cyan-400',
    icon: Snowflake
  },
  'slow': {
    color: 'text-amber-700',
    icon: Droplet
  },
  'crit': {
    color: 'text-red-400',
    icon: BadgeAlert
  },
  'gold': {
    color: 'text-yellow-400',
    icon: Coins
  },
  'small': {
    color: 'text-indigo-300'
  },
  'medium': {
    color: 'text-indigo-300'
  },
  'large': {
    color: 'text-indigo-300'
  },
  'item': {
    color: 'text-indigo-300'
  },
  'skill': {
    color: 'text-indigo-300'
  }
}

export function parseCardTooltip(tooltip: string, attributes: Record<string, any>) {
  // Replace attribute placeholders
  let formattedText = tooltip.replace(/{([^}]+)}/g, (match, key) => {
    const parts = key.split('.')
    let value = attributes

    for (const part of parts) {
      if (value === undefined) break
      value = value[part]
    }

    return value !== undefined ? value.toString() : match
  })

  // Split into segments for rendering
  const segments = formattedText.split(/(\{[^}]+\}|\b(?:damage|shield|heal|burn|poison|haste|duration|cooldown|cooldowns|freeze|slow|crit|gold|small|medium|large|item|skill|health|regeneration)\b)/gi)
  
  return segments.map((segment, index) => {
    const lowerSegment = segment.toLowerCase()
    const style = keywordStyles[lowerSegment]

    if (style) {
      return {
        id: index,
        text: segment,
        color: style.color,
        Icon: style.icon
      }
    }

    return {
      id: index,
      text: segment,
      color: null,
      Icon: null
    }
  })
}

export function formatCardValue(value: number, type: string): string {
  if (type.toLowerCase().includes('duration') || type.toLowerCase().includes('cooldown')) {
    return `${(value / 1000).toFixed(1)}s`
  }
  return value.toString()
} 