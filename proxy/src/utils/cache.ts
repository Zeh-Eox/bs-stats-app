type CacheEntry<T> = {
  data: T;
  expires: number;
};

const cache = new Map<string, CacheEntry<unknown>>();

export const getFromCache = <T>(key: string): T | null => {
  const cached = cache.get(key);

  if (!cached) return null;

  if (cached.expires <= Date.now()) {
    cache.delete(key);
    return null;
  }

  return cached.data as T;
};

export const setInCache = <T>(
  key: string,
  data: T,
  ttl: number
): void => {
  const expires = Date.now() + ttl;
  cache.set(key, { data, expires });
};