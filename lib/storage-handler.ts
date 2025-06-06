export const setStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const getStorage = (key: string) => {
  return localStorage.getItem(key);
};
