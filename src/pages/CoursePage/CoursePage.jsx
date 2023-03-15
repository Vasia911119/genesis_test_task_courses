import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getCourseById } from "../../services/api";
import ReactPlayer from "react-player";

const CoursesPage = () => {
  const params = useParams();
  const [course, setCourse] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const courseData = await getCourseById(params.courseId);
      setCourse(courseData);
      setVideoUrl(courseData.meta.courseVideoPreview.link);
    }
    fetchData();
  }, [params.courseId]);
  console.log(course);
  console.log(videoUrl);

  return (
    <>
      <Link to="/courses">Back to courses</Link>
      {
        <>
          {/* // <ReactPlayer
        //   url={videoUrl}
        //   controls={true}
        //   width="100%"
        //   height="auto"
        //   config={{
        //     file: {
        //       attributes: {
        //         crossOrigin: "anonymous",
        //       },
        //     },
        //   }}
        // /> */}
          <video width="750" heigth="500" controls={true} preload="auto">
            <source src={videoUrl} type="application/x-mpegURL" />
            Sorry, your brovser doesn't support videos.
          </video>
          <h2>{course.title}</h2>
          <p>Launch data: {course.launchDate}</p>
          <p>Status: {course.status}</p>
          <p>{course.description}</p>
          <p>Duration: {course.duration} min</p>
          <img
            width={750}
            src={course.previewImageLink + "/cover.webp"}
            alt={course.title}
          />
          <p>Rating: {course.rating}</p>
          <p>Skills:</p>
          <ul>
            {course?.meta?.skills?.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
          <p>Lessons:</p>
          <ol>
            {course?.lessons?.map((lesson, index) => (
              <li key={index}>
                {lesson.status === "locked" ? (
                  <Link
                    onClick={(e) => e.preventDefault()}
                    style={{
                      color: "gray",
                      textDecoration: "none",
                      cursor: "default",
                    }}
                  >
                    {lesson.title}
                    {"\u0020\u{1F512}"}
                  </Link>
                ) : (
                  <Link>{lesson.title}</Link>
                )}
              </li>
            ))}
          </ol>
        </>
      }
    </>
  );
};

export default CoursesPage;
