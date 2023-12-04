import React, { type FC } from 'react';
import { BASE_ICON_SIZE } from '@/constants/constants';
import searchIcon from '@/components/FormFields/SelectField/search.svg';

const SearchIcon: FC = () => {
  return (
    <img
      src={searchIcon}
      alt={'search'}
      width={BASE_ICON_SIZE}
      height={BASE_ICON_SIZE}
    />
  );
};

export default SearchIcon;
