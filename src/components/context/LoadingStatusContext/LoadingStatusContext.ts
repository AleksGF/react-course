import React, { createContext } from 'react';
import { getUseContextHook } from '@helpers/getUseContextHook';

interface LoadingStatusContextInterface {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoadingStatusContext =
  createContext<LoadingStatusContextInterface | null>(null);

export const useLoadingStatusContext =
  getUseContextHook<LoadingStatusContextInterface>(LoadingStatusContext);
