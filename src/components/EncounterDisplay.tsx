'use client'

import { useState } from 'react'
import { ChevronDown, Shield, Heart, Skull, Sword, Sparkles } from 'lucide-react'
import Image from 'next/image'
import encounterData from '@/data/out.json'
import SkillCard from '@/components/SkillCard'
import CardDisplay from '@/components/CardDisplay'
import { items } from '../../data.js'

interface Skill {
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
      };
      Tooltips: string[];
      AbilityIds: string[];
    };
  };
  buyPrice: number;
}

interface MonsterItem {
  ItemID: string;
  InternalName: string;
  Size?: string;
  Heroes?: string[];
  DropRate?: number;
}

interface EncounterDisplayProps {
  name: string;
  monster: any;
  isExpanded: boolean;
  onToggle: () => void;
}

interface MonsterSkillData {
  SkillID: string;
  Name: string;
  Description?: string;
  Tier?: string;
  Damage?: number;
  Shield?: number;
  Healing?: number;
  Duration?: number;
  Cooldown?: number;
}

// Update the Skill interface to match what SkillDisplay expects
interface MonsterSkill {
  Name: string;
  Description: string;
  Cooldown?: number;
  Damage?: number;
  Shield?: number;
  Healing?: number;
  Duration?: number;
  Tier: string;
  Heroes: string[];
  StartingTier: string;
  ArtKey: string;
  Tooltips: string[];
  Attributes: {
    BuyPrice?: number;
    DamageAmount?: number;
    ShieldAmount?: number;
    HealAmount?: number;
    CooldownMax?: number;
    Duration?: number;
    [key: string]: any;
  };
  AbilityIds: string[];
}

// Update the OutJsonSkill interface to better match your data
interface OutJsonSkill {
  Heroes: string[];
  StartingTier: string;
  Tiers: {
    [key: string]: {
      AbilityIds: string[];
      Attributes: {
        BuyPrice?: number;
        DamageAmount?: number;
        ShieldAmount?: number;
        HealAmount?: number;
        CooldownMax?: number;
        Duration?: number;
        Multicast?: number;
        [key: string]: any;
      };
      AuraIds: string[];
      TooltipIds: number[];
      Tooltips: string[];
    };
  };
  InternalID: string;
  Name: string;
  ArtKey: string;
  [key: string]: any;
}

// Add index signature to encounterData.skills
interface SkillsData {
  [key: string]: OutJsonSkill;
}

interface TierStats {
  tier: string;
  buyPrice?: number;
  sellPrice?: number;
  [key: string]: any;
}

interface ItemData {
  id: string;
  name: string;
  [key: string]: any;
}

// Update the mapTierData function
const mapTierData = (tierStats: TierStats, item: ItemData) => {
  const itemData = encounterData.items[item.id as keyof typeof encounterData.items];
  const tierData = itemData?.Tiers[tierStats.tier as keyof typeof itemData.Tiers];
  
  // Only include price attributes if they're not already in tierStats
  const attributes = {
    ...tierStats,
    ...(tierData?.Attributes || {})
  };

  // Remove duplicate price fields
  if (tierData?.Attributes?.BuyPrice) {
    delete attributes.buyPrice;
  }
  if (tierData?.Attributes?.SellPrice) {
    delete attributes.sellPrice;
  }

  // Get all tooltips from the tier data
  const tooltips = [
    // Get regular tooltips (lowercase)
    ...(tierData?.tooltips || []),
    // Get any additional tooltip arrays
    ...Object.entries(tierData || {})
      .filter(([key, value]) => 
        key.toLowerCase().includes('tooltip') && 
        Array.isArray(value) &&
        key !== 'tooltips' &&
        key !== 'TooltipIds'
      )
      .flatMap(([_, tooltipArray]) => tooltipArray)
  ].filter(tooltip => 
    typeof tooltip === 'string' && 
    tooltip.trim() !== ''
  );

  return {
    Attributes: attributes,
    Tooltips: tooltips,
    AbilityIds: tierData?.AbilityIds || []
  };
};

