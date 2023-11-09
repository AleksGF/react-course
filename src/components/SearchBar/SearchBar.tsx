import React, {
  type FC,
  type FormEventHandler,
  useCallback,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { getExtendedSearchParams } from '@helpers/getExtendedSearchParams';
import { useSearchContext } from '@components/context/SearchContext/SearchContext';
import InputField from '@components/common/InputField/InputField';
import Button from '@components/common/Button/Button';
import { FIRST_PAGE } from '@constants/constants';
import './SearchBar.scss';

const SearchBar: FC = () => {
  const { searchValue, setSearchValue } = useSearchContext();

  const [searchParams, setSearchParams] = useSearchParams();

  const [inputValue, setInputValue] = useState<string>(searchValue);

  const searchSubmitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const newValue = inputValue.trim();

    localStorage.setItem('rc_lastSearch', newValue);

    setSearchParams(
      getExtendedSearchParams(searchParams, {
        page: String(FIRST_PAGE),
      }),
    );

    setSearchValue(newValue);
  };

  return (
    <div className={'search-bar__wrapper'}>
      <form
        className={'search-bar__form'}
        onSubmit={searchSubmitHandler}
        name={'search-field-form'}
      >
        <InputField
          value={inputValue}
          setValue={useCallback(
            (value) => {
              setInputValue(value);
            },
            [setInputValue],
          )}
        />
        <Button title={'Search'} classType={'submit-button'} />
      </form>
    </div>
  );
};

export default SearchBar;
