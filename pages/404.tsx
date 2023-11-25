import React, { type FC } from 'react';
import Head from 'next/head';

const Custom404: FC = () => {
  return (
    <>
      <Head>
        <title>404 - Page Not Found</title>
      </Head>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for could not be found.</p>
      <p>
        <a href={'/main'}>To homepage</a>
      </p>
    </>
  );
};

export default Custom404;
