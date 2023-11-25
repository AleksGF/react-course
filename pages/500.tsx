import React, { type FC } from 'react';
import Head from 'next/head';

const Custom500: FC = () => {
  return (
    <>
      <Head>
        <title>Error happened</title>
      </Head>
      <p className={'error-message'}>
        Error happened. Please, <a href={'/main'}>reload the page</a>.
      </p>
    </>
  );
};

export default Custom500;
