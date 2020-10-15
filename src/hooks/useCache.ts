import { useState } from 'react';
import { ReactCanvasProcessorProps } from '../';

export interface UseCache {
  cache: ReactCanvasProcessorProps;
  setCache: (cache: ReactCanvasProcessorProps) => void;
}

export const useCache = (): UseCache => {
  const [cache, _setCache] = useState<ReactCanvasProcessorProps>({ percentage: 0 } as ReactCanvasProcessorProps);

  function setCache (_cache: ReactCanvasProcessorProps) {
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
