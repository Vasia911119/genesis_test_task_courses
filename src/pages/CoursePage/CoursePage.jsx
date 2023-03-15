import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getCourseById } from "../../services/api";
import Spinner from "../../components/Spinner/Spinner";

const CoursesPage = () => {
  const params = useParams();
  const [course, setCourse] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const courseData = await getCourseById(params.courseId);
      setCourse(courseData);
      setVideoUrl(courseData.meta.courseVideoPreview.link);
      setIsLoading(false);
    }
    fetchData();
  }, [params.courseId]);
  console.log(course);
  console.log(videoUrl);

  return (
    <div className="container">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Link to="/courses">Back to courses</Link>
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
      )}
    </div>
  );
};

export default CoursesPage;
