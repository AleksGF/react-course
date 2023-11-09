import React, { type FC } from 'react';
import ReactPaginate from 'react-paginate';
import './Paginate.scss';

interface PaginateProps {
  pageNumber: number;
  changePageHandler: (selectedItem: { selected: number }) => void;
  pageRangeDisplayed: number;
  pageCount: number;
}

const Paginate: FC<PaginateProps> = (props) => {
  const { pageNumber, changePageHandler, pageRangeDisplayed, pageCount } =
    props;
  return (
    <ReactPaginate
      className={'paginate__wrapper'}
      pageClassName={'nav-link'}
      activeClassName={'paginate__page_active'}
      previousClassName={'nav-link'}
      nextClassName={'nav-link'}
      forcePage={pageNumber}
      breakLabel={'...'}
      nextLabel={'>'}
      onPageChange={changePageHandler}
      pageRangeDisplayed={pageRangeDisplayed}
      pageCount={pageCount}
      previousLabel={'<'}
      renderOnZeroPageCount={null}
    />
  );
};

export default Paginate;
