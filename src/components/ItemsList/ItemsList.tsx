import React, { type FC, type MouseEvent } from 'react';
import Item from '@components/ItemsList/Item/Item';
import Paginate from '@components/ItemsList/Paginate/Paginate';
import { type Person } from '@src/types/apiTypes';
import { useRouter } from 'next/router';
import { RoutePath, SearchParamsKeys } from '@src/constants/constants';
import { getValidDetailsId } from '@src/helpers/getValidParams';
import { handleSearchParams } from '@src/helpers/handleSearchParams';
import styles from './ItemsList.module.scss';

interface ItemListProps {
  count: number;
  data: Person[];
}

const ItemsList: FC<ItemListProps> = ({ count, data }) => {
  const router = useRouter();
  const detailsId = getValidDetailsId(
    router.query[SearchParamsKeys.DETAILS_VIEW_ID],
  );

  const closeDetailsHandler = (e: MouseEvent<HTMLElement>): void => {
    if (!e.target || !detailsId) return;

    e.preventDefault();

    const { search } = handleSearchParams(router.asPath, {
      [SearchParamsKeys.DETAILS_VIEW_ID]: null,
    });

    router.push(`${RoutePath.LOADING}?${search}`);
  };

  if (!data || !data.length) {
    return <h2>No one was found</h2>;
  }

  return (
    <div
      onClick={closeDetailsHandler}
      data-testid={'itemsList'}
      className={styles.wrapper}
    >
      {data.map((person) => (
        <Item
          key={`${person.name}-${person.url}-${person.created}`}
          person={person}
        />
      ))}
      <Paginate totalItemsCount={count} />
    </div>
  );
};

export default ItemsList;
