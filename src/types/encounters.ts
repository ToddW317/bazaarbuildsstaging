export interface Tooltip {
  text: string;
  color?: string;
  icon?: string;
}

export interface TierData {
  Tooltips?: string[];
  AdditionalTooltips?: string[];
  Attributes?: Record<string, any>;
}

export interface Enchantment {
  Name: string;
  Tooltips: string[];
}

export interface Item {
  id?: string;
  InternalName: string;
  Size: string;
  Heroes: string[];
  Tags: string[];
  Tiers: {
    [key: string]: {
      Tooltips?: string[];
      AdditionalTooltips?: string[];
      Attributes?: Record<string, any>;
      Enchant?: string;
      Enchantments?: string[];
    };
  };
  StartingTier?: string;
  Enchant?: string;
  Enchantments?: {
    [key: string]: Enchantment;
  };
  ArtKey?: string;
}
