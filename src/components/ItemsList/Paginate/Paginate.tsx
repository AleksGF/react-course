import React, { type FC } from 'react';
import { useRouter } from 'next/router';
import {
  getValidItemsPerPage,
  getValidPageNumber,
} from '@src/helpers/getValidParams';
import {
  SearchParamsKeys,
  FIRST_PAGE,
  RoutePath,
} from '@src/constants/constants';
import { handleSearchParams } from '@src/helpers/handleSearchParams';

interface PaginateProps {
  totalItemsCount: number;
}

const pageCountStep = 1;

const Paginate: FC<PaginateProps> = ({ totalItemsCount }) => {
  const router = useRouter();
  const { page: pageNumberFromURL, limit: itemsPerPageFromURL } = router.query;

  const currentPage = getValidPageNumber(pageNumberFromURL);
  const itemsPerPage = getValidItemsPerPage(itemsPerPageFromURL);
  const totalPagesCount = Math.ceil(totalItemsCount / itemsPerPage);

  const changePageHandler = (nextPage: number): void => {
    let page = nextPage;

    if (page < FIRST_PAGE) page = FIRST_PAGE;
    if (page > totalPagesCount) page = totalPagesCount;

    const { search } = handleSearchParams(router.asPath, {
      [SearchParamsKeys.PAGE_NUMBER]: String(page),
      [SearchParamsKeys.DETAILS_VIEW_ID]: null,
    });

    router.push(`${RoutePath.LOADING}?${search}`);
  };

  return (
    <div data-testid={'pagination'}>
      <button
        disabled={currentPage <= FIRST_PAGE}
        onClick={() => {
          changePageHandler(currentPage - pageCountStep);
        }}
        data-testid={'pagination__btn_prev'}
      >
        {'<<<'}
      </button>
      <div
        data-testid={'pagination__page'}
      >{`Page# ${currentPage} from ${totalPagesCount}`}</div>
      <button
        disabled={currentPage >= totalPagesCount}
        onClick={() => {
          changePageHandler(currentPage + pageCountStep);
        }}
        data-testid={'pagination__btn_next'}
      >
        {'>>>'}
      </button>
    </div>
  );
};

export default Paginate;
