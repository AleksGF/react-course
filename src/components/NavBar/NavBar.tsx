import React, { type FC, type MouseEvent, type ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getExtendedSearchParams } from '@helpers/getExtendedSearchParams';
import { getSearchParamsWithout } from '@helpers/getSearchParamsWithout';
import Select from '@components/common/Select/Select';
import NavItem from '@components/NavBar/NavItem/NavItem';
import Paginate from '@components/common/Paginate/Paginate';
import type { NavBarProps } from '@types/types';
import './NavBar.scss';

const NavBar: FC<NavBarProps> = (props) => {
  const { people, totalPeopleCount, setShouldUpdateData } = props;
  const [searchParams, setSearchParams] = useSearchParams();

  const pageNumber = Number(searchParams.get('page') ?? '1');

  const personsPerPage =
    Number(searchParams.get('limit')) === 20
      ? Number(searchParams.get('limit'))
      : 10;
  const personsCount = totalPeopleCount.current;

  const pageChangeHandler = (e: { selected: number }) => {
    if (pageNumber === e.selected + 1) return;

    setSearchParams(
      getSearchParamsWithout(
        getExtendedSearchParams(searchParams, {
          page: String(e.selected + 1),
        }),
        ['details'],
      ),
    );
    setShouldUpdateData(true);
  };

  const wrapperClickHandler = (e: MouseEvent<HTMLDivElement>) => {
    const linkElement = (e.target as HTMLElement).closest('.nav-link');

    if (!linkElement) {
      setSearchParams(getSearchParamsWithout(searchParams, ['details']));
    }
  };

  const selectPersonsPerPageHandler = (
    e: ChangeEvent<HTMLSelectElement>,
  ): void => {
    setSearchParams(
      getExtendedSearchParams(searchParams, {
        limit: e.target.value,
        page: '1',
      }),
    );
    setShouldUpdateData(true);
  };

  if (people.length === 0)
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
        defaultValue={Number(searchParams.get('limit') ?? '10')}
        changeHandler={selectPersonsPerPageHandler}
        options={[10, 20]}
      />
      {people.map((person) => (
        <NavItem
          key={`${person.name}-${person.url}-${person.created}`}
          person={person}
        />
      ))}
      {personsCount > 0 && (
        <Paginate
          pageNumber={pageNumber - 1}
          changePageHandler={pageChangeHandler}
          pageRangeDisplayed={2}
          pageCount={Math.ceil(personsCount / personsPerPage)}
        />
      )}
    </div>
  );
};

export default NavBar;
