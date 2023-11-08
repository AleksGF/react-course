import { type Context, useContext } from 'react';

export function getUseContextHook<T>(cnxt: Context<T | null>) {
  return function (): T {
    const context = useContext(cnxt);

    if (context === null) {
      throw new Error('Context was not provided');
    }

    return context;
  };
}
