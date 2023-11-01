import React, { type FC } from 'react';
import InputField from '../common/InputField/InputField';
import Button from '../common/Button/Button';
import type { SearchBarProps } from '../../types/types';
import './SearchBar.scss';

const SearchBar: FC<SearchBarProps> = (props) => {
  const { searchValue, searchInputHandler, searchSubmitHandler } = props;

  return (
    <div className={'search-bar__wrapper'}>
      <form
        className={'search-bar__form'}
        onSubmit={searchSubmitHandler}
        name={'search-field-form'}
      >
        <InputField
          searchValue={searchValue}
          searchInputHandler={searchInputHandler}
        />
        <Button title={'Search'} classType={'submit-button'} />
      </form>
    </div>
  );
};

export default SearchBar;
