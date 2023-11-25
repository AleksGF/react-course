import React, { type FC } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import Loader from '@components/Loader/Loader';
import { RoutePath } from '@src/constants/constants';

const Loading: FC = () => {
  return (
    <>
      <Head>
        <title>Loading...</title>
      </Head>
      <Loader />
      <Script id={'loading'}>
        {`
          const url = new URL(window.location.href);
          url.pathname = '${RoutePath.MAIN}';
          window.location.assign(url);
        `}
      </Script>
    </>
  );
};

export const getStaticProps = (): { props: object } => ({ props: {} });

export default Loading;
