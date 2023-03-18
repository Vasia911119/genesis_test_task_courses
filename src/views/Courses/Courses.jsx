import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Description from "../../components/Description/Description";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import Pagination from "../../components/Pagination/Pagination";

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
      <ul className="grid gap-8 justify-items-center my-8 md:grid-cols-2 xl:grid-cols-3">
        {currentCourses?.map((course) => (
          <li
            className="p-4 border-2 md:max-w-[376px] rounded border-blue-200 bg-gradient-to-b from-teal-500 to-blue-500"
            key={course.id}
            onMouseEnter={() => setHoveredVideo(course.id)}
            onMouseLeave={() => setHoveredVideo(null)}
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
                  <Description course={course} />
                  <div className="flex justify-center gap-4">
                    <p className="font-medium">
                      Lessons: {course.lessonsCount}
                    </p>
                    <p className="font-medium">Rating: {course.rating}</p>
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
