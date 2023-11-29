import React, { type FC, useEffect } from 'react';
import { useAppDispatch } from '@/hooks/hooks';
import Layout from '@/components/Layout/Layout';
import { routes } from '@/constants/routes';
import { NavPaths, setNavPaths } from '@/store/appSlice';

const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    //TODO remove console.log
    console.log('Setting navPaths');

    const navPaths = routes[0]?.children?.map(
      (child): NavPaths => ({
        name: child.handle.navName() as string,
        path: child.handle.navPath() as string,
      }),
    );

    if (navPaths) dispatch(setNavPaths(navPaths));
  }, [dispatch]);

  return (
    <>
      <Layout />
    </>
  );
};

export default App;
