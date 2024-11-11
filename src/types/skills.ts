import { skills } from '../data/skills.js'

// Define a constant for the default skill image
const DEFAULT_SKILL_IMAGE = "/skills/default-skill.png"

export interface SkillTier {
  Tooltips: string[]
  AbilityIds: string[]
  Attributes: {
    BuyPrice?: number
    SellPrice?: number
    Damage?: number
    Shield?: number
    Healing?: number
    Duration?: number
    Cooldown?: number
    [key: string]: any // For other potential attributes
  }
}

export interface Skill {
  id: string
  name: string
  image: string
  description: string
  type: string
  unlockLevel: number
  startingTier: string
  tiers: { [key: string]: SkillTier }
  heroes: string[]
  buyPrice: number
}

// Helper functions
export function getSkillPrefix(name: string): string | null {
  const match = name.match(/^(DOO|JUL|PYG|STE|VAN)_/)
  return match ? match[1] : null
}

export function getSkillTypes(): string[] {
  return Array.from(new Set(skills.map(skill => skill.type || "Passive")))
}

export function getUnlockLevels(): number[] {
  return Array.from(new Set<number>(skills.map(skill => skill.unlockLevel || 1))).sort((a, b) => a - b)
}

export function getPrefixes(): string[] {
  return ['DOO', 'JUL', 'PYG', 'STE', 'VAN']
}