import React from "react";
import Pagination from "react-js-pagination";

interface PaginationsProps {
    totalItemsCount?: number,
    activePage?: number,
    itemsCountPerPage?: number,
    handlePageChange?: (page:number)=> void,
}

export const Paginations: React.FC<PaginationsProps> = ({
    totalItemsCount,
    activePage,
    itemsCountPerPage,
    handlePageChange,
}) => {
    return (
        <div style={{ display: "flex" }} className="pagination-box">
            <Pagination
                totalItemsCount={totalItemsCount}
                activePage={activePage}
                itemsCountPerPage={itemsCountPerPage}
                onChange={handlePageChange}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-items"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
            />
        </div>
    );
};