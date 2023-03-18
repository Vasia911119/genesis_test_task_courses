import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { formatDate } from "../../helpers/formatDate";
import { formatDuration } from "../../helpers/formatDuration";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import Lessons from "../../components/Lessons/Lessons";
import Description from "../../components/Description/Description";

const Course = ({ setVideoUrl, videoUrl, course }) => {
  const params = useParams();
  const [progress, setProgress] = useState({
    courseId: null,
    lastLessonId: null,
    currentTime: 0,
  });

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

  return (
    <section className="mt-4 p-4 border-2 rounded border-blue-200 bg-gradient-to-b from-teal-800 to-blue-500">
      {videoUrl ? (
        <VideoPlayer
          videoUrl={videoUrl}
          controls
          progress={progress}
          setProgress={setProgress}
          viewSpeedbar
        />
      ) : (
        <img
          className="w-full rounded mx-auto mb-4"
          src={course.previewImageLink + "/cover.webp"}
          alt={course.title}
        />
      )}
      <Lessons
        course={course}
        setVideoUrl={setVideoUrl}
        setProgress={setProgress}
        videoUrl={videoUrl}
      />
      <Description course={course} />
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
        <p className="font-bold">Duration: {formatDuration(course.duration)}</p>
        <p className="font-bold">Rating: {course.rating}</p>
      </div>
    </section>
  );
};

export default Course;
