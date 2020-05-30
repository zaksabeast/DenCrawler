import { formatRaidJSON } from './format-raid-json';
import { mapFlatbufferList } from './map-flatbuffer-list';
import { pkNX } from '../flatbuffers/NestHoleDistributionEncounter8Archive_generated';

const parseEventEntry = (entry) => {
  return {
    Probabilities: mapFlatbufferList(entry.Probabilities.bind(entry), entry.ProbabilitiesLength()),
    IsGigantamax: entry.IsGigantamax(),
    AltForm: entry.AltForm(),
    DynamaxBoost: entry.DynamaxBoost(),
    DynamaxLevel: entry.DynamaxLevel(),
    Ability: entry.Ability(),
    Species: entry.Species(),
    FlawlessIVs: entry.FlawlessIVs(),
    Level: entry.Level(),
    Move0: entry.Move0(),
    Move1: entry.Move1(),
    Move2: entry.Move2(),
    Move3: entry.Move3(),
  };
};

const parseEventFlatbufferToObject = (flatbuffer) => {
  if (flatbuffer.TablesLength() !== 2) throw new Error('Invalid event flatbuffer!');

  const [swordId, shieldId] = flatbuffer.Tables(0).GameVersion() === 1 ? [0, 1] : [1, 0];
  const swordTable = flatbuffer.Tables(swordId);
  const shieldTable = flatbuffer.Tables(shieldId);

  return [swordTable, shieldTable].map((table) => {
    const { high, low } = table.TableID();
    // Using 0x100000000n causes 'unexpected token name'
    const tableId = BigInt(high) * BigInt(0x100000000) + BigInt(low);
    return {
      GameVersion: table.GameVersion(),
      TableID: tableId,
      Entries: mapFlatbufferList(table.Entries.bind(table), table.EntriesLength(), parseEventEntry),
    };
  });
};

export const parseEventFlatbuffer = (eventFlatbuffer) => {
  const archive = pkNX.Structures.NestHoleDistributionEncounter8Archive.getRootAsNestHoleDistributionEncounter8Archive(
    eventFlatbuffer,
  );
  const tables = parseEventFlatbufferToObject(archive);

  return formatRaidJSON(tables);
};
