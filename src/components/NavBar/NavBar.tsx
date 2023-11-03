import React, { type FC, type MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import NavItem from './NavItem/NavItem';
import type { NavBarProps } from '../../types/types';
import './NavBar.scss';

const NavBar: FC<NavBarProps> = (props) => {
  const { people } = props;
  const navigate = useNavigate();

  const wrapperClickHandler = (e: MouseEvent<HTMLDivElement>) => {
    const linkElement = (e.target as HTMLElement).closest('.nav-link');

    if (!linkElement) {
      navigate('/');
      navigate('/');
    }
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
