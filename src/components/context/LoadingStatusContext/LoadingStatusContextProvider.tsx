import React, { type FC, useCallback, useState } from 'react';
import { LoadingStatusContext } from '@components/context/LoadingStatusContext/LoadingStatusContext';

interface LoadingStatusContextProvider {
  children: React.ReactNode;
}

const LoadingStatusContextProvider: FC<LoadingStatusContextProvider> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <LoadingStatusContext.Provider
      value={{
        isLoading,
        setIsLoading: useCallback(
          (status: boolean) => {
            setIsLoading(status);
          },
          [setIsLoading],
        ),
      }}
    >
      {children}
    </LoadingStatusContext.Provider>
  );
};

export default LoadingStatusContextProvider;
