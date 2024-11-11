export function formatCardValue(value: number, key: string): string {
  // Handle cooldown values (convert from ms to seconds)
  if (key.toLowerCase().includes('cooldown')) {
    return `${(value / 1000).toFixed(1)}s`;
  }
  
  // Handle price values
  if (key.toLowerCase().includes('price')) {
    return `${value}g`;
  }

  // Return other values as-is
  return value.toString();
} 