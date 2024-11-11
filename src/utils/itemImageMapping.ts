const itemImageMappings: Record<string, string> = {
  // Direct mappings for special cases
  'Fang': 'CF_S_ADV_Fangs_D',
  'Basilisk Fang': 'CF_S_ADV_Fangs_D',
  'Fangs': 'CF_S_ADV_Fangs_D',
  'Small Weaponry': 'CF_S_ADV_SmallWeaponry_D',
  'Pelt': 'CF_S_ADV_Pelt_D',
  'Amber': 'CF_S_ADV_AmberGem_D',
  'Fuel Rod': 'CF_S_ADV_FuelRod_D',
  'Gamma Ray': 'CF_S_ADV_GammaRay_D',
  'Frozen Fire': 'CF_S_ADV_FrozenFire_D',
  'Ice Bomb': 'CF_S_ADV_IceBomb_D',
  'Lockbox': 'CF_S_ADV_LockBox_D'
}

export function getItemImagePath(item: Item): string {
  // 1. Check direct mapping
  if (itemImageMappings[item.InternalName]) {
    return `${itemImageMappings[item.InternalName]}.jpeg`;
  }

  // 2. Clean and format the name
  const words = item.InternalName.split(' ');
  const cleanName = words
    .map((word, index) => {
      // Always capitalize first letter
      const firstLetter = word.charAt(0).toUpperCase();
      // Rest of the word stays as is for first word, lowercase for others
      const restOfWord = index === 0 ? word.slice(1) : word.slice(1).toLowerCase();
      return firstLetter + restOfWord;
    })
    .join('');

  // 3. Return standardized format
  return `CF_S_ADV_${cleanName}_D.jpeg`;
}
