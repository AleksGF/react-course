import React, { type FC } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import CloseSvg from '/public/close.svg';
import { RoutePath, SearchParamsKeys } from '@src/constants/constants';
import { handleSearchParams } from '@src/helpers/handleSearchParams';
import styles from './CloseBtn.module.scss';

const CloseBtn: FC = () => {
  const router = useRouter();

  const closeDetailsHandler = () => {
    const { search } = handleSearchParams(router.asPath, {
      [SearchParamsKeys.DETAILS_VIEW_ID]: null,
    });

    router.push(`${RoutePath.LOADING}?${search}`);
  };

  return (
    <Image
      className={styles.button}
      src={CloseSvg.src}
      alt={'Close details'}
      width={'24'}
      height={'24'}
      onClick={closeDetailsHandler}
      data-testid={'details-close-btn'}
    />
  );
};

export default CloseBtn;
