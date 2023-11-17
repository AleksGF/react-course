import React, { type FC, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@src/hook/hook';
import { hidePersonDetails, showPersonDetails } from '@src/store/mainSlice';
import { getPersonIdFromURL } from '@src/helpers/getPersonIdFromURL';
import type { Person } from '@src/types/apiTypes';
import './Item.scss';

interface ItemProps {
  person: Person;
}

const Item: FC<ItemProps> = (props) => {
  const { person } = props;

  const dispatch = useAppDispatch();

  const { detailsView } = useAppSelector((state) => state.main);

  const personId = getPersonIdFromURL(person.url);

  const isActive = !!detailsView && personId === detailsView;

  const className = isActive
    ? 'nav-item__name active'
    : 'nav-item__name nav-link';

  const clickHandler = useCallback(
    (personId: number, isActive: boolean): void => {
      dispatch(isActive ? hidePersonDetails() : showPersonDetails(personId));
    },
    [dispatch],
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

export default Item;
