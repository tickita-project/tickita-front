export const getIsBrowser = () => {
  return typeof window !== "undefined" && typeof document !== "undefined";
};

export const getIsServer = () => {
  return !getIsBrowser();
};
