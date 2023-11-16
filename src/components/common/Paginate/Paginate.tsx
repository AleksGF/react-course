import React, { type FC, useCallback } from 'react';
import ReactPaginate from 'react-paginate';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '@src/hook/hook.js';
import { getExtendedSearchParams } from '@src/helpers/getExtendedSearchParams.js';
import { hidePersonDetails } from '@src/store/mainSlice.js';
import './Paginate.scss';

interface PaginateProps {
  pageNumber: number;
  totalItemsCount: number;
  itemsPerPage: number;
}

const Paginate: FC<PaginateProps> = (props) => {
  const dispatch = useAppDispatch();

  const { pageNumber, totalItemsCount, itemsPerPage } = props;
  const [searchParams, setSearchParams] = useSearchParams();

  const changePageHandler = useCallback(
    (e: { selected: number }) => {
      const nextPage = e.selected + 1;

      if (pageNumber === nextPage) return;

      setSearchParams(
        getExtendedSearchParams(searchParams, {
          page: String(nextPage),
        }),
      );

      dispatch(hidePersonDetails());
    },
    [dispatch, pageNumber, searchParams, setSearchParams],
  );

  return (
    <ReactPaginate
      className={'paginate__wrapper'}
      pageClassName={'nav-link'}
      activeClassName={'paginate__page_active'}
      previousClassName={'nav-link'}
      nextClassName={'nav-link'}
      forcePage={pageNumber - 1}
      breakLabel={'...'}
      nextLabel={'>'}
      onPageChange={changePageHandler}
      pageRangeDisplayed={2}
      pageCount={Math.ceil(totalItemsCount / itemsPerPage)}
      previousLabel={'<'}
      renderOnZeroPageCount={null}
    />
  );
};

export default Paginate;
