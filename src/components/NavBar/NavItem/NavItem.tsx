import React, { type FC } from 'react';
import { NavLink } from 'react-router-dom';
import getPersonIdFromURL from '../../../helpers/getPersonIdFromURL';
import type { NavItemProps } from '../../../types/types';
import './NavItem.scss';

const NavItem: FC<NavItemProps> = (props) => {
  const { person } = props;

  const personId = getPersonIdFromURL(person.url);

  return (
    <div className={'nav-item__wrapper'}>
      <NavLink
        to={`/details/${personId}`}
        className={({ isActive }) =>
          isActive ? 'nav-link_active' : 'nav-link'
        }
      >
        <div className={'nav-item__name'}>{person.name}</div>
      </NavLink>
    </div>
  );
};

export default NavItem;
