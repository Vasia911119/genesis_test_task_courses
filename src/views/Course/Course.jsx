import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { formatDate, formatDuration } from "../../helpers";
import { Description, Lessons, VideoPlayer } from "../../components";
import styles from "./Course.module.css";

export const Course = ({ course }) => {
  const params = useParams();
  const [videoUrl, setVideoUrl] = useState("");
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
    <section className={styles.section}>
      {videoUrl ? (
        <VideoPlayer
          videoUrl={videoUrl}
          controls
          progress={progress}
          setProgress={setProgress}
          viewSpeedbar
          pictureInPicture
        />
      ) : (
        <img
          className={styles.img}
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
      <div className={styles.wrapper}>
        <p className={styles.text}>Status: {course.status}</p>
        <p className={styles.text}>
          Launch data: {formatDate(course.launchDate)}
        </p>
      </div>
      <div className={styles.cover}>
        <p className={styles.text}>
          Duration: {formatDuration(course.duration)}
        </p>
        <p className={styles.text}>Rating: {course.rating}</p>
      </div>
    </section>
  );
};
