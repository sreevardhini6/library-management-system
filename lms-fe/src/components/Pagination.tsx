import React from 'react';
import ReactPaginate from 'react-paginate';

type PaginationProps = {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
};

export const Pagination: React.FC<PaginationProps> = ({ pageCount, onPageChange }) => {
  return (
    <ReactPaginate
      previousLabel={"Previous"}
      nextLabel={"Next"}
      breakLabel={"..."}
      breakClassName={"mx-2 custom-break-class"}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={onPageChange}
      containerClassName={"pagination flex justify-center items-center mt-5"}
      pageClassName={"mx-1 custom-page-class"}
      pageLinkClassName={"px-3 py-1 bg-slate-400 rounded hover:bg-yellow-300"}
      previousClassName={"mx-2 custom-prev-class"}
      previousLinkClassName={"px-3 py-1 bg-slate-200 rounded hover:bg-yellow-300"}
      nextClassName={"mx-2 custom-next-class"}
      nextLinkClassName={"px-3 py-1 bg-slate-200 rounded hover:bg-yellow-300"}
      breakLinkClassName={"px-3 py-1 bg-slate-200 rounded hover:bg-slate-300"}
      activeClassName={"bg-black shadow-md bg-yellow-200 text-sky-200"}
      activeLinkClassName={"bg-yellow-200 border-10 "}
      className='rounded-md shadow-lg flex justify-between w-auto items-center mt-5 ml-92 p-6    font-bold'
    />
  );
};
