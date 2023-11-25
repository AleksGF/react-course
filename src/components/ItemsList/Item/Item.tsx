import React, { type FC } from 'react';
import { useRouter } from 'next/router';
import { getPersonIdFromURL } from '@src/helpers/getPersonIdFromURL';
import { getValidDetailsId } from '@src/helpers/getValidParams';
import { RoutePath, SearchParamsKeys } from '@src/constants/constants';
import Link from 'next/link';
import { handleSearchParams } from '@src/helpers/handleSearchParams';
import type { Person } from '@src/types/apiTypes';

interface ItemProps {
  person: Person;
}

const Item: FC<ItemProps> = ({ person }) => {
  const router = useRouter();

  const { details } = router.query;
  const detailsId = getValidDetailsId(details);

  const personId = getPersonIdFromURL(person.url);

  const { search } = handleSearchParams(router.asPath, {
    [SearchParamsKeys.DETAILS_VIEW_ID]: String(personId),
  });

  const href = `${RoutePath.LOADING}?${search}`;

  return (
    <Link href={href} className={'nav-item__wrapper'}>
      <div
        className={
          personId === detailsId
            ? 'nav-item__name active'
            : 'nav-item__name nav-link'
        }
        data-testid={'person-item'}
      >
        {person.name}
      </div>
    </Link>
  );
};

export default Item;
