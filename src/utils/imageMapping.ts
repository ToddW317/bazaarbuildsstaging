/**
 * Gets the correct image path for a monster based on the name
 */
export const getMonsterImagePath = (monsterName: string): string => {
  const formattedName = monsterName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
  
  return `/encounters/${formattedName}.webp`;
};