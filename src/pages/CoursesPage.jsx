import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getCourses } from "../services/api";
import Pagination from "../components/Pagination";

const CoursesPage = () => {
  const { pathname } = useLocation();
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 10;
  console.log(courses);

  useEffect(() => {
    async function fetchData() {
      const coursesData = await getCourses();
      setCourses(coursesData.courses);
    }
    fetchData();
  }, []);

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <ol>
        {currentCourses?.map((course) => (
          <li key={course.id}>
            <Link to={`${pathname}/${course.id}`}>
              <h2>{course.title}</h2>
              <img
                src={course.previewImageLink + "/cover.webp"}
                alt={course.title}
              />
              <p>{course.description}</p>
              <p>Lessons: {course.lessonsCount}</p>
              {course.meta.skills && (
                <>
                  <p>Skills:</p>
                  <ul>
                    {course.meta.skills.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>
                </>
              )}
              <p>Rating: {course.rating}</p>
            </Link>
          </li>
        ))}
      </ol>
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
    </>
  );
};

export default CoursesPage;
