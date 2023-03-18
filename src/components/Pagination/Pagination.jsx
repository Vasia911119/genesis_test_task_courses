import { scrollTop } from "../../helpers/scrollTop";
import styles from "./Pagination.module.css";

const Pagination = ({
  coursesPerPage,
  totalCourses,
  currentPage,
  setCurrentPage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalCourses / coursesPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => {
    scrollTop();
    setCurrentPage(pageNumber);
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              className={
                currentPage === number ? styles.active : styles.notActive
              }
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
