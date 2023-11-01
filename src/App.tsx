import React, {
  useState,
  type FC,
  type FormEventHandler,
  useEffect,
} from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { type RouteObject } from 'react-router';
import Layout from './components/Layout/Layout';
import ContentFrame from './components/ContentFrame/ContentFrame';
import type { Person } from './types/apiTypes';
import './App.scss';
import { fetchPeople } from './api/fetchPeople';

const App: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [shouldUpdateData, setShouldUpdateData] = useState<boolean>(true);
  const [peopleToShow, setPeopleToShow] = useState<Person[]>([]);

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

      fetchPeople({ search }).then((data) => {
        setPeopleToShow(data);
        setSearchValue(search);
        setIsLoading(false);
      });

      setShouldUpdateData(false);
    }
  }, [shouldUpdateData, searchValue]);

  const searchInputHandler: FormEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target as HTMLInputElement;
    setSearchValue(value.trimStart());
  };

  const searchSubmitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
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
        />
      ),
      children: [
        {
          index: true,
          element: <ContentFrame people={peopleToShow} />,
        },
        {
          path: 'details/:person',
          element: <div>Details</div>,
        },
      ],
    },
  ];
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default App;
