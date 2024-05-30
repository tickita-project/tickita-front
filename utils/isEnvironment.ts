export const isBrowser = () => {
  return typeof window !== "undefined" && typeof document !== "undefined";
};

export const isServer = () => {
  return !isBrowser();
};
