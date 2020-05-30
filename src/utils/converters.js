import { flatbuffers } from 'flatbuffers';

const convertHexStringToU8Array = (hexStr) => {
  const result = new Uint8Array(hexStr.length / 2);

  for (let i = 0; i < hexStr.length; i += 2) {
    result[i / 2] = parseInt(hexStr.slice(i, i + 2), 16);
  }

  return result;
};

export const convertStringToByteBuffer = (str) => {
  const u8Array = convertHexStringToU8Array(str);
  return new flatbuffers.ByteBuffer(u8Array);
};
