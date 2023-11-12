import React, { type FC, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPersonIdFromURL } from '@helpers/getPersonIdFromURL';
import { getExtendedSearchParams } from '@helpers/getExtendedSearchParams';
import { getSearchParamsWithout } from '@helpers/getSearchParamsWithout';
import { getNumberFromSearchParams } from '@helpers/getNumberFromSearchParams';
import type { Person } from '@/types/apiTypes';
import './NavItem.scss';

interface NavItemProps {
  person: Person;
}

const NavItem: FC<NavItemProps> = (props) => {
  const { person } = props;

  const [searchParams, setSearchParams] = useSearchParams();

  const personId = getPersonIdFromURL(person.url);

  const isActive =
    personId === getNumberFromSearchParams(searchParams, 'details', 0);

  const className = isActive
    ? 'nav-item__name active'
    : 'nav-item__name nav-link';

  const clickHandler = useCallback(
    (personId: number, isActive: boolean): void => {
      setSearchParams(
        isActive
          ? getSearchParamsWithout(searchParams, ['details'])
          : getExtendedSearchParams(searchParams, {
              details: String(personId),
            }),
      );
    },
    [searchParams, setSearchParams],
  );

  return (
    <div className={'nav-item__wrapper'}>
      <div
        className={className}
        onClick={useCallback(() => {
          clickHandler(personId, isActive);
        }, [clickHandler, isActive, personId])}
        data-testid={'person-item'}
      >
        {person.name}
      </div>
    </div>
  );
};

export default NavItem;
