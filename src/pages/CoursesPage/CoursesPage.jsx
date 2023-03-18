import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { getCourses } from "../../services/api";
import Pagination from "../../components/Pagination/Pagination";
import Spinner from "../../components/Spinner/Spinner";
import LinkToTop from "../../components/LinkToTop/LinkToTop";
import Footer from "../../views/Footer/Footer";
import Header from "../../views/Header/Header";
import Container from "../../components/Container/Container";

const CoursesPage = () => {
  const { pathname } = useLocation();
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const coursesPerPage = 10;

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

  return (
    <Container>
      <Header title="Collection of training courses" />
      <main>
        {isLoading ? (
          <Spinner />
        ) : (
          <ul className="grid gap-8 justify-items-center my-8 md:grid-cols-2 xl:grid-cols-3">
            {currentCourses?.map((course) => (
              <li
                className="p-4 border-2 md:max-w-[376px] rounded border-blue-200 bg-gradient-to-b from-teal-500 to-blue-500"
                key={course.id}
              >
                <Link to={`${pathname}/${course.id}`}>
                  <h2 className="text-center mb-4 text-xl font-bold">
                    {course.title}
                  </h2>
                  <div>
                    <img
                      className="w-full md:w-[330px] md:h-[160px] rounded mx-auto mb-4"
                      src={course.previewImageLink + "/cover.webp"}
                      alt={course.title}
                    />
                    <div>
                      <p className="mb-4 text-lg text-center">
                        {course.description}
                      </p>
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
        <div className="mb-8">
          {courses.length > coursesPerPage && (
            <Pagination
              coursesPerPage={coursesPerPage}
              totalCourses={courses.length}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          )}
        </div>
        <LinkToTop />
      </main>
      <Footer />
    </Container>
  );
};

export default CoursesPage;
