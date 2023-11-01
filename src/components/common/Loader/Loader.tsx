import React, { type FC } from 'react';
import './Loader.scss';

const Loader: FC = () => {
  return (
    <div className={'loader__wrapper'}>
      <div className={'loader__container'}>
        <svg className={'loader__circle'} viewBox={'25 25 50 50'}>
          <circle
            className={'path'}
            cx={'50'}
            cy={'50'}
            r={'20'}
            fill={'none'}
            strokeWidth={'5'}
            strokeMiterlimit={'10'}
          />
        </svg>
      </div>
    </div>
  );
};

export default Loader;
