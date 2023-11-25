import React, { type ChangeEvent, type FC } from 'react';
import { useRouter } from 'next/router';
import {
  SearchParamsKeys,
  FIRST_PAGE,
  ITEMS_PER_PAGE,
  RoutePath,
} from '@src/constants/constants';
import { getValidItemsPerPage } from '@src/helpers/getValidParams';
import { handleSearchParams } from '@src/helpers/handleSearchParams';

interface SelectProps {
  wrapperClassName: string;
  title: string;
  selectName: string;
}

const Select: FC<SelectProps> = ({ wrapperClassName, title, selectName }) => {
  const router = useRouter();
  const { limit } = router.query;

  const options: number[] = Object.values(ITEMS_PER_PAGE)
    .filter(Number)
    .map(Number);

  const changeHandler = (e: ChangeEvent<HTMLSelectElement>): void => {
    const { search } = handleSearchParams(router.asPath, {
      [SearchParamsKeys.PAGE_NUMBER]: String(FIRST_PAGE),
      [SearchParamsKeys.ITEMS_PER_PAGE]: e.target.value,
      [SearchParamsKeys.DETAILS_VIEW_ID]: null,
    });

    router.push(`${RoutePath.LOADING}?${search}`);
  };

  return (
    <div className={wrapperClassName}>
      <div>{title}</div>
      <select
        name={selectName}
        defaultValue={getValidItemsPerPage(limit)}
        onChange={changeHandler}
        data-testid={'select'}
      >
        {options.map((optionValue) => (
          <option key={optionValue} value={optionValue}>
            {optionValue}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
