/**
 * 쿼리 키 팩토리
 * {@link https://tkdodo.eu/blog/effective-react-query-keys}
 */

export const groupKey = {
  all: ["group"] as const,
  lists: () => [...groupKey.all, "list"] as const,
  details: () => [...groupKey.all, "detail"] as const,
  detail: (id: number) => [...groupKey.details(), id] as const,
};

export const userInfoKey = {
  all: ["user"] as const,
  info: () => [...userInfoKey.all, "info"] as const,
};

export const notificationKey = {
  all: ["notification"] as const,
  lists: () => [...notificationKey.all, "list"] as const,
} as const;
