import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getCourseById } from "../services/api";
import ReactPlayer from "react-player";

const CoursesPage = () => {
  const params = useParams();
  const [course, setCourse] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const courseData = await getCourseById(params.courseId);
      setCourse(courseData);
    }
    fetchData();
  }, [params.courseId]);

  return (
    <>
      <Link to="/courses">Back to courses</Link>
      {course && course.lessons && course.lessons[0] && (
        <ReactPlayer
          url={course.lessons[0].link}
          controls={true}
          width="100%"
          height="auto"
        />
        // <video width="750" heigth="500" controls>
        //   <source src={course.lessons[0].link} type="video/m3u8" />
        //   Sorry, your brovser doesn't support videos.
        // </video>
      )}
    </>
  );
};

export default CoursesPage;
