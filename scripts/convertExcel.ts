import xlsx from 'xlsx';
import { writeFileSync } from 'fs';
import { Card } from '../src/types/cards';

const workbook = xlsx.readFile('./data/cards.xlsx');
const worksheet = workbook.Sheets[workbook.SheetNames[0]];
const data = xlsx.utils.sheet_to_json(worksheet);

const cards: Card[] = data.map((row: any) => ({
  id: row.Id || crypto.randomUUID(),
  name: row.Name,
  cardType: row.CardType,
  size: row.CardSize,
  tier: row.Tier,
  isLegendary: row.IsLegendary === 'TRUE',
  castTime: row.CastTime > 0 ? row.CastTime : undefined,
  stats: {
    damage: row.Dps > 0 ? row.Dps : undefined,
    heal: row.Hps > 0 ? row.Hps : undefined,
    shield: row.Shield > 1 ? row.Shield : undefined,
    burn: row.Burn > 1 ? row.Burn : undefined,
    poison: row.Poison > 1 ? row.Poison : undefined,
    critChance: row.CritChance > 1 ? row.CritChance : undefined,
    cooldown: row.Cooldown > 1 ? row.Cooldown : undefined,
    ammo: row.Ammo > 0 ? row.Ammo : undefined,
  }
})).filter(card => card.name && card.cardType); // Filter out any empty rows

// Remove undefined stats
cards.forEach(card => {
  if (card.stats) {
    Object.keys(card.stats).forEach(key => {
      if (card.stats![key as keyof typeof card.stats] === undefined) {
        delete card.stats![key as keyof typeof card.stats];
      }
    });
    // Remove stats object if empty
    if (Object.keys(card.stats).length === 0) {
      delete card.stats;
    }
  }
});

// Create the data directory if it doesn't exist
const fs = require('fs');
if (!fs.existsSync('./src/data')) {
  fs.mkdirSync('./src/data', { recursive: true });
}

// Write the JSON file
writeFileSync('./src/data/cards.json', JSON.stringify(cards, null, 2));
console.log(`Converted ${cards.length} cards to JSON`); 