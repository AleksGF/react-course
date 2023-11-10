import { createContext } from 'react';
import { getUseContextHook } from '@helpers/getUseContextHook';

interface LoadingStatusContextInterface {
  isLoading: boolean;
  setIsLoading: (status: boolean) => void;
}

export const LoadingStatusContext =
  createContext<LoadingStatusContextInterface | null>(null);

export const useLoadingStatusContext =
  getUseContextHook<LoadingStatusContextInterface>(LoadingStatusContext);
