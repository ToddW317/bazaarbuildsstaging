'use client'

import React from 'react';
import { 
  Sparkles, 
  Weight,
  Snowflake,
  Wind,
  Shield,
  Heart,
  Skull,
  Flame,
  Stars,
  Swords,
  Sun,
  Gem,
  Coins,
} from 'lucide-react';
import encounterData from '@/data/out.json';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Define the enchantment type
export type EnchantmentType = {
  Name: string;
  Tooltips: string[];
  Icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  borderColor: string;
};

// Define the enchantments data structure with icons and colors
export const ENCHANTMENTS: Record<string, EnchantmentType> = {
  Heavy: {
    Name: "Heavy",
    Tooltips: ["Slow 2 items for 4.0 seconds."],
    Icon: Weight,
    color: "#94a3b8",
    bgColor: "rgba(148, 163, 184, 0.1)",
    borderColor: "rgba(148, 163, 184, 0.2)"
  },
  Icy: {
    Name: "Icy",
    Tooltips: ["Freeze 1 item for 4.0 second."],
    Icon: Snowflake,
    color: "#67e8f9",
    bgColor: "rgba(103, 232, 249, 0.1)",
    borderColor: "rgba(103, 232, 249, 0.2)"
  },
  Turbo: {
    Name: "Turbo",
    Tooltips: ["Haste 2 item for 4.0 seconds."],
    Icon: Wind,
    color: "#fde047",
    bgColor: "rgba(253, 224, 71, 0.1)",
    borderColor: "rgba(253, 224, 71, 0.2)"
  },
  Shielded: {
    Name: "Shielded",
    Tooltips: ["Shield 120."],
    Icon: Shield,
    color: "#93c5fd",
    bgColor: "rgba(147, 197, 253, 0.1)",
    borderColor: "rgba(147, 197, 253, 0.2)"
  },
  Restorative: {
    Name: "Restorative",
    Tooltips: ["Heal 180."],
    Icon: Heart,
    color: "#86efac",
    bgColor: "rgba(134, 239, 172, 0.1)",
    borderColor: "rgba(134, 239, 172, 0.2)"
  },
  Toxic: {
    Name: "Toxic",
    Tooltips: ["Poison 12."],
    Icon: Skull,
    color: "#6ee7b7",
    bgColor: "rgba(110, 231, 183, 0.1)",
    borderColor: "rgba(110, 231, 183, 0.2)"
  },
  Fiery: {
    Name: "Fiery",
    Tooltips: ["Burn 18."],
    Icon: Flame,
    color: "#fca5a5",
    bgColor: "rgba(252, 165, 165, 0.1)",
    borderColor: "rgba(252, 165, 165, 0.2)"
  },
  Shiny: {
    Name: "Shiny",
    Tooltips: ["Multicast +1"],
    Icon: Stars,
    color: "#fcd34d",
    bgColor: "rgba(252, 211, 77, 0.1)",
    borderColor: "rgba(252, 211, 77, 0.2)"
  },
  Deadly: {
    Name: "Deadly",
    Tooltips: ["Crit Chance +50%"],
    Icon: Swords,
    color: "#d8b4fe",
    bgColor: "rgba(216, 180, 254, 0.1)",
    borderColor: "rgba(216, 180, 254, 0.2)"
  },
  Radiant: {
    Name: "Radiant",
    Tooltips: ["This item cannot be frozen or slowed"],
    Icon: Sun,
    color: "#f9fafb",
    bgColor: "rgba(249, 250, 251, 0.1)",
    borderColor: "rgba(249, 250, 251, 0.2)"
  },
  Obsidian: {
    Name: "Obsidian",
    Tooltips: ["Lifesteal"],
    Icon: Gem,
    color: "#cbd5e1",
    bgColor: "rgba(203, 213, 225, 0.1)",
    borderColor: "rgba(203, 213, 225, 0.2)"
  },
  Golden: {
    Name: "Golden",
    Tooltips: ["Gain 1 gold when this item is played"],
    Icon: Coins,
    color: "#fbbf24",
    bgColor: "rgba(251, 191, 36, 0.1)",
    borderColor: "rgba(251, 191, 36, 0.2)"
  }
};

const getAllEnchantments = () => {
  const enchantments = new Set<string>();
  
  Object.values(encounterData.items).forEach((item: any) => {
    if (item.Enchant) {
      enchantments.add(item.Enchant);
    }
    
    if (item.Enchantments && typeof item.Enchantments === 'object') {
      Object.keys(item.Enchantments).forEach(enchantName => {
        enchantments.add(enchantName);
      });
    }
  });
  
  return Array.from(enchantments).sort();
};

export default function EnchantmentsDisplay() {
  const enchantments = getAllEnchantments();

  return (
    <div className="bg-gray-800/50 rounded-lg p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-6 h-6 text-purple-400" />
        <h2 className="text-2xl font-bold text-white">Enchantments</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {enchantments.map((enchantment) => {
          const enchantData = ENCHANTMENTS[enchantment];
          if (!enchantData) return null;
          
          const IconComponent = enchantData.Icon;
          
          return (
            <div 
              key={enchantment}
              style={{
                backgroundColor: enchantData.bgColor,
                borderColor: enchantData.borderColor
              }}
              className="rounded-lg p-3 flex items-center gap-3 border"
            >
              <IconComponent 
                style={{ color: enchantData.color }} 
                className="w-5 h-5 flex-shrink-0" 
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span 
                    style={{ color: enchantData.color }} 
                    className="text-sm font-medium"
                  >
                    {enchantData.Name}
                  </span>
                  <span className="text-gray-400">-</span>
                  <span className="text-sm text-gray-300">
                    {enchantData.Tooltips[0]}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
