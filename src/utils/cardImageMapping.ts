import { Item } from '@/types/encounters';

export function getCardImageUrl(item: Item): string {
  if (!item?.InternalName) {
    console.log('No InternalName found:', item);
    return '/items/default-item.png';
  }

  // Get size (S, M, L)
  let size = 'M';  // default to Medium
  if (item.Size === 'Small') size = 'S';
  if (item.Size === 'Large') size = 'L';

  // Get character prefix
  let char = 'NEU';  // default to Neutral
  if (item.Heroes && item.Heroes.length > 0) {
    const hero = item.Heroes[0];
    switch (hero) {
      case 'Julius': char = 'JUL'; break;
      case 'Pygmy': char = 'PYG'; break;
      case 'Doomsday': char = 'DOO'; break;
      case 'Steampunk': char = 'STE'; break;
      case 'Vanilla': char = 'VAN'; break;
      case 'Common': char = 'NEU'; break;
      case 'Adventure': char = 'NEU'; break;
      default: char = 'NEU';
    }
  }

  // Format item name (remove spaces and special characters)
  const itemName = item.InternalName
    .replace(/[^a-zA-Z0-9]/g, '')
    .replace(/\s+/g, '');

  // Construct path following pattern: CF_SIZE_CHAR_itemName_D.jpeg
  const imagePath = `CF_${size}_${char}_${itemName}_D.jpeg`;
  console.log('Generated image path:', imagePath);
  
  return `/items/${imagePath}`;
} 