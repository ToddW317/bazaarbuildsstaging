import cardsData from './out.json'

// Helper function to get card prefix
function getCardPrefix(name) {
  const match = name.match(/^(DOO|JUL|PYG|STE|VAN)_/)
  return match ? match[1] : null
}

// Export the cards array
export const cards = Object.entries(cardsData.items).map(([id, item]) => {
  // Get the proper image key
  const imageKey = item.ArtKey || item.InternalName;
  
  return {
    id,
    ...item,
    InternalName: item.ArtKey 
      ? ((cardsData.items)[item.ArtKey]?.InternalName || item.InternalName)
      : item.InternalName,
    Heroes: item.Heroes || ['Common'],
    Size: item.Size || 'Medium',
    Tags: item.Tags || [],
    StartingTier: item.StartingTier || 'Bronze',
    Tiers: item.Tiers || { Bronze: { Attributes: {} } },
    // Ensure ArtKey follows the correct format
    ArtKey: imageKey
  };
}).filter(card => !card.InternalName.includes('[DEBUG]')); 