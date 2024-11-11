import { Item } from '@/types/encounters';

// Helper function to normalize strings for comparison
function normalizeString(str: string): string {
  return str.toLowerCase()
    .replace(/[^a-z0-9]/g, '') // Remove special characters and spaces
    .trim();
}

// Helper function to find the closest matching image filename
function findClosestImageMatch(itemName: string, availableImages: string[]): string | null {
  const normalizedItemName = normalizeString(itemName);
  
  // First try exact match
  const exactMatch = availableImages.find(img => 
    normalizeString(img).includes(normalizedItemName)
  );
  if (exactMatch) return exactMatch;

  // Try partial matches
  const words = normalizedItemName.split(/\s+/);
  const partialMatch = availableImages.find(img => {
    const normalizedImg = normalizeString(img);
    return words.some(word => normalizedImg.includes(word));
  });
  
  return partialMatch || null;
}

const imageCache: Record<string, string> = {};

const itemImageMappings: Record<string, string> = {
  // Your existing mappings
  'Fang': 'CF_S_ADV_Fangs_D',
  'Basilisk Fang': 'CF_S_ADV_Fangs_D',
  'Fangs': 'CF_S_ADV_Fangs_D',
  'Small Weaponry': 'CF_S_ADV_SmallWeaponry_D',
  // ... other mappings ...
};

export function getItemImageUrl(item: any): string {
  if (!item?.ArtKey) return '/items/default-item.png';
  
  // Try JPEG first
  const jpegPath = `/items/${item.ArtKey}.jpeg`;
  
  // Fallback paths
  const pngPath = `/items/${item.ArtKey}.png`;
  const webpPath = `/items/${item.ArtKey}.webp`;
  
  // Return the JPEG path by default
  return jpegPath;
}

export function getItemImagePath(item: Item): string {
  if (!item) {
    console.error('Item is undefined in getItemImagePath');
    return '/items/default-item.png';
  }

  // Get the size abbreviation ('S', 'M', 'L')
  const size: string = item.Size || 'Unknown';
  const sizeAbbreviation: string = size.charAt(0).toUpperCase();

  const heroAbbreviationMap: { [key: string]: string } = {
    'Common': 'COM',
    'Pygmalien': 'PYG',
    'Jules': 'JUL',
    'Dooley': 'DOO',
    'Stelle': 'STE',
    'Vanessa': 'VAN',
    'Mak': 'MAK',
    'ADV': 'ADV'
  };

  // Get the hero abbreviation, default to 'COM' if not found
  const heroName: string = item.Heroes?.[0] || 'Common';
  const heroAbbreviation: string = heroAbbreviationMap[heroName] || 'COM';

  // Replace spaces and special characters in item name
  const itemName: string = item.InternalName 
    ? item.InternalName.replace(/\s+/g, '_').replace(/[^\w]/g, '')
    : 'Unknown';

  // Construct the image filename
  const imageName: string = `CF_${sizeAbbreviation}_${heroAbbreviation}_${itemName}_D.jpeg`;

  // Return the path with leading slash for Next.js
  return `/items/${imageName}`;
}

// Usage example:
// const defaultImage = getItemImagePath("CF_S_JUL_Caviar_D.jpeg"); // Returns "/items/CF_S_JUL_Caviar_D.jpeg"
// const maskImage = getItemImagePath("CF_S_JUL_Caviar_D.jpeg", "Mask"); // Returns "/items/CF_S_JUL_Caviar_Mask.jpeg"
// const fxImage = getItemImagePath("CF_S_JUL_Caviar_D.jpeg", "FX"); // Returns "/items/CF_S_JUL_Caviar_FX.jpeg"