import React, { type FC, type FormEventHandler } from 'react';
import { useRouter } from 'next/router';
import InputField from '@components/InputField/InputField';
import Button from '@components/Button/Button';
import { getValidSearchValue } from '@src/helpers/getValidParams';
import { handleSearchParams } from '@src/helpers/handleSearchParams';
import {
  SearchParamsKeys,
  FIRST_PAGE,
  LOCAL_STORAGE_SEARCH_VALUE_KEY,
  RoutePath,
} from '@src/constants/constants';

const SearchBar: FC = () => {
  const router = useRouter();
  const searchValue = getValidSearchValue(
    router.query[SearchParamsKeys.SEARCH_VALUE],
  );

  const searchSubmitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const newValue = (
      (e.target as HTMLFormElement).elements[0] as HTMLInputElement
    ).value;

    localStorage.setItem(LOCAL_STORAGE_SEARCH_VALUE_KEY, newValue);

    const { search } = handleSearchParams(router.asPath, {
      [SearchParamsKeys.PAGE_NUMBER]: String(FIRST_PAGE),
      [SearchParamsKeys.SEARCH_VALUE]: newValue,
      [SearchParamsKeys.DETAILS_VIEW_ID]: null,
    });

    router.push(`${RoutePath.LOADING}?${search}`);
  };

  return (
    <div className={'searchBar__wrapper'} data-testid={'searchBar'}>
      <form
        className={'searchBar__form'}
        onSubmit={searchSubmitHandler}
        name={'search-field-form'}
      >
        <InputField defaultValue={searchValue ?? ''} />
        <Button title={'Search'} />
      </form>
    </div>
  );
};

export default SearchBar;
