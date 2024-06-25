export const getIsBrowser = (): boolean => {
  return typeof window !== "undefined" && typeof document !== "undefined";
};

export const getIsServer = (): boolean => {
  return !getIsBrowser();
};
