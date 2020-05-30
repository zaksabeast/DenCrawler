// Not the best regex, but that's alright
// We don't need to block intentionally bad use, just guide users who need help
const IP_ADDRESS_REGEX = /\b(?:\d{1,3}\.){3}\d{1,3}\b/;

export const validateIpAddress = (ip) => {
  return ip.match(IP_ADDRESS_REGEX) !== null;
};
