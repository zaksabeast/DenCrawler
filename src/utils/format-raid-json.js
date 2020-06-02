import { species, moves } from './lookups.json';

const ABILITY_SETTINGS = {
  1: 'First',
  2: 'Second',
  3: 'First/Second',
  4: 'All',
};

const parseEntry = (entry) => {
  const probabilityIndex = entry.Probabilities.findIndex((prob) => prob !== 0);

  if (probabilityIndex === -1) return null;

  const starCount = probabilityIndex + 1;
  const probability = entry.Probabilities[probabilityIndex];
  const gigantamax = entry.IsGigantamax ? ' Gigantamax' : '';
  const altForm = entry.AltForm ? '-' + entry.AltForm : '';
  const dynamaxBoost = entry.DynamaxBoost.toFixed(1).replace('.', ',');
  const ability = ABILITY_SETTINGS[entry.Ability];

  return `  ${starCount}-Star${gigantamax} ${species[entry.Species]}${altForm}
    Lv. ${entry.Level}
    Dynamax Level: ${entry.DynamaxLevel}
    Dynamax Boost: ${dynamaxBoost}x
    Ability: ${ability}
    Moves:
      - ${moves[entry.Move0]}
      - ${moves[entry.Move1]}
      - ${moves[entry.Move2]}
      - ${moves[entry.Move3]}
    Selection Probabilities:
      ${starCount}-Star Desired: ${probability}%
`;
};

const formatEntries = (game, gameName) => {
  const entries = game.Entries.map(parseEntry).filter((entry) => entry !== null);
  return [`Game: ${gameName}`, `Nest ID: ${game.TableID}`, ...entries].join('\n');
};

export const formatRaidJSON = (tables) => {
  const sword = tables.find((table) => table.GameVersion === 1);
  const shield = tables.find((table) => table.GameVersion === 2);

  return [formatEntries(sword, 'Sword'), formatEntries(shield, 'Shield')].join('\n\n');
};
