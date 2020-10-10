import { useState } from 'react';
import { Props } from '../';

export interface UseCache {
  cache: Props;
  setCache: (cache: Props) => void;
}

export const useCache = (): UseCache => {
  const [cache, _setCache] = useState<Props>({ percentage: 0 } as Props);

  function setCache (_cache: Props) {
    _setCache(pre => ({
      ...pre,
      ..._cache,
    }));
  }

  return {
    cache,
    setCache,
  };
};
