import React, {
  useState,
  type FC,
  type FormEventHandler,
  useEffect,
} from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { type RouteObject } from 'react-router';
import Layout from './components/Layout/Layout';
import PersonDetails from './components/PersonDetails/PersonDetails';
import { fetchPeople } from './api/fetchPeople';
import type { Person } from './types/apiTypes';
import './App.scss';

const App: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [shouldUpdateData, setShouldUpdateData] = useState<boolean>(true);
  const [personsPerPage, setPersonsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [peopleToShow, setPeopleToShow] = useState<Person[]>([]);
  const [totalPeopleCount, setTotalPeopleCount] = useState<number>(0);
  console.log(totalPeopleCount);
  useEffect(() => {
    if (searchValue === null) {
      setSearchValue(localStorage.getItem('rc_lastSearch') ?? '');
    }
  }, [searchValue]);

  useEffect(() => {
    if (shouldUpdateData && searchValue !== null) {
      const search = searchValue.trim();
      localStorage.setItem('rc_lastSearch', search);
      setIsLoading(true);

      fetchPeople(currentPage, personsPerPage, { search }).then((data) => {
        setPeopleToShow(data.people);
        setTotalPeopleCount(data.totalCount);
        setSearchValue(search);
        setIsLoading(false);
      });

      setShouldUpdateData(false);
    }
  }, [shouldUpdateData, searchValue, currentPage, personsPerPage]);

  const searchInputHandler: FormEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target as HTMLInputElement;
    setSearchValue(value.trimStart());
  };

  const searchSubmitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setShouldUpdateData(true);
  };

  const choosePersonsPerPageHandler = (newValue: number): void => {
    setPersonsPerPage(newValue);
    setShouldUpdateData(true);
  };

  const routes: RouteObject[] = [
    {
      path: '/',
      element: (
        <Layout
          isLoading={isLoading}
          searchValue={searchValue || ''}
          searchInputHandler={searchInputHandler}
          searchSubmitHandler={searchSubmitHandler}
          personsPerPage={personsPerPage}
          choosePersonsPerPageHandler={choosePersonsPerPageHandler}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          people={peopleToShow}
        />
      ),
      children: [
        {
          index: true,
          element: null,
        },
        {
          path: 'details/:personId',
          element: <PersonDetails />,
        },
      ],
    },
  ];
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default App;
