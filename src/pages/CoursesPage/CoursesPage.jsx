import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getCourses } from "../../services/api";
import Pagination from "../../components/Pagination/Pagination";
import Spinner from "../../components/Spinner/Spinner";
import LinkToTop from "../../components/LinkToTop/LinkToTop";
import styles from "./Courses.module.css";

const CoursesPage = () => {
  const { pathname } = useLocation();
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const coursesPerPage = 10;
  console.log(courses);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const coursesData = await getCourses();
      setCourses(coursesData.courses);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      {isLoading ? (
        <Spinner />
      ) : (
        <ul className="grid">
          {currentCourses?.map((course) => (
            <li
              className="p-4 my-4 border-2 md:max-w-[376px] rounded border-blue-200 border-solid bg-gradient-to-b from-teal-500 to-blue-500"
              key={course.id}
            >
              <Link to={`${pathname}/${course.id}`}>
                <h2 className="text-center mb-4 text-xl font-bold">
                  {course.title}
                </h2>
                <div>
                  <img
                    className="w-[400px] h-[200px] rounded mx-auto mb-4"
                    src={course.previewImageLink + "/cover.webp"}
                    alt={course.title}
                  />
                  <div>
                    <p className="mb-4 text-center">{course.description}</p>
                    {course.meta.skills && (
                      <>
                        <p className="text-center font-medium">Skills:</p>
                        <ul className="mb-4">
                          {course.meta.skills.map((skill, index) => (
                            <li className="text-center" key={index}>
                              {skill}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                    <div className="flex justify-center gap-4">
                      <p className="font-medium">
                        Lessons: {course.lessonsCount}
                      </p>
                      <p className="font-medium">Rating: {course.rating}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <div>
        {courses.length > coursesPerPage && (
          <Pagination
            coursesPerPage={coursesPerPage}
            totalCourses={courses.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        )}
      </div>
      <LinkToTop />
    </div>
  );
};

export default CoursesPage;
