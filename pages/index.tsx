import React, { type FC } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import Loader from '@components/Loader/Loader';
import {
  LOCAL_STORAGE_SEARCH_VALUE_KEY,
  SearchParamsKeys,
  ITEMS_PER_PAGE,
  FIRST_PAGE,
  RoutePath,
} from '@src/constants/constants';

const Index: FC = () => {
  return (
    <>
      <Head>
        <title>Loading...</title>
      </Head>
      <Loader />
      <Script id={'initialization'}>
        {`
          const savedValue = localStorage.getItem('${LOCAL_STORAGE_SEARCH_VALUE_KEY}') ?? '';
          const url = new URL(window.location.href);
          
          url.pathname = '${RoutePath.MAIN}';
          
          if (savedValue) url.searchParams.set('${SearchParamsKeys.SEARCH_VALUE}', savedValue);
          url.searchParams.set('${SearchParamsKeys.PAGE_NUMBER}', '${FIRST_PAGE}');
          url.searchParams.set('${SearchParamsKeys.ITEMS_PER_PAGE}', '${ITEMS_PER_PAGE.DEFAULT}');
          
          window.location.assign(url);
        `}
      </Script>
    </>
  );
};

export const getStaticProps = (): { props: object } => ({ props: {} });

export default Index;
