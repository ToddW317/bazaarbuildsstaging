'use client'

import { ENCHANTMENTS } from './EnchantmentsDisplay';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type EnchantmentBadgeProps = {
  enchantmentName: string;
  className?: string;
};

export default function EnchantmentBadge({ enchantmentName, className = '' }: EnchantmentBadgeProps) {
  const enchantment = ENCHANTMENTS[enchantmentName];
  
  if (!enchantment) {
    console.warn(`Unknown enchantment: ${enchantmentName}`);
    return null;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div 
            className={`rounded-full p-1.5 hover:brightness-125 transition-all shadow-lg ${className}`}
            style={{ 
              backgroundColor: enchantment.bgColor,
              border: `1px solid ${enchantment.borderColor}`
            }}
          >
            <enchantment.Icon 
              style={{ color: enchantment.color }} 
              className="w-4 h-4" 
            />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-sm">
            <p className="font-medium" style={{ color: enchantment.color }}>
              {enchantment.Name}
            </p>
            {enchantment.Tooltips.map((tooltip, i) => (
              <p key={i} className="text-gray-200">{tooltip}</p>
            ))}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
} 