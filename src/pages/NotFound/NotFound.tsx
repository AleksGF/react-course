import React, { type FC } from 'react';

const NotFound: FC = () => {
  return (
    <>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for could not be found.</p>
      <p>
        <a href={'/'}>To homepage</a>
      </p>
    </>
  );
};

export default NotFound;
