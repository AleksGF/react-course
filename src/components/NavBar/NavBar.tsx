import React, {
  type FC,
  type MouseEvent,
  type ChangeEvent,
  useCallback,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { getNumberFromSearchParams } from '@helpers/getNumberFromSearchParams';
import { getExtendedSearchParams } from '@helpers/getExtendedSearchParams';
import { getSearchParamsWithout } from '@helpers/getSearchParamsWithout';
import { useDataListContext } from '@components/context/DataListContext/DataListContext';
import Select from '@components/common/Select/Select';
import NavItem from '@components/NavBar/NavItem/NavItem';
import Paginate from '@components/common/Paginate/Paginate';
import { FIRST_PAGE, ITEMS_PER_PAGE } from '@constants/constants';
import './NavBar.scss';

const NavBar: FC = () => {
  const { people, totalPeopleCount } = useDataListContext();
  const [searchParams, setSearchParams] = useSearchParams();

  const pageFromURL = getNumberFromSearchParams(
    searchParams,
    'page',
    FIRST_PAGE,
  );

  const personsPerPageFromURL = getNumberFromSearchParams(
    searchParams,
    'limit',
    ITEMS_PER_PAGE.DEFAULT,
  );
  const personsPerPage =
    personsPerPageFromURL === ITEMS_PER_PAGE.DOUBLE
      ? ITEMS_PER_PAGE.DOUBLE
      : ITEMS_PER_PAGE.DEFAULT;

  const totalPageCount = Math.ceil(totalPeopleCount / personsPerPage);

  const pageNumber =
    pageFromURL > 0 && pageFromURL <= totalPageCount ? pageFromURL : FIRST_PAGE;

  const pageChangeHandler = useCallback(
    (e: { selected: number }) => {
      const nextPage = e.selected + 1;

      if (pageNumber === nextPage) return;

      setSearchParams(
        getSearchParamsWithout(
          getExtendedSearchParams(searchParams, {
            page: String(nextPage),
          }),
          ['details'],
        ),
      );
    },
    [pageNumber, searchParams, setSearchParams],
  );

  const wrapperClickHandler = (e: MouseEvent<HTMLDivElement>) => {
    const linkElement = (e.target as HTMLElement).closest('.nav-link');

    if (!linkElement) {
      setSearchParams(getSearchParamsWithout(searchParams, ['details']));
    }
  };

  const selectPersonsPerPageHandler = useCallback(
    (e: ChangeEvent<HTMLSelectElement>): void => {
      setSearchParams(
        getExtendedSearchParams(searchParams, {
          limit: e.target.value,
          page: String(FIRST_PAGE),
        }),
      );
    },
    [searchParams, setSearchParams],
  );

  if (!people.length)
    return (
      <div className={'nav__wrapper'}>
        <h2 className={'nav__title'}>No one was found</h2>
      </div>
    );

  return (
    <div className={'nav__wrapper'} onClick={wrapperClickHandler}>
      <h2 className={'nav__title'}>Star War Persons</h2>
      <Select
        wrapperClassName={'select__wrapper'}
        title={'Persons per page:'}
        selectName={'persons-per-page'}
        defaultValue={personsPerPage}
        changeHandler={selectPersonsPerPageHandler}
        options={Object.values(ITEMS_PER_PAGE)}
      />
      {people.map((person) => (
        <NavItem
          key={`${person.name}-${person.url}-${person.created}`}
          person={person}
        />
      ))}
      {!!totalPeopleCount && (
        <Paginate
          pageNumber={pageNumber - 1}
          changePageHandler={pageChangeHandler}
          pageRangeDisplayed={2}
          pageCount={totalPageCount}
        />
      )}
    </div>
  );
};

export default NavBar;