const mapMonsterSkillToSkillFormat = (monsterSkill: MonsterSkillData): Skill => {
  const skillData = (encounterData.skills as SkillsData)[monsterSkill.SkillID];
  const tier = monsterSkill.Tier || 'Gold';
  const tierData = skillData?.Tiers[tier];

  return {
    id: monsterSkill.SkillID,
    name: monsterSkill.Name,
    image: `/skills/Icon_Skill_${skillData?.ArtKey || monsterSkill.Name.replace(/\s+/g, '')}.png`,
    description: monsterSkill.Description || tierData?.Tooltips?.[0] || '',
    type: 'Active',
    heroes: skillData?.Heroes || [],
    unlockLevel: 1,
    startingTier: skillData?.StartingTier || tier,
    tiers: {
      [tier]: {
        Attributes: {
          BuyPrice: tierData?.Attributes?.BuyPrice,
          DamageAmount: monsterSkill.Damage || tierData?.Attributes?.DamageAmount,
          ShieldAmount: monsterSkill.Shield || tierData?.Attributes?.ShieldAmount,
          HealAmount: monsterSkill.Healing || tierData?.Attributes?.HealAmount,
          Duration: monsterSkill.Duration || tierData?.Attributes?.Duration,
          CooldownMax: monsterSkill.Cooldown || tierData?.Attributes?.CooldownMax,
          ...tierData?.Attributes
        },
        Tooltips: tierData?.Tooltips || [monsterSkill.Description || ''],
        AbilityIds: tierData?.AbilityIds || []
      }
    },
    buyPrice: tierData?.Attributes?.BuyPrice || 0
  };
};

export default function EncounterDisplay({ name, monster, isExpanded, onToggle }: EncounterDisplayProps) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-700/50 transition-colors"
      >
        <div className="flex items-center gap-6">
          <h2 className="text-xl font-semibold text-white">
            {name}
          </h2>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1.5 text-yellow-400">
              <Sparkles className="w-4 h-4" />
              Level {monster.Level}
            </span>
            <span className="flex items-center gap-1.5 text-red-400">
              <Shield className="w-4 h-4" />
              {monster.Health} HP
            </span>
            {monster.Skills?.length > 0 && (
              <span className="flex items-center gap-1.5 text-purple-400">
                <Sword className="w-4 h-4" />
                {monster.Skills.length} Skills
              </span>
            )}
          </div>
        </div>
        <ChevronDown 
          className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
        />
      </button>

      {isExpanded && (
        <div className="p-6 border-t border-gray-700">
          {/* Monster Skills */}
          {monster.Skills?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Skills</h3>
              <div className="flex flex-wrap -mx-2">
                {monster.Skills?.map((skill: MonsterSkill, index: number) => (
                  <div key={`${name}-${monster.Level}-${skill.SkillID}-${index}`}>
                    <SkillCard skill={mapMonsterSkillToSkillFormat(skill)} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Monster Items */}
          {monster.Items?.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Rewards</h3>
              <div className="flex flex-wrap -mx-2">
                {monster.Items.map((monsterItem: MonsterItem) => {
                  const item = items.find(i => i.id === monsterItem.ItemID);
                  if (!item) return null;

                  return (
                    <div key={monsterItem.ItemID} className="transform scale-[0.85] origin-top">
                      <div className="relative">
                        {monsterItem.DropRate && (
                          <div className="absolute top-2 right-2 z-10 bg-yellow-500/90 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                            {(monsterItem.DropRate * 100).toFixed(1)}% chance
                          </div>
                        )}
                        <CardDisplay 
                          item={{
                            id: item.id,
                            InternalName: item.name,
                            Size: item.size,
                            Heroes: item.heroes,
                            StartingTier: item.startingTier,
                            Tags: item.tags,
                            ArtKey: item.image,
                            images: [],
                            Tiers: Object.entries(item.tiers).reduce((acc, [tier, stats]) => ({
                              ...acc,
                              [tier]: mapTierData({ ...stats, tier }, item)
                            }), {})
                          }}
                          itemId={monsterItem.ItemID}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}