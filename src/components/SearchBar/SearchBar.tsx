import React, {
  type FC,
  type FormEventHandler,
  useCallback,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { getExtendedSearchParams } from '@src/helpers/getExtendedSearchParams';
import { useAppDispatch, useAppSelector } from '@src/hook/hook';
import { hidePersonDetails, saveSearchValue } from '@src/store/mainSlice';
import InputField from '@components/common/InputField/InputField';
import Button from '@components/common/Button/Button';
import { FIRST_PAGE } from '@src/constants/constants';
import './SearchBar.scss';

const SearchBar: FC = () => {
  const dispatch = useAppDispatch();
  const { searchValue } = useAppSelector((state) => state.main);

  const [searchParams, setSearchParams] = useSearchParams();

  const [inputValue, setInputValue] = useState<string>(searchValue);

  const searchSubmitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const newValue = inputValue.trim();

    setSearchParams(
      getExtendedSearchParams(searchParams, {
        page: String(FIRST_PAGE),
      }),
    );

    dispatch(hidePersonDetails());
    dispatch(saveSearchValue(newValue));
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
