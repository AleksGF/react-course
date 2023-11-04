import React, {
  type FC,
  type MouseEvent,
  type ChangeEvent,
  useEffect,
} from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import NavItem from './NavItem/NavItem';
import { getExtendedSearchParams } from '../../helpers/getExtendedSearchParams';
import type { NavBarProps } from '../../types/types';
import './NavBar.scss';

const NavBar: FC<NavBarProps> = (props) => {
  const {
    people,
    personsPerPage,
    choosePersonsPerPageHandler,
    currentPage,
    setCurrentPage,
  } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const pageFromSearchParams = searchParams.get('page');
    const limitPerPage = searchParams.get('limit');

    if (pageFromSearchParams === null) {
      setSearchParams(
        getExtendedSearchParams(searchParams, 'page', String(currentPage))
      );
    } else if (Number(pageFromSearchParams) !== currentPage) {
      setCurrentPage(Number(pageFromSearchParams));
    }

    if (limitPerPage === null) {
      setSearchParams(
        getExtendedSearchParams(searchParams, 'limit', String(personsPerPage))
      );
    } else if (
      (Number(limitPerPage) === 10 && personsPerPage === 20) ||
      (Number(limitPerPage) === 20 && personsPerPage === 10)
    ) {
      choosePersonsPerPageHandler(Number(limitPerPage));
    }
  }, [
    searchParams,
    currentPage,
    personsPerPage,
    setSearchParams,
    setCurrentPage,
    choosePersonsPerPageHandler,
  ]);

  const wrapperClickHandler = (e: MouseEvent<HTMLDivElement>) => {
    const linkElement = (e.target as HTMLElement).closest('.nav-link');

    if (!linkElement) {
      navigate('/');
    }
  };

  const selectPersonsPerPageHandler = (
    e: ChangeEvent<HTMLSelectElement>
  ): void => {
    choosePersonsPerPageHandler(Number(e.target.value));
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
      <div className={'select__wrapper'}>
        <div>Persons per page:</div>
        <select
          name={'persons-per-page'}
          defaultValue={personsPerPage}
          onChange={selectPersonsPerPageHandler}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>
      {people.map((person) => (
        <NavItem
          key={`${person.name}-${person.url}-${person.created}`}
          person={person}
        />
      ))}
    </div>
  );
};

export default NavBar;
