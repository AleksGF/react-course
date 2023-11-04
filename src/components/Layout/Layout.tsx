import React, { type FC } from 'react';
import { Outlet } from 'react-router-dom';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import Loader from '../common/Loader/Loader';
import SearchBar from '../SearchBar/SearchBar';
import NavBar from '../NavBar/NavBar';
import type { LayoutProps } from '../../types/types';

const Layout: FC<LayoutProps> = (props) => {
  const {
    isLoading,
    searchValue,
    searchInputHandler,
    searchSubmitHandler,
    personsPerPage,
    choosePersonsPerPageHandler,
    currentPage,
    setCurrentPage,
    people,
  } = props;

  return (
    <div className={'wrapper'}>
      <ErrorBoundary
        fallback={
          <p className={'error-message'}>
            Error happened. Please, <a href={'/'}>reload the page</a>.
          </p>
        }
      >
        {isLoading && <Loader />}
        <SearchBar
          searchValue={searchValue}
          searchInputHandler={searchInputHandler}
          searchSubmitHandler={searchSubmitHandler}
        />
        <main className={'content-wrapper'}>
          <NavBar
            people={people}
            personsPerPage={personsPerPage}
            choosePersonsPerPageHandler={choosePersonsPerPageHandler}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <Outlet />
        </main>
      </ErrorBoundary>
    </div>
  );
};

export default Layout;
