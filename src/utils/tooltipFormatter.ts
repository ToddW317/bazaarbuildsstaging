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
  'target': {
    color: 'text-indigo-400',
    icon: Target
  },
  'repeat': {
    color: 'text-pink-400',
    icon: Repeat
  },
  'freeze': {
    color: 'text-cyan-400',
    icon: Snowflake
  },
  'slow': {
    color: 'text-amber-700',
    icon: Droplet
  },
  'cooldown': {
    color: 'text-cyan-400',
    icon: Timer
  },
  'cooldowns': {
    color: 'text-cyan-400',
    icon: Timer
  },
  'crit': {
    color: 'text-red-400',
    icon: BadgeAlert
  },
  'income': {
    color: 'text-yellow-400',
    icon: Coins
  },
  'gold': {
    color: 'text-yellow-400',
    icon: Coins
  },
  'value': {
    color: 'text-yellow-400',
    icon: Coins
  },
  'Value': {
    color: 'text-yellow-400',
    icon: Coins
  },
  'weapon': {
    color: 'text-indigo-300'
  },
  'weapons': {
    color: 'text-indigo-300'
  },
  'friend': {
    color: 'text-indigo-300'
  },
  'tool': {
    color: 'text-indigo-300'
  },
  'core': {
    color: 'text-indigo-300'
  },
  'aquatic': {
    color: 'text-indigo-300'
  },
  'Aquatic': {
    color: 'text-indigo-300'
  },
  'unsellable': {
    color: 'text-indigo-300'
  }
}

export function parseTooltip(tooltip: string, attributes: Record<string, any>) {
  // Replace attribute placeholders
  let formattedText = tooltip.replace(/{([^}]+)}/g, (match, key) => {
    const parts = key.split('.')
    let value = attributes

    // Handle nested attributes like {ability.0.targets}
    for (const part of parts) {
      if (value === undefined) break
      value = value[part]
    }

    return value !== undefined ? value.toString() : match
  })

  // Split into segments for rendering, including 'gold'
  const segments = formattedText.split(/(\{[^}]+\}|\b(?:aquatic|Aquatic|damage|shield|heal|burn|poison|haste|duration|target|repeat|freeze|slow|cooldown|cooldowns|crit|income|gold|value|Value|weapon|weapons|friend|tool|core|unsellable|health|regeneration)\b)/gi)
  
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

export function formatValue(value: number, type: string): string {
  if (type.toLowerCase().includes('duration')) {
    return `${(value / 1000).toFixed(1)}s`
  }
  return value.toString()
} 