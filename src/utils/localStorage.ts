export const setToLocalStorage = (key: string, value: string): void | null => {
  if (!key || typeof window === "undefined") {
    return null;
  }
  localStorage.setItem(key, value);
};

export const getFromLocalStorage = (key: string): string | null => {
  if (!key || typeof window === "undefined") {
    return null;
  }
  return localStorage.getItem(key);
};

export const removeFromLocalStorage = (key: string) => {
  if (!key || typeof window === "undefined") {
    return null;
  }
  localStorage.removeItem(key);
};
