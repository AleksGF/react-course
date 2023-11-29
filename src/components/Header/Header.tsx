import React, { type FC } from 'react';
import { routes } from '@/constants/routes';

const Header: FC = () => {
  const pathElements = routes[0]?.children?.map((child) => ({
    name: child.handle.navName() as string,
    path: child.handle.navPath() as string,
  }));

  return pathElements?.map((el, ind) => {
    return <div key={ind}>{`${el.name} - ${el.path}`}</div>;
  });
};

export default Header;
