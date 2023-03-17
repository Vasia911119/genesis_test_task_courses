import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { getCourseById } from "../../services/api";
import Spinner from "../../components/Spinner/Spinner";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { formatDate } from "../../helpers/formatDate";
import { formatDuration } from "../../helpers/formatDuration";
import Footer from "../../views/Footer/Footer";
import Header from "../../views/Header/Header";
import Hls from "hls.js";

const CoursesPage = () => {
  const params = useParams();
  const [course, setCourse] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState({
    courseId: null,
    lastLessonId: null,
    currentTime: 0,
  });
  const videoRef = useRef(null);

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

  useEffect(() => {
    const storedProgress = JSON.parse(
      localStorage.getItem(`courseProgress-${params.courseId}`)
    );
    if (storedProgress) {
      setProgress(storedProgress);
      setVideoUrl(
        storedProgress.lastLessonId
          ? course?.lessons?.find(
              (lesson) => lesson.id === storedProgress.lastLessonId
            ).link
          : course.meta.courseVideoPreview.link
      );
    }
  }, [params.courseId, course]);

  useEffect(() => {
    if (progress.courseId && progress.lastLessonId) {
      localStorage.setItem(
        `courseProgress-${progress.courseId}`,
        JSON.stringify(progress)
      );
    }
  }, [progress]);

  useEffect(() => {
    if (videoUrl) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videoUrl);
        hls.attachMedia(videoRef.current);
        // hls.on(Hls.Events.MANIFEST_PARSED, () => {
        //   videoRef.current.play();
        // });
      } else if (
        videoRef.current.canPlayType("application/vnd.apple.mpegurl")
      ) {
        videoRef.current.src = videoUrl;
        // videoRef.current.addEventListener("loadedmetadata", () => {
        //   videoRef.current.play();
        // });
      }
      if (
        videoRef.current &&
        progress.currentTime &&
        !isNaN(progress.currentTime)
      ) {
        videoRef.current.currentTime = progress.currentTime;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoUrl]);

  const handleVideoTimeUpdate = () => {
    if (videoRef.current) {
      setProgress({
        ...progress,
        currentTime: Math.floor(videoRef.current.currentTime),
      });
    }
  };

  const handleVideoEnded = () => {
    setProgress({
      courseId: params.courseId,
      lastLessonId: null,
      currentTime: 0,
    });
  };

  const handleVideoPause = () => {
    if (videoRef.current) {
      setProgress({
        ...progress,
        currentTime: Math.floor(videoRef.current.currentTime),
      });
    }
  };

  return (
    <div className="container flex flex-col min-h-screen">
      <Header title={course.title} />
      <main>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="mt-4 p-4 border-2 rounded border-blue-200 bg-gradient-to-b from-teal-800 to-blue-500">
            <video
              className="w-full rounded"
              ref={videoRef}
              controls
              onTimeUpdate={handleVideoTimeUpdate}
              onEnded={handleVideoEnded}
              onPause={handleVideoPause}
            />
            <div className="border rounded mt-2">
              <p className="text-center text-lg font-medium">Lessons:</p>
              <ol className="pl-8 mb-2 mt-2 list-decimal font-medium">
                {course?.lessons?.map((lesson, index) => (
                  <li key={index}>
                    {lesson.link === undefined ? (
                      <Link
                        onClick={(e) => e.preventDefault()}
                        style={{
                          color: "gray",
                          textDecoration: "none",
                          cursor: "default",
                        }}
                      >
                        {lesson.title}
                      </Link>
                    ) : lesson.status === "locked" ? (
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
                      <Link
                        onClick={(e) => {
                          setVideoUrl(lesson.link);
                          setProgress({
                            courseId: params.courseId,
                            lastLessonId: lesson.id,
                            // currentTime: 0,
                          });
                          e.target.style.color = "yellow";
                        }}
                        style={{
                          color: videoUrl === lesson.link ? "yellow" : "black",
                        }}
                      >
                        {lesson.title}
                      </Link>
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
            <div className="flex flex-col my-2 text-center md:flex-row justify-center md:gap-4">
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
      <Footer />
    </div>
  );
};

export default CoursesPage;
