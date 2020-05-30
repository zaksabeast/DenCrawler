import { convertStringToByteBuffer } from './converters';

const FLATBUFFER_SIZE = '0x23d4';

const getEventFlatbufferOffset = (systemLanguage) => {
  // Lanuage names are from libnx
  switch (systemLanguage) {
    case 6: // SetLanguage_ZHCN
    case 15: // SetLanguage_ZHHANS
      return '0x2e5e4b28';
    case 11: // SetLanguage_ZHTW
    case 16: // SetLanguage_ZHHANT
      return '0x2e5e4ac8';
    case 7: // SetLanguage_KO
      return '0x2e5e4f18';
    case 4: // SetLanguage_IT
      return '0x2e5e5868';
    case 0: // SetLanguage_JA
      return '0x2e5e5a58';
    case 2: // SetLanguage_FR
    case 13: // SetLanguage_FRCA
    case 5: // SetLanguage_ES
    case 14: // SetLanguage_ES419
      return '0x2e5e5a98';
    case 3: // SetLanguage_DE
      return '0x2e5e5b98';
    case 9: // SetLanguage_PT
    case 10: // SetLanguage_RU
    case 8: // SetLanguage_NL
    case 1: // SetLanguage_ENUS
    case 12: // SetLanguage_ENGB
    default:
      return '0x2e5e58d8';
  }
};

export const fetchEventFlatbuffer = async (switchIp) => {
  const systemLanguageResult = await fetch(`http://${switchIp}:8080/settings/language`);

  if (!systemLanguageResult.ok) throw new Error('Failed to fetch system lanuage!');

  const systemLanguageStr = await systemLanguageResult.text();
  const systemLanguage = parseInt(systemLanguageStr, 10);
  const eventFlatbufferOffset = getEventFlatbufferOffset(systemLanguage);
  const eventFlatbufferResult = await fetch(
    `http://${switchIp}:8080/heap?offset=${eventFlatbufferOffset}&size=${FLATBUFFER_SIZE}`,
  );

  if (!eventFlatbufferResult.ok) throw new Error('Failed to fetch event flatbuffer!');

  const eventFlatbufferResultStr = await eventFlatbufferResult.text();

  return convertStringToByteBuffer(eventFlatbufferResultStr);
};
