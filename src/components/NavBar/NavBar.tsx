import React, {
  type FC,
  type MouseEvent,
  type ChangeEvent,
  useCallback,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@src/hook/hook';
import { hidePersonDetails, setItemsPerPage } from '@src/store/mainSlice';
import { getExtendedSearchParams } from '@src/helpers/getExtendedSearchParams';
import Select from '@components/common/Select/Select';
import ItemsList from '@components/ItemsList/ItemsList';
import { FIRST_PAGE, ITEMS_PER_PAGE } from '@src/constants/constants';
import './NavBar.scss';

const NavBar: FC = () => {
  const dispatch = useAppDispatch();
  const { itemsPerPage } = useAppSelector((state) => state.main);

  const [searchParams, setSearchParams] = useSearchParams();

  const selectOptions: number[] = Object.values(ITEMS_PER_PAGE)
    .filter((value) => typeof value === 'number')
    .map((value) => Number(value));

  const wrapperClickHandler = (e: MouseEvent<HTMLDivElement>) => {
    const linkElement = (e.target as HTMLElement).closest('.nav-link');

    if (!linkElement) {
      dispatch(hidePersonDetails());
    }
  };

  const selectPersonsPerPageHandler = useCallback(
    (e: ChangeEvent<HTMLSelectElement>): void => {
      setSearchParams(
        getExtendedSearchParams(searchParams, {
          page: String(FIRST_PAGE),
        }),
      );

      dispatch(setItemsPerPage(Number(e.target.value)));
    },
    [dispatch, searchParams, setSearchParams],
  );

  return (
    <div className={'nav__wrapper'} onClick={wrapperClickHandler}>
      <Select
        wrapperClassName={'select__wrapper'}
        title={'Persons per page:'}
        selectName={'persons-per-page'}
        defaultValue={itemsPerPage}
        changeHandler={selectPersonsPerPageHandler}
        options={selectOptions}
      />
      <ItemsList />
    </div>
  );
};

export default NavBar;
