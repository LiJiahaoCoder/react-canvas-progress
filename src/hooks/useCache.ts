import { useState } from 'react';

export const useCache = <T>(initCache: T): [T, (cache: T) => void] => {
  const [_cache, _setCache] = useState<T>(initCache);

  const setCache = (cache: T) => {
    _setCache(pre => ({
      ...pre,
      ...cache,
    }));
  };

  return [_cache, setCache];
};
