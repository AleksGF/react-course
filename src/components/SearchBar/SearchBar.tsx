import React, {
  type FC,
  type FormEventHandler,
  useCallback,
  useState,
} from 'react';
import InputField from '@components/common/InputField/InputField';
import Button from '@components/common/Button/Button';
import './SearchBar.scss';
import { useSearchContext } from '@components/context/SearchContext/SearchContext';

const SearchBar: FC = () => {
  const { searchValue, setSearchValue } = useSearchContext();

  const [inputValue, setInputValue] = useState<string>(searchValue);

  const searchSubmitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const newValue = inputValue.trim();
    localStorage.setItem('rc_lastSearch', newValue);
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
