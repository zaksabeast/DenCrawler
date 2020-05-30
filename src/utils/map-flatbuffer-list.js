const identity = (item) => item;

export const mapFlatbufferList = (list, length, func = identity) => {
  const result = [];

  for (let i = 0; i < length; i++) {
    result.push(func(list(i), i));
  }

  return result;
};
