import React, { type FC } from 'react';
import { useRouteError } from 'react-router';

const ErrorBoundary: FC = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <p className={'error-message'}>
      Error happened. Please, <a href={'/'}>reload the page</a>.
    </p>
  );
};

export default ErrorBoundary;
