import React, { type FC } from 'react';
import styles from './Loader.module.scss';

const Loader: FC = () => {
  return (
    <div className={styles.loader__wrapper}>
      <div className={styles.loader__container}>
        <svg className={styles.loader__circle} viewBox={'25 25 50 50'}>
          <circle
            className={styles.path}
            cx={'50'}
            cy={'50'}
            r={'20'}
            fill={'none'}
            strokeWidth={'5'}
            strokeMiterlimit={'10'}
            data-testid={'circle'}
          />
        </svg>
      </div>
    </div>
  );
};

export default Loader;
