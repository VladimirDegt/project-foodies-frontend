import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.css";
import { useEffect, useState } from "react";

const Pagination = ({ pageCount, onPageChange, currentPage }) => {
  const [, setPageRangeDisplayed] = useState(getPageRangeDisplayed());
  useEffect(() => {
    const handleResize = () => {
      setPageRangeDisplayed(getPageRangeDisplayed());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function getPageRangeDisplayed() {
    const width = window.innerWidth;
    return width < 768 ? 1 : 3;
  }

  return (
    <ReactPaginate
      previousLabel={"<"}
      nextLabel={">"}
      breakLabel={"..."}
      breakLinkClassName={styles.breakMe}
      pageCount={pageCount}
      marginPagesDisplayed={1}
      pageRangeDisplayed={getPageRangeDisplayed()}
      onPageChange={onPageChange}
      containerClassName={styles.pagination}
      subContainerClassName={`${styles.pages} ${styles.pagination}`}
      activeClassName={styles.active}
      pageLinkClassName={styles.pageLink}
      previousClassName={styles.pageItem}
      nextClassName={styles.pageItem}
      previousLinkClassName={styles.previousItem}
      nextLinkClassName={styles.nextItem}
      disabledClassName={styles.disabled}
      pageClassName={styles.pageItem}
      forcePage={currentPage - 1}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
