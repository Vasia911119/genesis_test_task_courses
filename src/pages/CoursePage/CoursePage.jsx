import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getCourseById } from "../../services/api";
import Spinner from "../../components/Spinner/Spinner";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { formatDate } from "../../helpers/formatDate";
import { formatDuration } from "../../helpers/formatDuration";

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
    <div className="container flex flex-col min-h-screen">
      <header className="w-full rounded bg-gradient-to-b from-teal-900 to-blue-900">
        <h1 className="text-center p-4 font-bold uppercase text-md md:text-2xl text-blue-200">
          {course.title}
        </h1>
      </header>
      <main>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="mt-4 p-4 border-2 md:max-w-[376px] rounded border-blue-200 bg-gradient-to-b from-teal-800 to-blue-500">
            <video
              className="mb-4 rounded"
              width="750"
              heigth="500"
              controls={true}
              preload="auto"
            >
              <source src={videoUrl} type="application/x-mpegURL" />
              Sorry, your brovser doesn't support videos.
            </video>
            <div className="border rounded">
              <p className="text-center text-lg font-medium">Lessons:</p>
              <ol className="pl-8 mb-2 mt-2 list-decimal font-medium">
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
            </div>
            <p className="text-lg text-center mb-4">{course.description}</p>
            <p className="text-center font-medium">Skills:</p>
            <ul>
              {course?.meta?.skills?.map((skill, index) => (
                <li className="text-center" key={index}>
                  {skill}
                </li>
              ))}
            </ul>
            <div className="flex my-2 justify-center gap-4">
              <p>
                <span className="font-bold mr-2">Status:</span>
                {course.status}
              </p>
              <p>
                <span className="font-bold mr-2">Launch data:</span>
                {formatDate(course.launchDate)}
              </p>
            </div>
            <div className="flex my-2 justify-center gap-4">
              <p className="font-bold">
                Duration: {formatDuration(course.duration)}
              </p>
              <p className="font-bold">Rating: {course.rating}</p>
            </div>

            {/* <img
            width={750}
            src={course.previewImageLink + "/cover.webp"}
            alt={course.title}
          /> */}
          </div>
        )}
        <Link
          className="my-4 relative block w-[162px] bg-blue-500 transition-colors hover:bg-blue-700 text-white font-medium py-2 pr-4 pl-8 rounded"
          to="/courses"
        >
          <ChevronLeftIcon className="absolute top-1/2 left-2 h-5 w-5 translate-y-[-50%]" />
          Back to courses
        </Link>
      </main>
      <footer className="mt-auto w-full rounded bg-gradient-to-b from-teal-900 to-blue-900 flex justify-center text-blue-200 p-4">
        <span className="pr-1">&copy;</span>
        <span>{new Date().getFullYear()}</span>
        <p className="pl-1">COURSES</p>
      </footer>
    </div>
  );
};

export default CoursesPage;
