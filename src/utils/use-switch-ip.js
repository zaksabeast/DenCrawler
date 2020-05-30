const setSwitchIp = (switchIp) => localStorage.setItem('switchIp', switchIp);

export const useSwitchIp = () => {
  const switchIp = localStorage.getItem('switchIp');
  return [switchIp, setSwitchIp];
};
