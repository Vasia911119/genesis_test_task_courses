import { scrollTop } from "../../helpers/scrollTop";

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
    <nav>
      <ul className="flex gap-4 justify-center">
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              className={
                currentPage === number
                  ? "bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  : "bg-blue-500 transition-colors hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
