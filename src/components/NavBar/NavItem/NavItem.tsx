import React, { type FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPersonIdFromURL } from '@helpers/getPersonIdFromURL';
import { getExtendedSearchParams } from '@helpers/getExtendedSearchParams';
import { getSearchParamsWithout } from '@helpers/getSearchParamsWithout';
import type { NavItemProps } from '@types/types';
import './NavItem.scss';

const NavItem: FC<NavItemProps> = (props) => {
  const { person } = props;
  const [searchParams, setSearchParams] = useSearchParams();

  const personId = getPersonIdFromURL(person.url);

  const isActive = personId === Number(searchParams.get('details'));

  const className = isActive
    ? 'nav-item__name active'
    : 'nav-item__name nav-link';

  const clickHandler = (personId: number, isActive: boolean): void => {
    setSearchParams(
      isActive
        ? getSearchParamsWithout(searchParams, ['details'])
        : getExtendedSearchParams(searchParams, { details: String(personId) }),
    );
  };

  return (
    <div className={'nav-item__wrapper'}>
      <div
        className={className}
        onClick={() => {
          clickHandler(personId, isActive);
        }}
      >
        {person.name}
      </div>
    </div>
  );
};

export default NavItem;
