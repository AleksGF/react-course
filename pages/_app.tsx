import React, { type FC } from 'react';
import type { AppProps } from 'next/app';
import '@src/styles/global.scss';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default MyApp;
