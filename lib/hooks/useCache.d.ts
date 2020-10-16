import { ReactCanvasProcessorProps } from '../';
export interface UseCache {
    cache: ReactCanvasProcessorProps;
    setCache: (cache: ReactCanvasProcessorProps) => void;
}
export declare const useCache: () => UseCache;
