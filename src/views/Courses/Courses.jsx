import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Description from "../../components/Description/Description";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import Pagination from "../../components/Pagination/Pagination";
import styles from "./Courses.module.css";

const Courses = ({ courses }) => {
  const { pathname } = useLocation();
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 10;

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  return (
    <section>
      <ul className={styles.list}>
        {currentCourses?.map((course) => (
          <li
            className={styles.item}
            key={course.id}
            onMouseEnter={() => setHoveredVideo(course.id)}
            onMouseLeave={() => setHoveredVideo(null)}
          >
            <Link to={`${pathname}/${course.id}`}>
              <h2 className={styles.title}>{course.title}</h2>
              <div>
                <img
                  className={styles.img}
                  src={course.previewImageLink + "/cover.webp"}
                  alt={course.title}
                />
                <div>
                  <Description course={course} />
                  <div className={styles.wrapper}>
                    <p className={styles.text}>
                      Lessons: {course.lessonsCount}
                    </p>
                    <p className={styles.text}>Rating: {course.rating}</p>
                  </div>
                </div>
                <VideoPlayer
                  videoUrl={course?.meta?.courseVideoPreview?.link}
                  muted
                  hover={hoveredVideo === course.id}
                />
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {courses.length > coursesPerPage && (
        <Pagination
          coursesPerPage={coursesPerPage}
          totalCourses={courses.length}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      )}
    </section>
  );
};

export default Courses;
