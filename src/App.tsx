import React, {
  useState,
  type FC,
  type FormEventHandler,
  useEffect,
} from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { type RouteObject } from 'react-router';
import Layout from './components/Layout/Layout';
import Main from './pages/Main/Main';
import './App.scss';

const App: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [shouldUpdateData, setShouldUpdateData] = useState<boolean>(true);

  useEffect(() => {
    if (searchValue === null) {
      setSearchValue(localStorage.getItem('rc_lastSearch') ?? '');
    }
  }, [searchValue]);

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
          element: (
            <Main
              searchValue={searchValue || ''}
              shouldUpdateData={shouldUpdateData}
              setIsLoading={setIsLoading}
              setSearchValue={setSearchValue}
              setShouldUpdateData={setShouldUpdateData}
            />
          ),
        },
      ],
    },
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default App;
